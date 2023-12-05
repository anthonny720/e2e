from datetime import timedelta, date

from django.db import models
from django.db.models import Sum
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify

<<<<<<< HEAD
from apps.management.models import Categories, Suppliers, Outsourcing, UnitOfMeasurement
=======
from apps.collection.models import Product as RawMaterial
from apps.logistic.models import Lot
from apps.management.models import Categories, Suppliers, Customer, Outsourcing, UnitOfMeasurement
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977


# Create your models here.

class ItemsProxy(models.Model):
    class Meta:
        ordering = ["name"]
        abstract = True

    name = models.CharField(max_length=200, verbose_name="Nombre", blank=True)
    sap = models.CharField(max_length=10, verbose_name='Código SAP', blank=True, null=True)
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

    performance = models.DecimalField(verbose_name='% Rendimiento', max_digits=3, decimal_places=1, default=0,
                                      blank=False)
    capacity = models.IntegerField(verbose_name='Capacidad', default=0, blank=False)
    recipe = models.ManyToManyField('Material', related_name='products_recipes', verbose_name='Recetario',
                                    through='Recipe')
    slug = models.SlugField(max_length=250, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Material(ItemsProxy):
    class Meta:
        verbose_name = 'Material'
        verbose_name_plural = 'Materiales'

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

<<<<<<< HEAD
    quantity = models.DecimalField(verbose_name='Cantidad', max_digits=12, decimal_places=10, default=0, blank=True)
=======
    quantity = models.DecimalField(verbose_name='Cantidad - StandarPallet', max_digits=12, decimal_places=10, default=0,
                                   blank=True)

    quantity_euro = models.DecimalField(verbose_name='Cantidad - EuroPallet', max_digits=12, decimal_places=10,
                                        default=0, blank=True)

    quantity_loose = models.DecimalField(verbose_name='Cantidad - Suelto', max_digits=12, decimal_places=10, default=0,
                                         blank=True)
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

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
        stock_entries = StockEntry.objects.filter(stock__gt=0, item=self.product)
        total_cost = sum(entry.price_per_unit * entry.stock for entry in stock_entries)
        total_quantity = sum(entry.stock for entry in stock_entries)
        if total_quantity > 0:
            unit_price = total_cost / total_quantity  # Calculate the unit price
            self.product.price = unit_price  # Update the product price
            self.product.save()  # Save the product

    def get_price(self):
        try:
            return self.product.price
        except Material.DoesNotExist:
            return 0

    def calculate_daily_consumption_average(self):
        try:
            today = date.today()
            three_months_ago = today - timedelta(days=3 * 30)  # Subtract 3 months from the current date

            # Filter stock exits in the last 3 months related to this specific product
            stock_exits_last_three_months = StockExit.objects.filter(stock_entry__item=self.product,
                                                                     date__gte=three_months_ago, date__lte=today)

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
            purchase = StockEntry.objects.filter(item=self.product).order_by('-po_date').first()
            return purchase
        except Exception as e:
            return str(e)

    def get_last_lead_time(self):
        try:

            purchase = self.get_lead_time()

            if purchase.arrival_date:
                lead_time = purchase.arrival_date - purchase.po_date
                lead_time_with_additional_days = lead_time + timedelta(days=5)
                avg = sum([lead_time, lead_time_with_additional_days], timedelta()) / len(
                    [lead_time, lead_time_with_additional_days] or 1)
                return avg.days
            else:
                return None
        except StockEntry.DoesNotExist:
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


@receiver(post_save, sender=Stock)
def update_material_price(sender, instance, **kwargs):
    instance.update_material_price()


class StockEntry(models.Model):
    class Meta:
        verbose_name = 'Ingreso de stock'
        verbose_name_plural = 'Ingresos de stock'
        ordering = ('-arrival_date', '-id')

    item = models.ForeignKey(Material, on_delete=models.PROTECT, related_name='stock_entries', verbose_name='Material',
                             blank=True, null=True)
    po_number = models.CharField(verbose_name='Número de orden de compra', max_length=50, blank=True, null=True)
    po_date = models.DateField(verbose_name='Fecha de orden de compra', default=timezone.now)
    arrival_date = models.DateField(verbose_name='Fecha de llegada', blank=True, null=True)
    provider = models.ForeignKey(Suppliers, on_delete=models.PROTECT, related_name='stock_entries',
                                 verbose_name='Proveedor', blank=True, null=True)
    factura = models.CharField(verbose_name='Factura', max_length=50, blank=True, null=True)
    quantity = models.IntegerField(verbose_name='Cantidad de ingreso', default=0)
    price_per_unit = models.DecimalField(verbose_name='Precio unitario', max_digits=7, decimal_places=2, default=0)
    stock = models.IntegerField(verbose_name='Cantidad de stock', default=0, editable=False)

    def __str__(self):
<<<<<<< HEAD
        return f'{self.item.name} {self.quantity} und - S/.{str(self.price_per_unit)} - {self.arrival_date}'

    def save(self, *args, **kwargs):
        try:
            stocks = Stock.objects.filter(product=self.item)
            last = stocks.last() if stocks.exists() else None
            stock, created = Stock.objects.get_or_create(product=self.item, date=timezone.now())
            if not self.pk:
                if created:
                    stock.quantity = last.quantity if last else 0
=======
        return f'Ingreso de {self.quantity} unidades de {self.item.name} el {self.arrival_date}'

    def save(self, *args, **kwargs):
        try:
            last = Stock.objects.filter(product=self.item).last()
            stock, created = Stock.objects.get_or_create(product=self.item, date=timezone.now())
            if not self.pk:
                if created:
                    stock.quantity = last.quantity
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                stock.quantity += self.quantity
                stock.save()
                self.stock = self.quantity
            super().save(*args, **kwargs)
            stock.update_material_price()
        except Exception as e:
            raise ValueError(str(e))


<<<<<<< HEAD
class StockReentry(models.Model):
=======
class StockReEntry(models.Model):
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
    class Meta:
        verbose_name = 'Reingreso de stock'
        verbose_name_plural = 'Reingresos de stock'
        ordering = ('-date', '-id')

    stock_entry = models.ForeignKey(StockEntry, on_delete=models.PROTECT, related_name='stock_reentries')
    date = models.DateField(verbose_name='Fecha', auto_now=True)
    quantity = models.IntegerField(verbose_name='Cantidad de reingreso')

    def __str__(self):
        return f'Reingreso de {self.quantity} unidades de {self.stock_entry.item} el {self.date}'

    def save(self, *args, **kwargs):
        try:
<<<<<<< HEAD
            stocks = Stock.objects.filter(product=self.stock_entry.item)
            last = stocks.last() if stocks.exists() else None
            stock, created = Stock.objects.get_or_create(product=self.stock_entry.item, date=timezone.now())
            if not self.pk:
                if created:
                    stock.quantity = last.quantity if last else 0
=======
            last = Stock.objects.filter(product=self.stock_entry.item).last()
            stock, created = Stock.objects.get_or_create(product=self.stock_entry.item, date=timezone.now())
            if not self.pk:
                if created:
                    stock.quantity = last.quantity
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                stock.quantity += self.quantity
                stock.save()
                self.stock_entry.stock += self.quantity
                self.stock_entry.save()

            super().save(*args, **kwargs)
            stock.update_material_price()
        except Exception as e:
            raise ValueError(str(e))


class StockExit(models.Model):
    class Meta:
        verbose_name = 'Salida de stock'
        verbose_name_plural = 'Salidas de stock'
        ordering = ('-date', '-id')

<<<<<<< HEAD
    OPTIONS_AREA = (('P', 'Producción'), ('C', 'Calidad'), ('ID', 'I+D'), ('PP', 'PP'),)

    stock_entry = models.ForeignKey(StockEntry, on_delete=models.PROTECT, related_name='stock_exits')
    date = models.DateField(verbose_name='Fecha', auto_now=True)
    quantity = models.IntegerField(verbose_name='Cantidad de salida')
    area = models.CharField(verbose_name='Área', max_length=2, choices=OPTIONS_AREA, default='P')
    applicant = models.CharField(verbose_name='Solicitante', max_length=50, blank=True, null=True)
    vale_number = models.CharField(verbose_name='Número de vale o guía', max_length=50, blank=True, null=True)
=======
    stock_entry = models.ForeignKey(StockEntry, on_delete=models.PROTECT, related_name='stock_exits')
    date = models.DateField(verbose_name='Fecha', auto_now=True)
    quantity = models.IntegerField(verbose_name='Cantidad de salida')
    guide_number = models.CharField(verbose_name='Número de guía', max_length=50, blank=True, null=True)
    vale_number = models.CharField(verbose_name='Número de vale', max_length=50, blank=True, null=True)
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
    lot_id = models.CharField(verbose_name='Número de lote', max_length=50, blank=True, null=True)

    def __str__(self):
        return f'Salida de {self.quantity} unidades de {self.stock_entry.item.name} el {self.date}'

    def save(self, *args, **kwargs):
        try:
<<<<<<< HEAD
            stocks = Stock.objects.filter(product=self.stock_entry.item)
            last = stocks.last() if stocks.exists() else None

            stock, created = Stock.objects.get_or_create(product=self.stock_entry.item, date=timezone.now())
            if not self.pk:
                if created:
                    stock.quantity = last.quantity if last else 0
=======
            last = Stock.objects.filter(product=self.stock_entry.item).last()
            stock, created = Stock.objects.get_or_create(product=self.stock_entry.item, date=timezone.now())
            if not self.pk:
                if created:
                    stock.quantity = last.quantity
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
                if self.quantity > stock.quantity:
                    raise ValueError('La cantidad de salida no puede ser mayor a la cantidad de stock.')
                if self.quantity > self.stock_entry.stock:
                    raise ValueError('La cantidad de salida no puede ser mayor a la cantidad de stock.')
                stock.quantity -= self.quantity
                stock.save()
                self.stock_entry.stock -= self.quantity
                self.stock_entry.save()
<<<<<<< HEAD

            super().save(*args, **kwargs)
            stock.update_material_price()
=======
            stock.update_material_price()
            super().save(*args, **kwargs)
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
        except Exception as e:
            raise ValueError(str(e))


class ProductionPlanning(models.Model):
    class Meta:
        verbose_name = 'Planificación de producción'
<<<<<<< HEAD
        verbose_name_plural = 'Planificación de producción'  # ordering = ['-sale__date']
=======
        verbose_name_plural = 'Planificación de producción'
        # ordering = ['-sale__date']
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

    sale = models.ForeignKey('commercial.SalesProgress', on_delete=models.CASCADE, related_name='production_planning',
                             verbose_name='Orden de venta', blank=True, null=True)
    date = models.DateField(verbose_name='Fecha', default=timezone.now)
    raw_material = models.DecimalField(verbose_name='Materia Prima', max_digits=9, decimal_places=2, default=0,
                                       blank=True)
    performance = models.DecimalField(verbose_name='Rendimiento', max_digits=4, decimal_places=2, default=0, blank=True)
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

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
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
            quantity = self.sale.kg
            if quantity > self.stock_end:
                return quantity - self.stock_end
            else:
                return 0
        except:
            return 0

    def surplus(self):
        try:
            quantity = self.sale.kg
            if quantity < self.stock_end:
                return self.stock_end - quantity
            else:
                return 0
        except:
            return 0
