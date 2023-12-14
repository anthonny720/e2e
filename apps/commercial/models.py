from django import dispatch
from django.db import models
from django.db.models.signals import post_save
from django_countries.fields import CountryField
from simple_history.models import HistoricalRecords
from slugify import slugify

from apps.management.models import Customer
from apps.operations_and_planning.models import Product, Recipe


# Create your models here.


class Proforma(models.Model):
    class Meta:
        verbose_name = 'Proforma'
        verbose_name_plural = 'Proformas'
        ordering = ['-created_at']

    class StatusChoices(models.TextChoices):
        _100 = '100', '100'
        _90 = '90', '90'
        _60 = '60', '60'
        _30 = '30', '30'

    class PaymentTermsChoices(models.TextChoices):
        PAYMENT_30 = '30', '30'
        PAYMENT_60 = '60', '60'
        PAYMENT_90 = '90', '90'
        PAYMENT_100 = '100', '100'
        PAYMENT_120 = '120', '120'

    class MarketChoices(models.TextChoices):
        NATIONAL = 'N', 'Nacional'
        INTERNATIONAL = 'I', 'Internacional'

    class RegionChoices(models.TextChoices):
        AMERICA = 'A', 'América'
        EUROPE = 'E', 'Europa'
        ASIA = 'AS', 'Asia'

    class TransportModeChoices(models.TextChoices):
        AIR = 'A', 'Aéreo'
        SEA = 'S', 'Marítimo'
        LAND = 'L', 'Terrestre'

    class IncotermChoices(models.TextChoices):
        FOB = 'FOB', 'FOB'
        CIF = 'CIF', 'CIF'
        EXW = 'EXW', 'EXW'
        DAP = 'DAP', 'DAP'
        DDP = 'DDP', 'DDP'
        CFR = 'CFR', 'CFR'
        CFR_HAMBURG = 'CFR_HAMBURG', 'CFR Hamburgo'
        CFR_MIAMI = 'CFR_MIAMI', 'CFR Miami'
        FCA = 'FCA', 'FCA'

    kam = models.ForeignKey('users.UserAccount', on_delete=models.CASCADE, verbose_name='KAM')
    commercial_status = models.CharField(max_length=4, choices=StatusChoices.choices, verbose_name='Estado comercial',
                                         default=StatusChoices._100)
    commercial_dispatch_date = models.DateField(verbose_name='Fecha de despacho comercial')
    po_number = models.CharField(max_length=20, verbose_name='# OC')
    pfi_number = models.CharField(max_length=20, verbose_name='# PFI')
    client = models.CharField(max_length=255, verbose_name='Cliente', blank=True, null=True)
    skus = models.ManyToManyField(Product, through='SKU_PFI', verbose_name='SKU')
    payment_terms = models.CharField(max_length=255, verbose_name='Términos de pago',
                                     choices=PaymentTermsChoices.choices, default=PaymentTermsChoices.PAYMENT_30)
    drive = models.URLField(verbose_name='Drive', blank=True, null=True)
    market = models.CharField(max_length=1, verbose_name='Mercado', choices=MarketChoices.choices,
                              default=MarketChoices.NATIONAL)
    region = models.CharField(max_length=2, verbose_name='Región', choices=RegionChoices.choices,
                              default=RegionChoices.AMERICA)
    country = CountryField(verbose_name='País', blank=True, null=True)
    port_city_destination = models.CharField(max_length=100, verbose_name='Puerto/Ciudad de destino', blank=True,
                                             null=True)
    transport_mode = models.CharField(max_length=4, verbose_name='Modo de transporte',
                                      choices=TransportModeChoices.choices, default=TransportModeChoices.SEA)
    incoterm = models.CharField(max_length=11, verbose_name='Incoterm', choices=IncotermChoices.choices,
                                default=IncotermChoices.FOB)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')
    history = HistoricalRecords()

    def __str__(self):
        return self.pfi_number


class SKU_PFI(models.Model):
    class CategoryChoices(models.TextChoices):
        E = 'E', 'Exportacion'
        A = 'A', 'A'
        B = 'B', 'B'
        C = 'C', 'C'

    class Meta:
        verbose_name_plural = 'SKU Proformas'
        verbose_name = 'SKU Proforma'

    proforma = models.ForeignKey(Proforma, on_delete=models.CASCADE, verbose_name='Proforma', blank=True, null=True)
    client = models.ForeignKey(Customer, on_delete=models.CASCADE, verbose_name='Cliente', blank=True, null=True)
    sku = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='SKU')
    kg = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Kg')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='$ Precio(kg)')
    category = models.CharField(max_length=1, verbose_name='Categoría', choices=CategoryChoices.choices,
                                default=CategoryChoices.E)

    def __str__(self):
        return self.sku.name


