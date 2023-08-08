from datetime import timedelta, date

from django.db import models, transaction
from django.db.models import Sum, Min, Max, F
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify

from apps.collection.models import Product as RawMaterial
from apps.logistic.models import Lot
from apps.management.models import Categories, Suppliers, TaxRates, Customer, Outsourcing, Condition, Family, SubFamily, \
    Cut, Packing, UnitOfMeasurement, Currency, Container


# Create your models here.


class ItemsProxy(models.Model):
    class Meta:
        ordering = ["name"]
        abstract = True

    name = models.CharField(max_length=200, verbose_name="Nombre", blank=True)
    group = models.ForeignKey(Categories, verbose_name='Grupo de producto', blank=True, null=True,
                              on_delete=models.PROTECT, related_name='%(class)s_group')
    unit_of_measurement = models.ForeignKey(UnitOfMeasurement, verbose_name='Unidad de medida', blank=True, null=True,
                                            on_delete=models.PROTECT, related_name='%(class)s_unit')
    information = models.TextField(verbose_name='Información adicional', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(ItemsProxy):
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    raw_material = models.ForeignKey(RawMaterial, on_delete=models.PROTECT, verbose_name='Materia Prima')

    condition = models.ForeignKey(Condition, on_delete=models.PROTECT, verbose_name='Condición')
    family = models.ForeignKey(Family, on_delete=models.PROTECT, verbose_name='Familia')
    subfamily = models.ForeignKey(SubFamily, on_delete=models.PROTECT, verbose_name='Sub Familia')
    cut = models.ForeignKey(Cut, on_delete=models.PROTECT, verbose_name='Corte')
    container = models.ForeignKey(Container, on_delete=models.PROTECT, verbose_name='Contenedor', blank=True, null=True)
    packing = models.ForeignKey(Packing, on_delete=models.PROTECT, verbose_name='Empaque')

    net_weight = models.DecimalField(verbose_name='Peso neto envase', max_digits=5, decimal_places=3, default=0,
                                     blank=False)
    brand = models.CharField(max_length=50, verbose_name='Marca', blank=True, null=True)

    performance = models.DecimalField(verbose_name='% Rendimiento', max_digits=3, decimal_places=1, default=0,
                                      blank=False)
    capacity = models.IntegerField(verbose_name='Capacidad', default=0, blank=False)
    recipe = models.ManyToManyField('Material', related_name='products_recipes', verbose_name='Recetario',
                                    through='Recipe')
    slug = models.SlugField(max_length=250, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.name = str.capitalize(
            self.raw_material.name
            + " "
            + self.condition.name
            + " "
            + self.family.name
            + " "
            + self.subfamily.name
            + " "
            + self.cut.name
            + " "
            + self.container.name
            + " "
            + self.packing.name
            + " "
            + str(self.net_weight)
            + " kg "
            + self.brand

        )
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Material(ItemsProxy):
    class Meta:
        verbose_name = 'Material'
        verbose_name_plural = 'Materiales'

    sap = models.CharField(max_length=10, verbose_name='Código SAP')
    minimum_quantity = models.DecimalField(verbose_name='Cantidad mínima de pedido', max_digits=7, decimal_places=2,
                                           blank=True, null=True)
    price = models.DecimalField(verbose_name='Precio', max_digits=6, decimal_places=3, default=0, blank=False)

    def save(self, *args, **kwargs):
        creating_new_instance = not self.pk  # Check if the instance is being created
        # Call the superclass save() method to save the instance
        super().save(*args, **kwargs)

        if creating_new_instance:
            Stock.objects.create(product=self, quantity=0, date=timezone.now())




    def __str__(self):
        return self.name


class Recipe(models.Model):
    class Meta:
        verbose_name = 'Recetario'
        verbose_name_plural = 'Recetario'

    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='recipe_products',
                                verbose_name='Producto')
    material = models.ForeignKey(Material, on_delete=models.PROTECT, related_name='recipe_materials',
                                 verbose_name='Material')
    quantity = models.DecimalField(verbose_name='Cantidad', max_digits=12, decimal_places=10, default=0, blank=True)

    def __str__(self):
        return str(self.id)


class Stock(models.Model):
    class Meta:
        verbose_name = 'Stock'
        verbose_name_plural = 'Stock'
        unique_together = ['date', 'product']

    date = models.DateField(verbose_name='Fecha', default=timezone.now)
    quantity = models.IntegerField(verbose_name='Cantidad de stock', default=0, blank=True)
    product = models.ForeignKey(Material, on_delete=models.CASCADE, related_name='stocks')

    def __str__(self):
        return f'Stock: {self.product.sap} - {self.quantity} und'




    def update_material_price(self):
        stock_entries = StockEntry.objects.filter(stock__gt=0, purchase_item__material=self.product)
        total_cost = sum(entry.price_per_unit * entry.stock for entry in stock_entries)
        total_quantity = sum(entry.stock for entry in stock_entries)
        if total_quantity > 0:
            unit_price = total_cost / total_quantity # Calculate the unit price
            self.product.price = unit_price # Update the product price
            self.product.save() # Save the product



    def get_price(self):
        try:
            return self.product.price
        except Material.DoesNotExist:
            return 0

    def get_expected_quantity(self):
        try:
            items = PurchaseItems.objects.filter(
                purchase__status=Purchase.StatusChoices.PENDING,
                material=self.product
            )
            return sum(item.quantity for item in items)
        except Exception as e:
            return 0

    def calculate_daily_consumption_average(self):
        try:
            today = date.today()
            three_months_ago = today - timedelta(days=3 * 30)  # Subtract 3 months from the current date

            # Filter stock exits in the last 3 months related to this specific product
            stock_exits_last_three_months = StockExit.objects.filter(
                stock_entry__purchase_item__material=self.product,
                date__gte=three_months_ago,
                date__lte=today
            )

            # Calculate the total quantity of stock exits in the last 3 months
            total_exits = stock_exits_last_three_months.aggregate(Sum('quantity'))['quantity__sum']

            # Calculate the daily consumption average by dividing the total quantity by the number of days
            if total_exits:
                days_count = stock_exits_last_three_months.count()
                daily_average = total_exits / days_count
                return daily_average
            else:
                return 0  # No exits in the last 3 months
        except Exception as e:
            return 0

    def get_lead_time(self):
        try:
            purchase = PurchaseItems.objects.filter(
                purchase__status=Purchase.StatusChoices.RECEIVED,
                material=self.product
            ).order_by('-purchase__order_date').first().purchase

            return purchase
        except Exception as e:
            return str(e)

    def get_last_lead_time(self):
        try:

            purchase = self.get_lead_time()

            if purchase.arrival_date:
                lead_time = purchase.arrival_date - purchase.order_date
                lead_time_with_additional_days = lead_time + timedelta(days=5)
                avg = sum([lead_time, lead_time_with_additional_days], timedelta()) / len(
                    [lead_time, lead_time_with_additional_days] or 1)
                return avg.days
            else:
                return None

        except Purchase.DoesNotExist:
            return None
        except Exception as e:
            return 0

    def get_safety_stock(self):
        try:
            daily_consumption_average = self.calculate_daily_consumption_average()
            lead_time = self.get_lead_time()
            last_lead_time_days = None
            if lead_time.arrival_date:
                last_lead_time = lead_time.arrival_date - lead_time.order_date
                last_lead_time_days = last_lead_time.days
            if daily_consumption_average and last_lead_time_days:
                last_lead_time_days = last_lead_time_days  # Obtiene el número de días del timedelta
                safety_stock = daily_consumption_average * last_lead_time_days
                return safety_stock
            else:
                return 0
        except Exception as e:
            return 0

    def get_reorder_point(self):
        try:
            demand = self.get_last_lead_time() * self.calculate_daily_consumption_average()
            reorder_point = demand + self.get_safety_stock()
            return reorder_point
        except Exception as e:
            return 0

    @staticmethod
    def receive_purchase(purchase_id):
        try:
            purchase = Purchase.objects.get(pk=purchase_id)

            if purchase.status != Purchase.StatusChoices.PENDING:
                raise ValueError('La orden de compra ha sido recibida.')

            purchase.status = Purchase.StatusChoices.RECEIVED
            purchase.arrival_date = timezone.now()
            purchase.save()

            purchase_items = purchase.items_purchase.all()
            for item in purchase_items:
                StockEntry.objects.create(
                    purchase_item=item,
                    date=timezone.now(),
                    quantity=item.quantity,
                    price_per_unit=item.price_per_unit,
                    stock=item.quantity
                )

        except Purchase.DoesNotExist:
            raise ValueError('La orden de compra no existe.')


@receiver(post_save, sender=Stock)
def update_material_price(sender, instance, **kwargs):
    instance.update_material_price()

class StockEntry(models.Model):
    class Meta:
        verbose_name = 'Ingreso de stock'
        verbose_name_plural = 'Ingresos de stock'
        ordering = ('-date', '-id')

    purchase_item = models.OneToOneField('PurchaseItems', on_delete=models.PROTECT, related_name='stock_entry')
    date = models.DateField(verbose_name='Fecha')
    quantity = models.IntegerField(verbose_name='Cantidad de ingreso')
    price_per_unit = models.DecimalField(verbose_name='Precio unitario', max_digits=7, decimal_places=2)
    stock = models.IntegerField(verbose_name='Cantidad de stock')

    def __str__(self):
        return f'Ingreso de {self.quantity} unidades de {self.purchase_item.material} el {self.date}'

    def save(self, *args, **kwargs):
        try:
            last = Stock.objects.filter(product=self.purchase_item.material).last()
            stock, created = Stock.objects.get_or_create(product=self.purchase_item.material, date=timezone.now())
            if not self.pk:
                if created:
                    stock.quantity = last.quantity
                stock.quantity += self.quantity
                stock.save()
                self.stock = self.quantity
            super().save(*args, **kwargs)
            stock.update_material_price()
        except Exception as e:
            raise ValueError(str(e))



class StockReEntry(models.Model):
    class Meta:
        verbose_name = 'Reingreso de stock'
        verbose_name_plural = 'Reingresos de stock'
        ordering = ('-date', '-id')

    stock_entry = models.ForeignKey(StockEntry, on_delete=models.PROTECT, related_name='stock_reentries')
    date = models.DateField(verbose_name='Fecha', auto_now=True)
    quantity = models.IntegerField(verbose_name='Cantidad de reingreso')

    def __str__(self):
        return f'Reingreso de {self.quantity} unidades de {self.stock_entry.purchase_item.material} el {self.date}'






class StockExit(models.Model):
    class Meta:
        verbose_name = 'Salida de stock'
        verbose_name_plural = 'Salidas de stock'
        ordering = ('-date', '-id')

    stock_entry = models.ForeignKey(StockEntry, on_delete=models.PROTECT, related_name='stock_exits')
    date = models.DateField(verbose_name='Fecha', auto_now=True)
    quantity = models.IntegerField(verbose_name='Cantidad de salida')
    guide_number = models.CharField(verbose_name='Número de guía', max_length=50, blank=True, null=True)
    vale_number = models.CharField(verbose_name='Número de vale', max_length=50, blank=True, null=True)
    lot_id = models.CharField(verbose_name='Número de lote', max_length=50, blank=True, null=True)

    def __str__(self):
        return f'Salida de {self.quantity} unidades de {self.stock_entry.purchase_item.material} el {self.date}'

    def save(self, *args, **kwargs):
        try:
            last = Stock.objects.filter(product=self.stock_entry.purchase_item.material).last()
            stock, created = Stock.objects.get_or_create(product=self.stock_entry.purchase_item.material,
                                                         date=timezone.now())
            if not self.pk:

                if created:
                    stock.quantity = last.quantity
                if self.quantity > stock.quantity:
                    raise ValueError('La cantidad de salida no puede ser mayor a la cantidad de stock.')
                if self.quantity > self.stock_entry.stock:
                    raise ValueError('La cantidad de salida no puede ser mayor a la cantidad de stock.')
                stock.quantity -= self.quantity
                stock.save()
                self.stock_entry.stock -= self.quantity
                self.stock_entry.save()
            stock.update_material_price()
            super().save(*args, **kwargs)
        except Exception as e:
            raise ValueError(str(e))


class Purchase(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'pending', 'Pendiente'
        RECEIVED = 'received', 'Recibido'

    class Meta:
        verbose_name = 'Orden de compra'
        verbose_name_plural = 'Ordenes de compra'
        ordering = ['-created_at']
        unique_together = ('order_id', 'supplier',)

    supplier = models.ForeignKey(Suppliers, on_delete=models.PROTECT, related_name='purchases_supplier',
                                 verbose_name='Proveedor')
    order_id = models.CharField(max_length=15, blank=False, null=False, verbose_name='ID del pedido')
    order_date = models.DateField(verbose_name='Fecha de la orden', default=timezone.now)
    invoice_id = models.CharField(max_length=15, blank=True, null=True, verbose_name='ID de la factura')
    guide_number = models.CharField(max_length=15, blank=True, null=True, verbose_name='Número de guía')
    created_at = models.DateField(verbose_name='Fecha de creación', auto_now=True)
    shipment_date = models.DateField(verbose_name='Fecha de envío', blank=True, null=True)
    arrival_date = models.DateField(verbose_name='Fecha de llegada', blank=True, null=True)
    comment = models.TextField(verbose_name='Información adicional', blank=True)
    tax_rate = models.ForeignKey(TaxRates, verbose_name='Impuesto', related_name='purchases_tax',
                                 on_delete=models.PROTECT)
    currency = models.ForeignKey(Currency, verbose_name='Moneda', related_name='purchase_currency',
                                 on_delete=models.PROTECT, blank=True, null=True)
    items = models.ManyToManyField(Material, through='PurchaseItems', related_name='purchases_items')
    status = models.CharField(
        max_length=20,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING,
        verbose_name='Estado'
    )
    drive = models.URLField(verbose_name='Drive URL', blank=True)

    def __str__(self):
        return self.order_id

    def get_total_price(self):
        total = 0
        for item in self.items_purchase.all():
            total += item.total_price
        return total


class PurchaseItems(models.Model):
    class Meta:
        verbose_name = 'Artículo de compra'
        verbose_name_plural = 'Artículos de compra'
        ordering = ['-id']

    purchase = models.ForeignKey(Purchase, verbose_name='Orden de compra', on_delete=models.PROTECT,
                                 related_name='items_purchase')
    material = models.ForeignKey('Material', verbose_name='Material', on_delete=models.PROTECT,
                                 related_name='items_material')
    quantity = models.IntegerField(verbose_name='Cantidad', default=0)
    price_per_unit = models.DecimalField(verbose_name='Precio unitario', max_digits=7, decimal_places=2)
    total_price = models.DecimalField(verbose_name='Precio total', max_digits=8, decimal_places=2, default=0,
                                      blank=True)

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        try:
            if self.purchase.status == 'received':
                raise ValueError('No se puede editar una orden de compra que ya ha sido recibida.')
            total_price = (self.quantity * self.price_per_unit)
            tax = total_price * (self.purchase.tax_rate.rate / 100)
            self.total_price = total_price + tax
        except:
            self.total_price = 0
        super().save(*args, **kwargs)


class SalesOrder(models.Model):
    class Meta:
        verbose_name = 'Orden de venta'
        verbose_name_plural = 'Ordenes de venta'
        ordering = ['-month', '-year']

    class MarketChoices(models.TextChoices):
        NATIONAL = 'national', 'Nacional'
        INTERNATIONAL = 'international', 'Internacional'

    MONTH_CHOICES = [
        ('01', 'Enero'),
        ('02', 'Febrero'),
        ('03', 'Marzo'),
        ('04', 'Abril'),
        ('05', 'Mayo'),
        ('06', 'Junio'),
        ('07', 'Julio'),
        ('08', 'Agosto'),
        ('09', 'Septiembre'),
        ('10', 'Octubre'),
        ('11', 'Noviembre'),
        ('12', 'Diciembre'),
    ]

    class ManagementChoices(models.TextChoices):
        ONE = '30', '30 %'
        TWO = '60', '60 %'
        THREE = '90', '90 %'
        FOUR = '100', '100 %'

    class DeliveryChoices(models.TextChoices):
        PENDING = 'pending', 'Pendiente'
        DELIVERED = 'delivered', 'Enviado'

    month = models.CharField(max_length=2, choices=MONTH_CHOICES, verbose_name='Mes')
    year = models.CharField(max_length=4, blank=False, null=False, verbose_name='Año')
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='sales_orders_customer',
                                 verbose_name='Cliente')
    order_id = models.CharField(max_length=15, blank=False, null=False, verbose_name='Orden de compra')
    order_date = models.DateField(verbose_name='Fecha de la orden', default=timezone.now)
    quote_id = models.CharField(max_length=15, blank=False, null=False, verbose_name='Proforma Invoice')
    full_container_load_name = models.CharField(max_length=50, blank=True, null=False,
                                                verbose_name='Nombre del contenedor')
    process_plant = models.ForeignKey(Outsourcing, on_delete=models.PROTECT, related_name='sales_orders_process_plant',
                                      verbose_name='Planta de proceso')
    sku = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name='SKU', related_name='sales_order_sku')
    quantity = models.DecimalField(verbose_name='Cantidad', max_digits=8, decimal_places=2, default=0)
    price_per_unit = models.DecimalField(verbose_name='Precio unitario', max_digits=4, decimal_places=2)

    market = models.CharField(max_length=13,
                              choices=MarketChoices.choices,
                              default=MarketChoices.NATIONAL,
                              verbose_name='Mercado')
    raw_material = models.DecimalField(verbose_name='Materia Prima', max_digits=9, decimal_places=2, default=0,
                                       blank=True)
    performance = models.DecimalField(verbose_name='Rendimiento', max_digits=4, decimal_places=2, default=0, blank=True)
    capacity = models.DecimalField(verbose_name='Capacidad', max_digits=9, decimal_places=2, default=0, blank=True)
    start_date = models.DateField(verbose_name='Fecha de inicio', blank=True, null=True)
    finish_date = models.DateField(verbose_name='Fecha de finalización', blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    currency = models.ForeignKey(Currency, verbose_name='Moneda', related_name='sales_order_currency',
                                 on_delete=models.PROTECT, blank=True, null=True)
    shipping_date = models.DateField(verbose_name='Fecha de envío', blank=True, null=True)
    etd = models.DateField(verbose_name='Tiempo estimado de salida', blank=True, null=True)
    eta = models.DateField(verbose_name='Tiempo estimado de llegada', blank=True, null=True)
    tax_rate = models.ForeignKey(TaxRates, verbose_name='Impuesto', related_name='sales_order_tax',
                                 on_delete=models.PROTECT)
    total_price = models.DecimalField(verbose_name='Precio total', max_digits=8, decimal_places=2, blank=True)
    management = models.CharField(choices=ManagementChoices.choices, max_length=3, default=ManagementChoices.ONE,
                                  verbose_name='Gestión')
    delivery = models.CharField(choices=DeliveryChoices.choices, max_length=9, default=DeliveryChoices.PENDING,
                                verbose_name='Estado')
    drive = models.URLField(verbose_name='Drive URL', blank=True, max_length=200)
    slug = models.SlugField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=7, blank=True, null=True)

    def __str__(self):
        return self.order_id

    def get_recipe(self):
        list = []
        try:
            for recipe in self.sku.recipe_products.all():
                quantity = recipe.quantity * self.quantity
                list.append({'material': recipe.material.name, 'quantity': quantity,
                             'unit': recipe.material.unit_of_measurement.name})
        except:
            pass
        return list

    def save(self, *args, **kwargs):
        self.slug = slugify(
            self.order_id + '-' + self.customer.display_name + '-' + self.sku.name + '-' + self.month + '-' + self.year)
        super().save(*args, **kwargs)

    def get_planning(self):
        try:
            query = self.production_planning_sale.all().order_by('date')
            payload = []
            for item in query:
                payload.append({
                    'id': item.id,
                    'date': item.date,
                    'raw_material': item.raw_material,
                    'performance': item.performance,
                    'capacity': item.capacity,
                    'expected': item.expected,
                    'stock_start': item.stock_start,
                    'stock_end': item.stock_end,
                    'process_plant_name': item.process_plant.display_name,
                    'process_plant': item.process_plant.id,
                    'missing': item.get_missing(),
                    'surplus': item.surplus()
                })
            return payload
        except Exception as e:
            return [str(e)]

    def get_first_date(self):
        return self.production_planning_sale.aggregate(first_date=Min('date'))['first_date']

    def get_last_date(self):
        return self.production_planning_sale.aggregate(last_date=Max('date'))['last_date']

    def update_date_manufacturing(self):
        try:
            first_date = self.get_first_date()
            last_date = self.get_last_date()
            print(first_date, last_date)

            # Actualizar start_date y end_date con las fechas obtenidas
            self.start_date = first_date
            self.finish_date = last_date

            # Guardar los cambios en la instancia de SalesOrder
            self.save()
        except:
            pass


