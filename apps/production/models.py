from django.db import models
from simple_history.models import HistoricalRecords


class PineappleConditioning(models.Model):
    date = models.DateField(verbose_name='Fecha')
    lot = models.CharField(max_length=12, verbose_name='Lote')
    presentation = models.CharField(max_length=20, verbose_name='Presentación')
    logistic = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Logística')
    reject = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Rechazo')
    crown = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Corona')
    shell_trunk = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Cáscara/Tronco')
    pulp= models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Pulpa')
    brix = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Brix')
    ph= models.DecimalField(max_digits=4, decimal_places=2, verbose_name='pH')
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Acondicionado de Piña'
        verbose_name_plural = 'Acondicionado de Piña'
        ordering = ['date']

    def __str__(self):
        return f'{self.date.strftime("%d/%m/%Y")} - {self.lot}'


class PineapplePacking(models.Model):
    date= models.DateField(verbose_name='Fecha')
    date_packing= models.DateField(verbose_name='Fecha de Envasado')
    lot= models.CharField(max_length=12, verbose_name='Lote')
    logistic= models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Logística')
    process= models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Proceso')
    cut= models.CharField(max_length=20, verbose_name='Corte')
    lot_packing= models.CharField(max_length=12, verbose_name='Lote de Envasado')
    customer= models.CharField(max_length=50, verbose_name='Cliente')
    boxes = models.IntegerField(verbose_name='Cajas',default=0, blank=True)
    bags = models.IntegerField(verbose_name='Bolsas',default=0, blank=True)
    bags_extra = models.IntegerField(verbose_name='Bolsas Extra',default=0, blank=True)
    pt_total = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Total',default=0)
    pt_local = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Local',default=0, blank=True)
    pt_subproduct = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Subproducto',default=0, blank=True)
    pt_merma = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Merma',default=0, blank=True)
    pt_quality = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Calidad',default=0, blank=True)
    lots_aggregated = models.CharField(max_length=12, verbose_name='Lotes Agregados',blank=True)
    pt_aggregated = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Agregado',default=0, blank=True)
    humidity = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Humedad',default=0, blank=True)
    history = HistoricalRecords()


    class Meta:
        verbose_name = 'Envasado de Piña'
        verbose_name_plural = 'Envasado de Piña'
        ordering = ['date']

    def __str__(self):
        return f'{self.date.strftime("%d/%m/%Y")} - {self.lot}'




class MOD(models.Model):
    date = models.DateField(verbose_name='Fecha')
    product = models.CharField(max_length=50, verbose_name='Producto',blank=True)
    process = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Proceso',default=0)
    people_conditioning = models.IntegerField(verbose_name='Personas Acondicionado',default=0)
    people_conditioning_hours = models.DecimalField(verbose_name='Horas Acondicionado',default=0, max_digits=4, decimal_places=2)
    cmo_conditioning = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Acondicionado',default=0)
    people_conditioning_25 = models.IntegerField(verbose_name='Personas Acondicionado 25%',default=0)
    people_conditioning_25_hours = models.DecimalField(verbose_name='Horas Acondicionado 25%',default=0, max_digits=4, decimal_places=2)
    cmo_conditioning_25 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Acondicionado 25%',default=0)
    people_conditioning_35 = models.IntegerField(verbose_name='Personas Acondicionado 35%',default=0)
    people_conditioning_35_hours = models.DecimalField(verbose_name='Horas Acondicionado 35%',default=0, max_digits=4, decimal_places=2)
    cmo_conditioning_35 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Acondicionado 35%',default=0)
    pt = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT',default=0)
    people_packing = models.IntegerField(verbose_name='Personas Envasado',default=0)
    people_packing_hours = models.DecimalField(verbose_name='Horas Envasado',default=0, max_digits=4, decimal_places=2)
    cmo_packing = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Envasado',default=0)
    people_packing_25 = models.IntegerField(verbose_name='Personas Envasado 25%',default=0)
    people_packing_25_hours = models.DecimalField(verbose_name='Horas Envasado 25%',default=0, max_digits=4, decimal_places=2)
    cmo_packing_25 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Envasado 25%',default=0)
    people_packing_35 = models.IntegerField(verbose_name='Personas Envasado 35%',default=0)
    people_packing_35_hours = models.DecimalField(verbose_name='Horas Envasado 35%',default=0, max_digits=4, decimal_places=2)
    cmo_packing_35 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Envasado 35%',default=0)
    people_night = models.IntegerField(verbose_name='Personas Noche',default=0)
    people_night_hours = models.DecimalField(verbose_name='Horas Noche',default=0, max_digits=4, decimal_places=2)
    cmo_night = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Noche',default=0)
    people_rest = models.IntegerField(verbose_name='Personas Descanso',default=0)
    people_rest_hours = models.DecimalField(verbose_name='Horas Descanso',default=0, max_digits=4, decimal_places=2)
    cmo_rest = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Descanso',default=0)
    history = HistoricalRecords()



    class Meta:
        verbose_name = 'MOD'
        verbose_name_plural = 'MOD'
        ordering = ['date']

    def __str__(self):
        return f'{self.date.strftime("%d/%m/%Y")} - {self.product}'