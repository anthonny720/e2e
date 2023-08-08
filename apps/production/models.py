import decimal
from datetime import timedelta

from django.db import models
from django.utils import timezone
from simple_history.models import HistoricalRecords
from django.db.models import Q

from apps.collection.models import Product
from apps.logistic.models import Output
from apps.management.models import CostProduction, Cut, Customer
from apps.operations_and_planning.models import Material


# Create your models here.
class BaseProcess(models.Model):
    class Meta:
        abstract = True

    date = models.DateField(verbose_name='Fecha', default=timezone.now, blank=True, null=True)

    stock = models.ForeignKey(Output, on_delete=models.PROTECT, verbose_name='Stock', related_name='process',
                              blank=True, null=True)
    brix = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Brix', blank=True, default=0)
    def __str__(self):
        if self.stock.date:
            return self.stock.date.strftime('%d/%m/%Y') + " " + self.stock.lot.lot + ' - ' + str(self.stock.kg) + ' Kg'
        else:
            return self.stock.lot.lot + ' - ' + str(self.stock.kg) + ' Kg'

    def get_stock_logistic(self):
        try:
            return decimal.Decimal(self.stock.kg)
        except:
            return 0

    def get_lot(self):
        return self.stock.lot

    def get_lot_id(self):
        return self.stock.lot.id

    def get_date(self):
        return self.date.strftime('%d/%m/%Y')

    def get_provider(self):
        return self.stock.lot.provider.display_name


class ProcessPineapple(BaseProcess):
    rejection = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Rechazo', blank=True, default=0)
    crown = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Corona', blank=True, default=0)
    shell_trunk = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Cáscara tronco', blank=True,
                                      default=0)
    pulp = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Pulpa', blank=True, default=0)

    history = HistoricalRecords()

    class Meta:
        verbose_name = 'Proceso Piña'
        verbose_name_plural = 'Proceso Piña'
        ordering = ['-date','-stock__lot__id']

    def get_percent_rejection(self):
        try:
            return round((self.rejection / self.get_stock_logistic()) * 100, 1)
        except Exception as e:
            return str(e)

    def get_processed_kg(self):
        try:
            return self.get_stock_logistic() - self.rejection
        except:
            return 0

    def get_percent_crown(self):
        try:
            return round((self.crown / self.get_processed_kg()) * 100, 2)
        except:
            return 0

    def get_percent_shell_trunk(self):
        try:
            return round((self.shell_trunk / self.get_processed_kg()) * 100, 2)
        except:
            return 0

    def get_percent_pulp(self):
        try:
            return round((self.pulp / self.get_processed_kg()) * 100, 2)
        except:
            return 0

    def get_kg_enabled(self):
        try:
            return self.get_processed_kg() - self.crown - self.shell_trunk - self.pulp
        except:
            return 0

    def get_percent_enabled(self):
        try:
            return round((self.get_kg_enabled() / self.get_processed_kg()) * 100, 2)
        except:
            return 0


