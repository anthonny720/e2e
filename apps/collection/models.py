import uuid

from django.db import models

from apps.management.models import CustomerSupplierProxy
from apps.sales.models import HistoricalRecords


def custom_doc_file(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '/'.join(['products', instance.name, filename])


# Create your models here.
class Product(models.Model):
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['name']

    name = models.CharField(max_length=100, verbose_name='Nombre')
    enable = models.BooleanField(verbose_name='Estado',default=False)

    history = HistoricalRecords()

    def __str__(self):
        return self.name

    def get_stock(self):
        t = 0
        try:
            for c in self.product_lot.filter(stock__gt=0):
                t += c.stock
            return t
        except:
            return 0

    def get_pending_count(self):
        pending_count = 0
        try:
            for lot in self.product_lot.all():
                try:
                    if lot.analysis_pineapple.get_pending():
                        pending_count += 1
                except:
                    pass
                try:
                    if lot.analysis_mango.get_pending():
                        pending_count += 1
                except:
                    pass
                try:
                    if lot.analysis_goldenberry.get_pending():
                        pending_count += 1
                except:
                    pass
                try:
                    if lot.analysis_blueberry.get_pending():
                        pending_count += 1
                except:
                    pass
                try:
                    if lot.analysis_banana.get_pending():
                        pending_count += 1
                except:
                    pass
            return pending_count
        except Exception as e:
            return str(e)


class Provider(CustomerSupplierProxy):
    class Meta:
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'
        ordering = ['business_name']

    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Producto',
                                related_name='product_provider')
    history = HistoricalRecords()

    def __str__(self):
        return self.business_name




class Parcel(models.Model):
    class Meta:
        verbose_name = 'Parcela'
        verbose_name_plural = 'Parcelas'
        ordering = ['parcel']

    class Status(models.TextChoices):
        PRESENCE = 'P', 'Presencia'
        CLEAN = 'C', 'Limpio'

    class TypeMP(models.TextChoices):
        ORGANIC = 'O', 'Orgánico'
        CONVENTIONAL = 'C', 'Convencional'

    class SampleType(models.TextChoices):
        FRESH = 'F', 'Fresco'
        PT = 'PT', 'Producto Terminado'



    area = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Área', blank=True, null=True, default=0)
    type_mp = models.CharField(max_length=100, verbose_name='Tipo de MP', choices=TypeMP.choices,
                               default=TypeMP.CONVENTIONAL)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, verbose_name='Proveedor', blank=True, null=True)
    property_name = models.CharField(max_length=100, verbose_name='Predio', blank=True, null=True)
    parcel = models.CharField(max_length=100, verbose_name='Parcela')
    sector = models.CharField(max_length=100, verbose_name='Sector', blank=True, null=True)
    latitude = models.CharField(max_length=100, verbose_name='Latitud', blank=True, null=True)
    longitude = models.CharField(max_length=100, verbose_name='Longitud', blank=True, null=True)
    variety = models.CharField(max_length=100, verbose_name='Variedad', blank=True, null=True)

    status = models.CharField(max_length=100, verbose_name='Estado', choices=Status.choices, default=Status.PRESENCE)
    sample_type = models.CharField(max_length=100, verbose_name='Tipo de Muestra', choices=SampleType.choices, default=SampleType.FRESH)
    certifications=models.TextField(max_length=200, verbose_name='Certificaciones', blank=True, null=True,default='Orgánico: \nBiosuisse: \nFairtrade: \n')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizado')
    history = HistoricalRecords()

    def get_sample_type_name(self):
        return self.get_sample_type_display()
    def __str__(self):
        return str(self.parcel)

    def get_status_name(self):
        return self.get_status_display()

    def get_type_mp_name(self):
        return self.get_type_mp_display()