@dispatch.receiver(post_save, sender=SKU_PFI)
def create_progress(sender, instance, created, **kwargs):
    if created:
        SalesProgress.objects.create(kam=instance.proforma.kam.get_full_name(),
                                     commercial_status=instance.proforma.get_commercial_status_display(),
                                     date=instance.proforma.commercial_dispatch_date,
                                     po_number=instance.proforma.po_number, pfi_number=instance.proforma.pfi_number,
                                     payment_terms=instance.proforma.get_payment_terms_display(),
                                     market=instance.proforma.get_market_display(),
                                     region=instance.proforma.get_region_display(), country=instance.proforma.country,
                                     port_city_destination=instance.proforma.port_city_destination,
                                     transport_mode=instance.proforma.get_transport_mode_display(), sku_id=instance,
                                     incoterm=instance.proforma.get_incoterm_display(), sku=instance.sku.name,
                                     kg=instance.kg, price=instance.price, client_name=instance.client.business_name,
                                     drive=instance.proforma.drive, client_initials=instance.proforma.client,
                                     category=instance.get_category_display())
    else:
        progress = SalesProgress.objects.get(sku_id=instance)
        progress.kam = instance.proforma.kam.get_full_name()
        progress.commercial_status = instance.proforma.get_commercial_status_display()
        progress.date = instance.proforma.commercial_dispatch_date
        progress.po_number = instance.proforma.po_number
        progress.pfi_number = instance.proforma.pfi_number
        progress.payment_terms = instance.proforma.get_payment_terms_display()
        progress.market = instance.proforma.get_market_display()
        progress.region = instance.proforma.get_region_display()
        progress.country = instance.proforma.country
        progress.port_city_destination = instance.proforma.port_city_destination
        progress.transport_mode = instance.proforma.get_transport_mode_display()
        progress.sku_id = instance
        progress.incoterm = instance.proforma.get_incoterm_display()
        progress.sku = instance.sku.name
        progress.kg = instance.kg
        progress.price = instance.price
        progress.client_name = instance.client.business_name
        progress.client_initials = instance.proforma.client
        progress.drive = instance.proforma.drive
        progress.category = instance.get_category_display()
        progress.save()


class Invoice(models.Model):
    class Meta:
        verbose_name_plural = 'Facturas'
        verbose_name = 'Factura'

    invoice_number = models.CharField(max_length=20, verbose_name='# Factura')
    invoice_date = models.DateField(verbose_name='Fecha de factura')
    proforma = models.ForeignKey(Proforma, on_delete=models.CASCADE, verbose_name='Proforma')
    pfi_number = models.CharField(max_length=20, verbose_name='# PFI')
    due_date = models.DateField(verbose_name='Fecha de vencimiento')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Monto total')

    def __str__(self):
        return self.invoice_number

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.pfi_number = self.proforma.pfi_number
        super().save(force_insert, force_update, using, update_fields)


class DispatchInfo(models.Model):
    class Meta:
        verbose_name = 'Información de despacho'
        verbose_name_plural = 'Información de despachos'
        ordering = ['-load_date']

    load_date = models.DateField(verbose_name='Fecha de carga', blank=True, null=True)
    ship = models.CharField(max_length=50, verbose_name='Nave', blank=True, null=True)
    etd = models.DateField(verbose_name='ETD', blank=True, null=True)
    eta = models.DateField(verbose_name='ETA', blank=True, null=True)
    booking = models.CharField(max_length=20, verbose_name='Booking', blank=True, null=True)
    bl_or_awb = models.CharField(max_length=20, verbose_name='BL O AWB', blank=True, null=True)
    coi_or_tc = models.CharField(max_length=20, verbose_name='COI / TC', blank=True, null=True)
    fcl_number = models.CharField(max_length=5, verbose_name='# FCL', blank=True, null=True)
    fcl_equiv_40 = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='FCL Equiv 40', blank=True,
                                       null=True)

    def __str__(self):
        if self.ship is None:
            self.ship = ''
        if self.booking is None:
            self.booking = ''
        if self.bl_or_awb is None:
            self.bl_or_awb = ''
        return self.ship + ' - ' + self.booking + ' - ' + self.bl_or_awb


@dispatch.receiver(post_save, sender=DispatchInfo)
def update_progress(sender, instance, created, **kwargs):
    sales = SalesProgress.objects.filter(dispatch_id=instance)
    for i in sales:
        i.load_date = instance.load_date
        i.ship = instance.ship
        i.etd = instance.etd
        i.eta = instance.eta
        i.booking = instance.booking
        i.bl_or_awb = instance.bl_or_awb
        i.coi_or_tc = instance.coi_or_tc
        i.fcl_number = instance.fcl_number
        i.fcl_equiv_40 = instance.fcl_equiv_40
        i.save()