class BasePackingProcess(models.Model):
    class Meta:
        abstract = True
        verbose_name = 'Proceso de Envasado'
        verbose_name_plural = 'Procesos de Envasado'

    date = models.DateField(verbose_name='Fecha', default=timezone.now, blank=True, null=True)
    lot_pt = models.CharField(max_length=15, verbose_name='Lote PT', blank=True, null=True)
    finished_product = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Producto Terminado',
                                           blank=True, default=0)
    sale_local = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Venta Local', blank=True, default=0)
    detriment = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Mermas', blank=True, default=0)
    quality = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Calidad', blank=True, default=0)
    aggregates = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Agregados', blank=True, default=0)
    sub_product = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Sub Producto', blank=True,
                                      default=0)
    lots_aggregates = models.CharField(max_length=100, verbose_name='Lotes Agregados', blank=True, null=True)
    cut = models.ForeignKey(Cut, on_delete=models.PROTECT, verbose_name='Corte', related_name='process', blank=True,
                            null=True)
    client = models.ForeignKey(Customer, on_delete=models.PROTECT, verbose_name='Cliente', related_name='process',
                               blank=True, null=True)
    humidity = models.DecimalField(max_digits=4, decimal_places=2, verbose_name='Humedad', blank=True, default=0)
    boxes_qt = models.PositiveIntegerField(verbose_name='Cajas', blank=True, default=0)
    bags_qt = models.PositiveIntegerField(verbose_name='Bolsas', blank=True, default=0)
    boxes_price = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Precio Cajas', blank=True,
                                      default=0)
    bags_price = models.DecimalField(max_digits=7, decimal_places=2, verbose_name='Precio Bolsas', blank=True,
                                     default=0)
    boxes = models.ForeignKey(Material, on_delete=models.PROTECT, verbose_name='Cajas', related_name='boxes_process',
                              blank=True, null=True)
    bags = models.ForeignKey(Material, on_delete=models.PROTECT, verbose_name='Bolsas', related_name='bags_process',
                             blank=True, null=True)
    information = models.CharField(max_length=100, verbose_name='Información', blank=True, null=True)

    disable = models.BooleanField(verbose_name='Deshabilitado', default=False)

    def __str__(self):
        return self.date.strftime('%d/%m/%Y')

    def get_mod_day(self):
        try:
            result=[]
            total_conditioning = 0
            total_packing = 0
            total_kg = 0
            mod_conditioning_day = MOD.objects.filter(date=self.date)
            if mod_conditioning_day.exists():
                for mod in mod_conditioning_day:
                    total_conditioning += mod.get_total_cost_conditioning()
                    total_packing += mod.get_total_cost_packing()
                    total_kg += mod.get_total_kg()
                result.append({'total_conditioning':total_conditioning,'total_packing':total_packing,'total_kg':total_kg})
            return result
        except:
            return []



    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        try:
            self.bags_price = round(self.bags.price * self.bags_qt,2)
            self.boxes_price = round(self.boxes.price * self.boxes_qt,2)
        except:
            pass
        return super().save(force_insert, force_update, using, update_fields)

    def get_total_kg_net(self):
        try:
            return self.finished_product + self.sale_local + self.quality + self.sub_product
        except:
            return 0


class PackingProcessPineapple(BasePackingProcess):
    class Meta:
        verbose_name = 'Proceso de Envasado Piña'
        verbose_name_plural = 'Procesos de Envasado Piña'
        ordering = ['-date','-lot__stock__lot__id']

    lot = models.ForeignKey(ProcessPineapple, on_delete=models.PROTECT, verbose_name='Lote', related_name='lot_process',
                            blank=True, null=True)
    history = HistoricalRecords()

    def get_kg_processed(self):
        try:
            return decimal.Decimal(self.lot.get_processed_kg())
        except:
            return 0

    def get_performance(self):
        try:
            return round(((
                                  self.finished_product + self.sale_local + self.quality + self.sub_product) / self.lot.get_processed_kg()) * 100,
                         2)
        except:
            return 0


