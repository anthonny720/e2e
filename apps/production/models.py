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
    pulp = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Kg Pulpa')
    brix = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Brix')
    ph = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='pH')
    people = models.IntegerField(verbose_name='Personas', default=0)
    hours = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Horas', default=0)
    cost = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo', default=6.28)
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Acondicionado de Piña'
        verbose_name_plural = 'Acondicionado de Piña'
        ordering = ['-date']

    def __str__(self):
        return f'{self.date.strftime("%d/%m/%Y")} - {self.lot}'


class PineapplePacking(models.Model):
    date = models.DateField(verbose_name='Fecha')
    date_packing = models.DateField(verbose_name='Fecha de Envasado')
    lot = models.CharField(max_length=12, verbose_name='Lote')
    logistic = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Logística')
    process = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Proceso')
    cut = models.CharField(max_length=20, verbose_name='Corte')
    lot_packing = models.CharField(max_length=12, verbose_name='Lote de Envasado')
    customer = models.CharField(max_length=50, verbose_name='Cliente')
    boxes = models.IntegerField(verbose_name='Cajas', default=0, blank=True)
    bags = models.IntegerField(verbose_name='Bolsas', default=0, blank=True)
    bags_extra = models.IntegerField(verbose_name='Bolsas Extra', default=0, blank=True)
    pt_total = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Total', default=0)
    pt_local = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Local', default=0, blank=True)
    pt_subproduct = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Subproducto', default=0,
                                        blank=True)
    pt_merma = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Merma', default=0, blank=True)
    pt_quality = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Calidad', default=0, blank=True)
    lots_aggregated = models.CharField(max_length=100, verbose_name='Lotes Agregados', blank=True)
    pt_aggregated = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT Agregado', default=0,
                                        blank=True)
    humidity = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Humedad', default=0, blank=True)

    people = models.IntegerField(verbose_name='Personas', default=0)
    hours = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Horas', default=0)
    cost = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo', default=6.28)
    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Envasado de Piña'
        verbose_name_plural = 'Envasado de Piña'
        ordering = ['-date']

    def __str__(self):
        return f'{self.date.strftime("%d/%m/%Y")} - {self.lot}'


class MOD(models.Model):
    date = models.DateField(verbose_name='Fecha')
    product = models.CharField(max_length=50, verbose_name='Producto', blank=True)
    process = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Proceso', default=0)
    pt = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='PT', default=0)
    worker_rest_day_cost = models.DecimalField(max_digits=7, decimal_places=2,
                                               verbose_name='Costo Día Descanso Trabajador', default=0)
    worker_night_shift_cost = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo Noche Trabajador',
                                                  default=0)
    worker_day_shift_cost = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo Día Trabajador',
                                                default=0)
    supervisor_rest_day_cost = models.DecimalField(max_digits=7, decimal_places=2,
                                                   verbose_name='Costo Día Descanso Supervisor', default=0)
    supervisor_day_shift_cost = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo Día Supervisor',
                                                    default=0)
    controller_rest_day_cost = models.DecimalField(max_digits=7, decimal_places=2,
                                                   verbose_name='Costo Día Descanso Controller', default=0)
    controller_night_shift_cost = models.DecimalField(max_digits=7, decimal_places=2,
                                                      verbose_name='Costo Noche Controller', default=0)
    controller_day_shift_cost = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo Día Controller',
                                                    default=0)
    conditioning = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo Acondicionado',
                                           default=0)
    cmo_packing = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo Envasado', default=0)

    cmo_rest = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Costo Descanso', default=0)

    history = HistoricalRecords()

    class Meta:
        verbose_name = 'MOD'
        verbose_name_plural = 'MOD'
        ordering = ['-date']

    def __str__(self):
        return f'{self.date.strftime("%d/%m/%Y")} - {self.product}'


class Ovens(models.Model):
    class Meta:
        verbose_name = 'Horno'
        verbose_name_plural = 'Hornos'
        ordering = ['-date']

    OVEN_CHOICES = (('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7'),('C','C'))

    date = models.DateField(verbose_name='Fecha')
    product = models.CharField(max_length=50, verbose_name='Producto', blank=True)
    lot = models.CharField(max_length=12, verbose_name='Lote', blank=True)
    presentation = models.CharField(max_length=50, verbose_name='Presentación', blank=True)
    maturation = models.CharField(max_length=50, verbose_name='Maduración', blank=True)
    width = models.CharField(max_length=50, verbose_name='Espesor', blank=True)
    oven = models.CharField(max_length=1, verbose_name='Horno', blank=True, choices=OVEN_CHOICES, default='1')
    cars = models.IntegerField(verbose_name='Carros', default=0)
    trays = models.IntegerField(verbose_name='Bandejas', default=0)
    kg_enable = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Habilitados', default=0,blank=True)
    kg_brute_balance = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Brutos Balanza', default=0,blank=True)
    tare = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Tara', default=0,blank=True)
    kg_enable_balance = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Habilitados Balanza',
                                            default=0,blank=True)
    diff_enable = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Diferencia Habilitados', default=0,blank=True)
    kg_trays = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Kg Bandejas', default=0,blank=True)
    kg_car = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Peso coche', default=9.8)
    kg_tray = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Peso Bandeja', default=1.68)

    def __str__(self):
        return f'{self.date.strftime("%d/%m/%Y")} - {self.product} - {self.lot}'

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.tare = self.get_tare()
        self.kg_enable_balance = self.get_kg_enable_balance()
        self.diff_enable = self.get_diff_enable()
        self.kg_trays = self.get_kg_trays()
        super(Ovens, self).save()

    def get_tare(self):
        try:

            return (self.cars * self.kg_car) + (self.trays * self.kg_tray)
        except:
            return 0

    def get_kg_enable_balance(self):
        try:
            if self.kg_enable_balance and self.kg_enable_balance != 0:
                return self.kg_enable_balance
            return self.kg_brute_balance - self.tare
        except:
            return 0

    def get_diff_enable(self):
        try:
            if self.diff_enable and self.diff_enable != 0:
                return self.diff_enable
            return self.kg_enable - self.kg_enable_balance
        except:
            return 0

    def get_kg_trays(self):
        try:
            if self.kg_trays and self.kg_trays != 0:
                return self.kg_trays
            return self.kg_enable_balance / self.trays
        except:
            return 0