@receiver(pre_save, sender=SalesOrder)
def my_model_pre_save(sender, instance, **kwargs):
    if not instance.id:  # Verificar si es un nuevo registro
        instance.performance = instance.sku.performance
        instance.capacity = instance.sku.capacity
    try:
        instance.total_price = (instance.quantity * instance.price_per_unit) + (
                (instance.quantity * instance.price_per_unit) * (instance.tax_rate.rate / 100))
        instance.raw_material = instance.quantity / (instance.performance / 100)
    except:
        instance.total_price = 0
        instance.raw_material = 0


class ProductionPlanning(models.Model):
    class Meta:
        verbose_name = 'Planificación de producción'
        verbose_name_plural = 'Planificación de producción'
        ordering = ['-sale__year', '-sale__month']

    sale = models.ForeignKey(SalesOrder, on_delete=models.PROTECT, related_name='production_planning_sale',
                             verbose_name='Orden de venta')
    date = models.DateField(verbose_name='Fecha', default=timezone.now)
    raw_material = models.DecimalField(verbose_name='Materia Prima', max_digits=9, decimal_places=2, default=0,
                                       blank=True)
    performance = models.DecimalField(verbose_name='Rendimiento', max_digits=4, decimal_places=2, default=0, blank=True)
    capacity = models.DecimalField(verbose_name='Capacidad', max_digits=9, decimal_places=2, default=0, blank=True)
    expected = models.DecimalField(verbose_name='Cantidad esperada', max_digits=9, decimal_places=2, default=0,
                                   blank=True)
    stock_start = models.DecimalField(verbose_name='Stock inicial', max_digits=9, decimal_places=2, default=0,
                                      blank=True)
    stock_end = models.DecimalField(verbose_name='Stock final', max_digits=9, decimal_places=2, default=0, blank=True)
    process_plant = models.ForeignKey(Outsourcing, on_delete=models.PROTECT,
                                      related_name='production_planning_process_plant',
                                      verbose_name='Planta de proceso')

    def __str__(self):
        return str(self.id)

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.expected = self.raw_material * (self.performance / 100)
        self.stock_end = self.stock_start + self.expected
        super().save(force_insert, force_update, using, update_fields)

        try:
            self.sale.update_date_manufacturing()
            self.sale.save()
        except:
            pass

    def get_missing(self):
        try:
            quantity = self.sale.quantity
            if quantity > self.stock_end:
                return quantity - self.stock_end
            else:
                return 0
        except:
            return 0

    def surplus(self):
        try:
            quantity = self.sale.quantity
            if quantity < self.stock_end:
                return self.stock_end - quantity
            else:
                return 0
        except:
            return 0
