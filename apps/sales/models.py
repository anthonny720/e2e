from django.db import models

from simple_history.models import HistoricalRecords


class Samples(models.Model):
    class Meta:
        verbose_name = 'Muestra'
        verbose_name_plural = 'Muestras'
        ordering = ['-date']

    class PackagingType(models.TextChoices):
        ENVELOPE = 'E', 'Sobre'
        BOX = 'B', 'Caja'

    class Market(models.TextChoices):
        LOCAL = 'L', 'Local'
        EXPORT = 'E', 'Exportación'

    class Status(models.TextChoices):
        ACCEPTED = 'A', 'Solicitud recepcionada y validada'
        DELIVERY_PRODUCTION = 'DP', 'Entrega producción/calidad'
        WAREHOUSE_DELIVERY = 'WD', 'Entrega almacén'
        SENT_TARMA = 'ST', 'Enviado a Tarma'
        RECEIVED_LIMA = 'RL', 'Recibido en Lima'
        SCHEDULE_COURIER = 'SC', 'Programar courier'
        SENT_TO_CLIENT = 'STC', 'Enviado al cliente'

    date = models.DateField(verbose_name='Fecha de solicitud', auto_now_add=True)
    delivery_date = models.DateField(verbose_name='Fecha de entrega')
    applicant = models.CharField(max_length=50, verbose_name='Solicitante')
    code = models.CharField(max_length=50, verbose_name='Código', unique=True)
    client = models.CharField(max_length=50, verbose_name='Cliente')
    product = models.TextField(verbose_name='Producto')
    specifications = models.TextField(verbose_name='Especificaciones')
    analysis = models.CharField(verbose_name='Análisis', max_length=50)
    delivery_address = models.CharField(max_length=50, verbose_name='Dirección de entrega')
    delivery_address_final = models.CharField(max_length=50, verbose_name='Dirección de entrega final')
    client_data = models.TextField(verbose_name='Datos del cliente')
    packaging_type = models.CharField(max_length=12, choices=PackagingType.choices, verbose_name='Tipo de empaque',
                                      default=PackagingType.BOX)
    market = models.CharField(max_length=12, choices=Market.choices, verbose_name='Mercado', default=Market.LOCAL)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Precio', blank=True, null=True)
    comments = models.TextField(verbose_name='Comentarios', blank=True, null=True)
    courier = models.CharField(max_length=50, verbose_name='Courier')
    status = models.CharField(max_length=19, choices=Status.choices, verbose_name='Estado', default=Status.ACCEPTED)
    drive = models.URLField(max_length=50, verbose_name='Código', blank=True, null=True)
    use = models.CharField(max_length=50, verbose_name='Usuario', blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.code

    def get_packaging_type(self):
        return self.get_packaging_type_display()

    def get_market(self):
        return self.get_market_display()

    def get_status(self):
        return self.get_status_display()