class SalesProgress(models.Model):
    class Meta:
        verbose_name_plural = 'Avances de venta'
        verbose_name = 'Avance de venta'

    class StatusChoices(models.TextChoices):
        TO_BE_TAGGED = 'TBT', 'Por etiquetar'
        TO_BE_DISPATCHED = 'TBD', 'Por despachar'
        TO_BE_PROCESSED = 'TBP', 'Por procesar'
        PROCESSED = 'P', 'Procesado'

    class StatusSaleChoices(models.TextChoices):
        P = 'P', 'Plan',
        R = 'R', 'Real'

    sku_id = models.ForeignKey(SKU_PFI, on_delete=models.CASCADE, verbose_name='SKU', related_name='sku_sales',
                               blank=True, null=True)
    dispatch_id = models.ForeignKey(DispatchInfo, on_delete=models.CASCADE, verbose_name='Despacho',
                                    related_name='dispatch', blank=True, null=True)
    sku = models.CharField(max_length=255, verbose_name='SKU', blank=True, null=True)
    drive = models.URLField(max_length=255, verbose_name='Drive', blank=True, null=True)
    category = models.CharField(max_length=11, verbose_name='Categoría', blank=True, null=True)
    type_sale = models.CharField(max_length=1, verbose_name='Tipo de venta', choices=StatusSaleChoices.choices,
                                 blank=True, null=True, default=StatusSaleChoices.P)
    kg = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Kg', blank=True, null=True)
    commercial_status = models.CharField(max_length=3, verbose_name='Estado comercial', blank=True, null=True)
    client_name = models.CharField(max_length=255, verbose_name='Cliente final', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio', blank=True, null=True)
    incoterm = models.CharField(max_length=13, verbose_name='Incoterm', blank=True, null=True)
    fcl_name = models.CharField(max_length=255, verbose_name='FCL', blank=True, null=True)
    status = models.CharField(max_length=16, verbose_name='Estado', choices=StatusChoices.choices,
                              default=StatusChoices.TO_BE_PROCESSED)
    price_total = models.DecimalField(max_digits=10, decimal_places=4, verbose_name='Total', blank=True, null=True)
    price_m = models.DecimalField(max_digits=10, decimal_places=4, verbose_name='Precio Mil', blank=True, null=True)
    cost_fob = models.DecimalField(max_digits=10, decimal_places=4, verbose_name='Costo FOB', blank=True, null=True)
    price_fob = models.DecimalField(max_digits=10, decimal_places=4, verbose_name='Precio FOB', blank=True, null=True)
    cost_exw = models.DecimalField(max_digits=10, decimal_places=4, verbose_name='Costo EXW', blank=True, null=True)
    month = models.CharField(max_length=20, verbose_name='Mes', blank=True, null=True)
    year = models.CharField(max_length=20, verbose_name='Año', blank=True, null=True)
    date = models.DateField(verbose_name='Fecha', blank=True, null=True)
    kam = models.CharField(max_length=255, verbose_name='KAM', blank=True, null=True)
    po_number = models.CharField(max_length=255, verbose_name='PO', blank=True, null=True)
    pfi_number = models.CharField(max_length=255, verbose_name='PFI', blank=True, null=True)
    client_initials = models.CharField(max_length=255, verbose_name='Cliente', blank=True, null=True)
    payment_terms = models.CharField(max_length=255, verbose_name='Términos de pago', blank=True, null=True)

    market = models.CharField(max_length=20, verbose_name='Mercado', blank=True, null=True)
    region = models.CharField(max_length=20, verbose_name='Región', blank=True, null=True)
    country = models.CharField(max_length=20, verbose_name='País', blank=True, null=True)
    port_city_destination = models.CharField(max_length=100, verbose_name='Puerto/Ciudad de destino', blank=True,
                                             null=True)
    transport_mode = models.CharField(max_length=15, verbose_name='Modo de transporte', blank=True, null=True)
    load_date = models.DateField(verbose_name='Fecha de carga', blank=True, null=True)
    ship = models.CharField(max_length=50, verbose_name='Nave', blank=True, null=True)
    etd = models.DateField(verbose_name='ETD', blank=True, null=True)
    eta = models.DateField(verbose_name='ETA', blank=True, null=True)
    booking = models.CharField(max_length=20, verbose_name='Booking', blank=True, null=True)
    bl_or_awb = models.CharField(max_length=20, verbose_name='BL O AWB', blank=True, null=True)
    coi_or_tc = models.CharField(max_length=20, verbose_name='COI / TC', blank=True, null=True)
    fcl_number = models.CharField(max_length=5, verbose_name='# FCL', blank=True, null=True)
    fcl_equiv_40 = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='FCL Equiv 40', blank=True,
                                       null=True)

    mp = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='MP', blank=True, null=True, editable=False)
    start_process = models.DateField(verbose_name='Inicio de proceso', blank=True, null=True, editable=False)
    end_process = models.DateField(verbose_name='Fin de proceso', blank=True, null=True, editable=False)

    slug = models.SlugField(max_length=255, verbose_name='Slug', blank=True, null=True, editable=False)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')

    history = HistoricalRecords()

    def __str__(self):
        try:
            if self.sku:
                return self.sku + ' - ' + self.client_name + ' - ' + self.fcl_name + ' - ' + str(self.kg) + 'kg'
            else:
                return 'No SKU'
        except:
            return ''

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        # if self.id:
        #     # if self.type_sale == 'P':
        #     #     return None

        if self.date:
            self.month = self.date.strftime('%B')
            self.year = self.date.strftime('%Y')

        if self.kg and self.price:
            self.price_total = self.kg * self.price
            self.price_m = self.kg * self.price / 1000

        if self.dispatch_id:
            dispatch = DispatchInfo.objects.filter(id=self.dispatch_id.id).first()
            if dispatch:
                self.load_date = dispatch.load_date
                self.ship = dispatch.ship
                self.etd = dispatch.etd
                self.eta = dispatch.eta
                self.booking = dispatch.booking
                self.bl_or_awb = dispatch.bl_or_awb
                self.coi_or_tc = dispatch.coi_or_tc
                self.fcl_number = dispatch.fcl_number
                self.fcl_equiv_40 = dispatch.fcl_equiv_40
        if self.sku_id:
            sku = SKU_PFI.objects.filter(id=self.sku_id.id).first()
            if sku:
                self.kam = sku.proforma.kam.get_full_name()
                self.commercial_status = sku.proforma.get_commercial_status_display()
                self.date = sku.proforma.commercial_dispatch_date
                self.po_number = sku.proforma.po_number
                self.pfi_number = sku.proforma.pfi_number
                self.payment_terms = sku.proforma.get_payment_terms_display()
                self.market = sku.proforma.get_market_display()
                self.region = sku.proforma.get_region_display()
                self.country = sku.proforma.country
                self.port_city_destination = sku.proforma.port_city_destination
                self.transport_mode = sku.proforma.get_transport_mode_display()
                self.incoterm = sku.proforma.get_incoterm_display()
                self.sku = sku.sku.name
                self.kg = sku.kg
                self.price = sku.price
                self.client_name = sku.client.business_name
                self.client_initials = sku.proforma.client
                self.drive = sku.proforma.drive
        if self.kg:
            mp = Product.objects.filter(name=self.sku).first()
            if mp:
                self.mp = self.kg / mp.performance * 100 if mp.performance else 0

        self.slug = slugify(self.sku + '-' + str(self.client_name) + "-" + str(self.kg) + "-" + str(self.po_number))
        super().save(force_insert, force_update, using, update_fields)

    def get_month_display(self):
        if self.date:
            return self.date.strftime('%B')
        else:
            return 'No date'

    def get_year_display(self):
        if self.date:
            return self.date.strftime('%Y')
        else:
            return 'No date'

    def get_recipe(self):
        product = Product.objects.filter(name__icontains=self.sku).first()
        result = []
        if product:
            for i in product.recipe_products.all():
                result.append({'name': i.material.name, 'quantity': i.quantity, 'unit': i.material.unit_of_measurement.name,
                               'price': i.material.price})
        return result

    # def get_first_date(self):  #     return self.production_planning.aggregate(first_date=Min('date'))['first_date']  #  # def get_last_date(self):  #     return self.production_planning.aggregate(last_date=Max('date'))['last_date']

    # def update_date_manufacturing(self):  #     try:  #         first_date = self.get_first_date()  #         last_date = self.get_last_date()  #  #         # Actualizar start_date y end_date con las fechas obtenidas  #         self.start_date = first_date  #         self.finish_date = last_date  #  #         # Guardar los cambios en la instancia de SalesOrder  #         self.save()  #     except:  #         pass

    # def get_planning(self):  #     try:  #         query = self.production_planning.all().order_by('date')  #         payload = []  #         for item in query:  #             payload.append({'id': item.id, 'date': item.date, 'raw_material': item.raw_material,  #                             'performance': item.performance, 'expected': item.expected,  #                             'stock_start': item.stock_start, 'stock_end': item.stock_end,  #                             'process_plant_name': item.process_plant.display_name,  #                             'process_plant': item.process_plant.id, 'missing': item.get_missing(),  #                             'surplus': item.surplus()})  #         return payload  #     except Exception as e:  #         return [str(e)]
