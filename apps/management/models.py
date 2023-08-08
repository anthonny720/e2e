from django.db import models
from django.utils.text import slugify
from simple_history.models import HistoricalRecords


# Create your models here.
class ContactPeople(models.Model):
    class Meta:
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"

    first_name = models.CharField(max_length=50, blank=False, null=False, verbose_name="Nombre")
    last_name = models.CharField(max_length=50, blank=False, null=False, verbose_name="Apellido")
    position = models.CharField(max_length=50, blank=False, null=False, verbose_name="Posición")
    email = models.EmailField(max_length=255, blank=True, null=True, verbose_name="Correo Electrónico")
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Teléfono")

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class CustomerSupplierProxy(models.Model):
    class Meta:
        abstract = True
        ordering = ['display_name']

    business_name = models.CharField(max_length=255, blank=False, null=False, verbose_name="Nombre de la empresa")
    display_name = models.CharField(max_length=255, blank=False, null=False, verbose_name="Mostrar nombre")
    ruc = models.CharField(max_length=15, blank=True, null=True, verbose_name="RUC")
    address = models.CharField(max_length=255, blank=True, null=True, verbose_name="Dirección")
    contacts = models.ManyToManyField(ContactPeople, verbose_name='Contacto', blank=True)
    email = models.EmailField(max_length=255, blank=True, null=True, verbose_name="Correo Electrónico")
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Teléfono")
    slug = models.SlugField(max_length=255, blank=True, null=True, verbose_name="Slug")


    def __str__(self):
        return self.display_name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.business_name)
        super(CustomerSupplierProxy, self).save(*args, **kwargs)


class Customer(CustomerSupplierProxy):
    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
    history = HistoricalRecords()



class Suppliers(CustomerSupplierProxy):
    documents = models.URLField(max_length=200, verbose_name='Drive', blank=True, null=True)
    history = HistoricalRecords()
    class Meta:
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'





class Outsourcing(CustomerSupplierProxy):
    class Meta:
        verbose_name = 'Planta industrial'
        verbose_name_plural = "Planta industrial"
    history = HistoricalRecords()


class Transport(CustomerSupplierProxy):
    class Meta:
        verbose_name = 'Empresa de Transporte'
        verbose_name_plural = 'Empresas de Transporte'

    history = HistoricalRecords()



class StorageArea(models.Model):
    class Meta:
        verbose_name = 'Zona de Almacenamiento'
        verbose_name_plural = 'Zonas de Almacenamiento'
        ordering = ['name']

    name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Nombre")
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class Location(models.Model):
    class Meta:
        verbose_name = "Origen y Destino"
        verbose_name_plural = "Orígenes y Destinos"

    name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Nombre")
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")
    history = HistoricalRecords()

    def __str__(self):
        return self.name


class CostProduction(models.Model):
    class Meta:
        verbose_name = "Costo de Producción"
        verbose_name_plural = "Costos de Producción"

    cost_hour_day = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Costo por Hora Día")
    cost_hour_night = models.DecimalField(max_digits=10, decimal_places=2, default=0,
                                          verbose_name="Costo por Hora Noche")
    cost_hour_extra_25 = models.DecimalField(max_digits=10, decimal_places=2, default=0,
                                             verbose_name="Costo por Hora Extra 25%")
    cost_hour_extra_35 = models.DecimalField(max_digits=10, decimal_places=2, default=0,
                                             verbose_name="Costo por Hora Extra 35%")
    created_at = models.DateField(auto_now=True, verbose_name="Fecha de creación")

    history = HistoricalRecords()

    def __str__(self):
        return f'{self.created_at.strftime("%d/%m/%Y")}'


class UnitOfMeasurement(models.Model):
    class Meta:
        verbose_name = 'Unidad de Medida'
        verbose_name_plural = 'Unidad de medida'
        ordering = ['name']

    name = models.CharField(max_length=10, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name


class Categories(models.Model):
    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categoría'
        ordering = ['name']

    name = models.CharField(max_length=50, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name


class TaxRates(models.Model):
    class Meta:
        verbose_name = 'Impuesto'
        verbose_name_plural = 'Impuestos'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)
    rate = models.DecimalField(verbose_name='Valor', max_digits=4, decimal_places=2, blank=False)

    def __str__(self):
        return self.name

class Currency(models.Model):
    class Meta:
        verbose_name = 'Moneda'
        verbose_name_plural = 'Moneda'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name


class Condition(models.Model):
    class Meta:
        verbose_name = 'Condición'
        verbose_name_plural = 'Condición'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name


class Family(models.Model):
    class Meta:
        verbose_name = 'Familia'
        verbose_name_plural = 'Familia'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name


class SubFamily(models.Model):
    class Meta:
        verbose_name = 'Subfamilia'
        verbose_name_plural = 'Subfamilia'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name


class Cut(models.Model):
    class Meta:
        verbose_name = 'Corte'
        verbose_name_plural = 'Corte'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)
    def __str__(self):
        return self.name

class Packing(models.Model):
    class Meta:
        verbose_name = 'Empaque'
        verbose_name_plural = 'Empaque'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name

class Container(models.Model):
    class Meta:
        verbose_name = 'Envase'
        verbose_name_plural = 'Envase'
        ordering = ['name']

    name = models.CharField(max_length=20, verbose_name='Nombre', blank=False)

    def __str__(self):
        return self.name