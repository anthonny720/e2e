from django.db import models


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