class MOD(models.Model):
    class Meta:
        verbose_name = 'MOD'
        verbose_name_plural = 'MOD'
        ordering = ['-date']

    def __str__(self):
        return str(self.date)

    date = models.DateField(verbose_name='Fecha', default=timezone.now)
    process = models.ManyToManyField(Output, verbose_name='Proceso', blank=True)
    conditioning_people = models.IntegerField(
        verbose_name='Personas de Acondicionamiento', default=0)
    conditioning_hours = models.TimeField(verbose_name='Horas de Acondicionamiento', default='00:00')
    conditioning_people_night = models.IntegerField(
        verbose_name='Personas de Acondicionamiento Noche', default=0)
    conditioning_hours_night = models.TimeField(verbose_name='Horas de Acondicionamiento Noche', default='00:00')
    conditioning_people_25 = models.IntegerField(
        verbose_name='Personas de Acondicionamiento 25%', default=0)
    conditioning_hours_25 = models.TimeField(verbose_name='Horas de Acondicionamiento 25%', default='00:00')
    conditioning_people_35 = models.IntegerField(
        verbose_name='Personas de Acondicionamiento 35%', default=0)
    conditioning_hours_35 = models.TimeField(verbose_name='Horas de Acondicionamiento 35%', default='00:00')
    supervisor_name_conditioning = models.CharField(max_length=100, verbose_name='Nombre del Supervisor', blank=True,
                                                    null=True)
    controller_name_conditioning = models.CharField(max_length=100, verbose_name='Nombre del Controller', blank=True,
                                                    null=True)
    packing_people_day = models.IntegerField(verbose_name='Personas de Empaque Día',
                                             default=0)
    packing_people_night = models.IntegerField(verbose_name='Personas de Empaque Noche',
                                               default=0)
    packing_hours_day = models.TimeField(verbose_name='Horas de Empaque Día', default='00:00')
    packing_hours_night = models.TimeField(verbose_name='Horas de Empaque Noche', default='00:00')
    packing_people_25 = models.IntegerField(verbose_name='Personas de Empaque 25%',
                                            default=0)
    packing_hours_25 = models.TimeField(verbose_name='Horas de Empaque 25%', default='00:00')
    packing_people_35 = models.IntegerField(verbose_name='Personas de Empaque 35%',
                                            default=0)
    packing_hours_35 = models.TimeField(verbose_name='Horas de Empaque 35%', default='00:00')
    supervisor_name_packing = models.CharField(max_length=100, verbose_name='Nombre del Supervisor', blank=True,
                                               null=True)
    controller_name_packing = models.CharField(max_length=100, verbose_name='Nombre del Controller', blank=True,
                                               null=True)
    cost_hour_day = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Costo por Hora Día",
                                        editable=False, )
    cost_hour_night = models.DecimalField(max_digits=10, decimal_places=2, default=0, editable=False,
                                          verbose_name="Costo por Hora Noche")
    cost_hour_extra_25 = models.DecimalField(max_digits=10, decimal_places=2, default=0, editable=False,
                                             verbose_name="Costo por Hora Extra 25%")
    cost_hour_extra_35 = models.DecimalField(max_digits=10, decimal_places=2, default=0, editable=False,
                                             verbose_name="Costo por Hora Extra 35%")
    history = HistoricalRecords()

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.pk:
            try:
                cost = CostProduction.objects.last()
                self.cost_hour_day = cost.cost_hour_day
                self.cost_hour_night = cost.cost_hour_night
                self.cost_hour_extra_25 = cost.cost_hour_extra_25
                self.cost_hour_extra_35 = cost.cost_hour_extra_35
            except:
                pass
        return super().save(force_insert, force_update, using, update_fields)

    def get_week(self):
        try:
            return self.date.isocalendar()[1]
        except:
            return ''

    def get_total_kg(self):
        try:
            kg = 0
            for p in self.process.all():
                if p.lot.product.name == 'Piña':
                    for i in p.process.all():
                        for j in i.lot_process.all():
                            kg += j.get_total_kg_net()
                else:
                    pass
            return kg
        except Exception as e:
            return 0

    def get_total_process_kg(self):
        try:
            kg = 0
            for p in self.process.all():
                if p.lot.product.name == 'Piña':
                    for i in p.process.all():
                        kg += i.get_processed_kg()
                else:
                    pass
            return kg
        except Exception as e:
            return 0

    def get_cmo_conditioning(self):
        try:
            total_time = self.conditioning_hours.hour + (self.conditioning_hours.minute / 60)

            return round(
                (self.conditioning_people * decimal.Decimal(total_time)) * self.cost_hour_day,
                2)
        except Exception as e:
            return 0

    def get_cmo_conditioning_night(self):
        try:
            total_time = self.conditioning_hours_night.hour + (self.conditioning_hours_night.minute / 60)
            return round((self.conditioning_people_night * decimal.Decimal(
                total_time)) * self.cost_hour_night, 2)
        except Exception as e:
            return 0

    def get_cmo_conditioning_25(self):
        try:
            total_time = self.conditioning_hours_25.hour + (self.conditioning_hours_25.minute / 60)
            return round((self.conditioning_people_25 * decimal.Decimal(
                total_time)) * self.cost_hour_extra_25, 2)
        except Exception as e:
            return 0

    def get_cmo_conditioning_35(self):
        try:
            total_time = self.conditioning_hours_35.hour + (self.conditioning_hours_35.minute / 60)
            return round((self.conditioning_people_35 * decimal.Decimal(
                total_time)) * self.cost_hour_extra_35, 2)
        except Exception as e:
            return 0

    def get_total_hours_conditioning(self):
        try:
            total_time = timedelta(hours=self.conditioning_hours.hour, minutes=self.conditioning_hours.minute,
                                   seconds=self.conditioning_hours.second)
            total_time += timedelta(hours=self.conditioning_hours_25.hour, minutes=self.conditioning_hours_25.minute,
                                    seconds=self.conditioning_hours_25.second)
            total_time += timedelta(hours=self.conditioning_hours_35.hour, minutes=self.conditioning_hours_35.minute,
                                    seconds=self.conditioning_hours_35.second)
            return total_time
        except Exception as e:
            return 0

    def get_total_cost_conditioning(self):
        try:
            return self.get_cmo_conditioning() + self.get_cmo_conditioning_25() + self.get_cmo_conditioning_35() + self.get_cmo_conditioning_night()
        except Exception as e:
            return 0

    def get_cmo_kg_conditioning(self):
        try:
            return round(self.get_total_cost_conditioning() / self.get_total_kg(), 2)
        except Exception as e:
            return 0

    def get_productivity_conditioning(self):
        try:
            total_hours = self.get_total_hours_conditioning().total_seconds() / 3600
            return round(
                (decimal.Decimal(self.get_total_process_kg()) / self.conditioning_people) / decimal.Decimal(
                    total_hours), 2) if total_hours != 0 else 0
        except Exception as e:
            return 0

    def get_cmo_packing_day(self):
        try:
            total_time = self.packing_hours_day.hour + (self.packing_hours_day.minute / 60)
            return round(
                (self.packing_people_day * decimal.Decimal(total_time)) * self.cost_hour_day,
                2)
        except Exception as e:
            return 0

    def get_cmo_packing_night(self):
        try:
            total_time = self.packing_hours_night.hour + (self.packing_hours_night.minute / 60)
            return round((self.packing_people_night * decimal.Decimal(
                total_time)) * self.cost_hour_night, 2)
        except Exception as e:
            return 0

    def get_cmo_packing_25(self):
        try:
            total_time = self.packing_hours_25.hour + (self.packing_hours_25.minute / 60)
            return round((self.packing_people_25 * decimal.Decimal(
                total_time)) * self.cost_hour_extra_25, 2)
        except Exception as e:
            return 0

    def get_cmo_packing_35(self):
        try:
            total_time = self.packing_hours_35.hour + (self.packing_hours_35.minute / 60)
            return round((self.packing_people_35 * decimal.Decimal(
                total_time)) * self.cost_hour_extra_35, 2)
        except Exception as e:
            return 0

    def get_total_hours_packing(self):
        try:
            total_time = timedelta(hours=self.packing_hours_day.hour, minutes=self.packing_hours_day.minute,
                                   seconds=self.packing_hours_day.second)
            total_time += timedelta(hours=self.packing_hours_25.hour, minutes=self.packing_hours_25.minute,
                                    seconds=self.packing_hours_25.second)
            total_time += timedelta(hours=self.packing_hours_35.hour, minutes=self.packing_hours_35.minute,
                                    seconds=self.packing_hours_35.second)
            return total_time
        except Exception as e:
            return 0

    def get_total_cost_packing(self):
        try:
            return self.get_cmo_packing_day() + self.get_cmo_packing_night() + self.get_cmo_packing_25() + self.get_cmo_packing_35()
        except Exception as e:
            return 0

    def get_cmo_kg_packing(self):
        try:
            return round(self.get_total_cost_packing() / self.get_total_kg(), 2)
        except Exception as e:
            return 0

    def get_productivity_packing(self):
        try:
            total_hours = (self.get_total_hours_packing().total_seconds() / 3600)
            return round((self.get_total_kg() / decimal.Decimal(self.packing_people_day)) / decimal.Decimal(total_hours), 2) if total_hours != 0 else 0
        except Exception as e:
            return 0
