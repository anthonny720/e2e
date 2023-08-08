import decimal

from django.contrib.contenttypes.models import ContentType
from django.db import models

from apps.logistic.models import Lot
from apps.management.models import Cut, Customer
from apps.operations_and_planning.models import Product, SalesOrder
from apps.production.models import MOD


# Create your models here.
class CostFixed(models.Model):
    class Meta:
        verbose_name_plural = 'Costos fijos'
        verbose_name = 'Costos fijos'
        ordering = ['-date']

    def __str__(self):
        return str(self.date)

    date = models.DateField(auto_now=True)
    water = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Agua')
    rent = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Alquiler')
    consumables = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Consumibles')
    depreciation = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Depreciación')
    electricity = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Electricidad')
    internet = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Internet')
    indirect_labor = models.DecimalField(max_digits=6, decimal_places=2, default=0,
                                         verbose_name='Mano de obra indirecta')
    maintenance = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Mantenimiento')
    laboratory = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Laboratorio')
    supplementary = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Suplementarios')
    communications = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Comunicaciones')


class ReportCost(models.Model):
    class Meta:
        verbose_name_plural = 'Costos'
        verbose_name = 'Costos'

    def __str__(self):
        return str(self.date)

    date = models.DateField()

    sku = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Producto', related_name='report_cost_sku',
                            blank=True, null=True)
    exchange_rate = models.DecimalField(max_digits=4, decimal_places=3, default=0, verbose_name='Tipo de cambio')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, verbose_name='Cliente',
                                 related_name='report_cost_client', blank=True, null=True)
    full_load_container = models.ForeignKey(SalesOrder, on_delete=models.CASCADE, verbose_name='FCL', blank=True,
                                            null=True, related_name='report_cost_fcl')
    cut = models.ForeignKey(Cut, on_delete=models.CASCADE, verbose_name='Corte', related_name='report_cost_cut',
                            blank=True, null=True)
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, verbose_name='Lote', related_name='report_cost_lot',
                            blank=True, null=True)
    participation = models.DecimalField(max_digits=5, decimal_places=2, default=0, verbose_name='Participación')
    price_mp = models.DecimalField(max_digits=4, decimal_places=2, default=0, verbose_name='Precio MP')
    freight = models.DecimalField(max_digits=7, decimal_places=2, default=0, verbose_name='Flete')
    service_download = models.DecimalField(max_digits=7, decimal_places=2, default=0, verbose_name='Servicio descarga')
    mp = models.DecimalField(max_digits=7, decimal_places=2, default=0, verbose_name='MP')
    detriment = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Merma')
    kg_processed = models.DecimalField(max_digits=7, decimal_places=2, default=0, verbose_name='Kg procesados')
    kg_pt = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Kg PT')
    humidity = models.DecimalField(max_digits=4, decimal_places=2, default=0, verbose_name='Humedad')
    cost_bags = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Costo envase')
    cost_boxes = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Costo empaque')
    cost_materials = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Costo embalaje')
    cost_mod_conditioning = models.DecimalField(max_digits=6, decimal_places=2, default=0,
                                                verbose_name='Costo MOD acondicionamiento')
    cost_mod_packing = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Costo MOD empaque')
    indirect_labor = models.DecimalField(max_digits=6, decimal_places=2, default=0,
                                         verbose_name='Mano de obra indirecta')
    consumables = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Consumibles')
    glp = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='GLP')
    communications = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Comunicaciones')
    laboratory = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Laboratorio')
    maintenance = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Mantenimiento')
    rent = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Alquiler')
    electricity = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Electricidad')
    water = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Agua')
    supplementary = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Suplementarios')
    depreciation = models.DecimalField(max_digits=6, decimal_places=2, default=0, verbose_name='Depreciación')
    price_sale = models.DecimalField(max_digits=4, decimal_places=2, default=0, verbose_name='Precio de venta')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        fixed = CostFixed.objects.last()
        self.water = fixed.water * (decimal.Decimal(self.participation) / 100)
        self.rent = fixed.rent * (decimal.Decimal(self.participation) / 100)
        self.consumables = fixed.consumables * (decimal.Decimal(self.participation) / 100)
        self.depreciation = fixed.depreciation * (decimal.Decimal(self.participation) / 100)
        self.electricity = fixed.electricity * (decimal.Decimal(self.participation) / 100)
        self.internet = fixed.internet * (decimal.Decimal(self.participation) / 100)
        self.indirect_labor = fixed.indirect_labor * (decimal.Decimal(self.participation) / 100)
        self.maintenance = fixed.maintenance * (decimal.Decimal(self.participation) / 100)
        self.laboratory = fixed.laboratory * (decimal.Decimal(self.participation) / 100)
        self.supplementary = fixed.supplementary * (decimal.Decimal(self.participation) / 100)
        self.cost_mod_conditioning = self.cost_mod_conditioning * (self.participation / 100)
        self.cost_mod_packing = self.cost_mod_packing * (self.participation / 100)
        self.glp = float(self.glp) * (float(self.participation) / 100)
        self.cost_bags = float(self.cost_bags) * float(self.exchange_rate)
        self.cost_boxes = float(self.cost_boxes) * float(self.exchange_rate)
        if float(self.mp)>0:
            self.detriment = (float(self.mp) - float(self.kg_processed))


    def get_fcl_name(self):
        try:
            return self.full_load_container.full_container_load_name
        except:
            return "Sin cliente"

