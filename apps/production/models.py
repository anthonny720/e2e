from django.db import models


class PineappleConditioning(models.Model):
    date = models.DateField(verbose_name='Fecha')
    lot = models.CharField(max_length=12, verbose_name='Lote')
    presentation = models.CharField(max_length=20, verbose_name='Presentación')
    logistic = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Logística')
    reject = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Rechazo')
    crown = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Corona')
    shell = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Cáscara')
    trunk= models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Tronco')
    pulp= models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Pulpa')
    brix = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Brix')
    ph= models.DecimalField(max_digits=4, decimal_places=2, verbose_name='pH')

    class Meta:
        verbose_name = 'Acondicionado de Piña'
        verbose_name_plural = 'Acondicionado de Piña'
        ordering = ['date']


class PineapplePacking(models.Model):
    date= models.DateField(verbose_name='Fecha')
    date_packing= models.DateField(verbose_name='Fecha de Envasado')
    lot= models.CharField(max_length=12, verbose_name='Lote')
    logistic= models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Logística')
    process= models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Proceso')
    cut= models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Corte')
    lot_packing= models.CharField(max_length=12, verbose_name='Lote de Envasado')
    customer= models.CharField(max_length=50, verbose_name='Cliente')
    boxes = models.IntegerField(verbose_name='Cajas')
    bags = models.IntegerField(verbose_name='Bolsas')
    bags_extra = models.IntegerField(verbose_name='Bolsas Extra')
    pt_total = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Total')
    pt_local = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Local')
    pt_subproduct = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Subproducto')
    pt_merma = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Merma')
    pt_quality = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Calidad')
    lots_aggregated = models.CharField(max_length=12, verbose_name='Lotes Agregados')
    pt_aggregated = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Agregado')
    humidity = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Humedad')


    class Meta:
        verbose_name = 'Empaque de Piña'
        verbose_name_plural = 'Empaque de Piña'
        ordering = ['date']




class MOD(models.Model):
    date = models.DateField(verbose_name='Fecha')
    product = models.CharField(max_length=50, verbose_name='Producto')
    process = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Proceso')
    people_conditioning = models.IntegerField(verbose_name='Personas Acondicionado')
    people_conditioning_hours = models.DurationField(verbose_name='Horas Acondicionado')
    cmo_conditioning = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Acondicionado')
    people_conditioning_25 = models.IntegerField(verbose_name='Personas Acondicionado 25%')
    people_conditioning_25_hours = models.DurationField(verbose_name='Horas Acondicionado 25%')
    cmo_conditioning_25 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Acondicionado 25%')
    people_conditioning_35 = models.IntegerField(verbose_name='Personas Acondicionado 35%')
    people_conditioning_35_hours = models.DurationField(verbose_name='Horas Acondicionado 35%')
    cmo_conditioning_35 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Acondicionado 35%')
    pt = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT')
    people_packing = models.IntegerField(verbose_name='Personas Empaque')
    people_packing_hours = models.DurationField(verbose_name='Horas Empaque')
    cmo_packing = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Empaque')
    people_packing_25 = models.IntegerField(verbose_name='Personas Empaque 25%')
    people_packing_25_hours = models.DurationField(verbose_name='Horas Empaque 25%')
    cmo_packing_25 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Empaque 25%')
    people_packing_35 = models.IntegerField(verbose_name='Personas Empaque 35%')
    people_packing_35_hours = models.DurationField(verbose_name='Horas Empaque 35%')
    cmo_packing_35 = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Empaque 35%')
    people_night = models.IntegerField(verbose_name='Personas Noche')
    people_night_hours = models.DurationField(verbose_name='Horas Noche')
    cmo_night = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Noche')
    people_rest = models.IntegerField(verbose_name='Personas Descanso')
    people_rest_hours = models.DurationField(verbose_name='Horas Descanso')
    cmo_rest = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='CMO Descanso')


    
    class Meta:
        verbose_name = 'MOD'
        verbose_name_plural = 'MOD'
        ordering = ['date']