from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from simple_history.models import HistoricalRecords


# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    class AREAS(models.TextChoices):
        GERENCIA = 'GERENCIA', 'Gerencia'
        ADMINISTRACION = 'ADMINISTRACION', 'Administración'
        GESTION_HUMANA = 'GESTION_HUMANA', 'Gestión Humana'
        LOGISTICA = 'LOGISTICA', 'Logística'
        SEGURIDAD_INDUSTRIAL = 'SEGURIDAD_INDUSTRIAL', 'Seguridad Industrial'
        COMERCIAL = 'COMERCIAL', 'Comercial'
        OPERACIONES = 'OPERACIONES', 'Operaciones'
        CALIDAD = 'CALIDAD', 'Calidad'
        MANTENIMIENTO = 'MANTENIMIENTO', 'Mantenimiento'
        PRODUCCION = 'PRODUCCION', 'Producción'
        SUMINISTRO_AGRICOLA = 'SUMINISTRO_AGRICOLA', 'Suministro Agrícola'
        PLANEAMIENTO_Y_PROYECTOS = 'PLANEAMIENTO_Y_PROYECTOS', 'Planeamiento y Proyectos'

    roles = (('Director', 'Director'), ('Gerente_General', 'Gerente General'),
             ('Gerente_Administacion_Finanzas', 'Gerente Administración y Finanzas'),
             ('Jefe_Administracion', 'Jefe Administración'), ('Asistente_Administracion', 'Asistente Administración'),
             ('Asistente_Tesoreria', 'Asistente Tesorería'),
             ('Encargado_Logistica_Compras', 'Encargado Logística y Compras'),
             ('Operario_Logistica_MP', 'Operario Logística MP'),
             ('Operario_Logistica_Almacen', 'Operario Logística Almacén'),
             ('Asistente_Logistica', 'Asistente Logística'),
             ('Asistente_Compras', 'Asistente Compras'),
             ('Encargado_Seguridad_Industrial', 'Encargado Seguridad Industrial'),
             ('Agente_Seguridad_Industrial', 'Agente Seguridad Industrial'),
             ('Asistente_Seguridad_Industrial', 'Asistente Seguridad Industrial'),
             ('Gerente_Comercial', 'Gerente Comercial'), ('Jefe_Ventas_Marketing', 'Jefe Ventas y Marketing'),
             ('Ejecutivo_Regional', 'Ejecutivo Regional'),
             ('Analista_Inteligencia_Comercial', 'Analista Inteligencia Comercial'),
             ('Encargado_Unidad_Operaciones', 'Encargado de la Unidad de Operaciones'),
             ('Encargada_Calidad', 'Encargada de Calidad'),
             ('Supervisor_Calidad_Campo', 'Supervisor de Calidad de Campo'),
             ('Analista_Control_Calidad', 'Analista de Control de Calidad'),
             ('Encargado_Certificaciones', 'Encargado de Certificaciones'),
             ('Asistentes_Certificaciones', 'Asistentes de Certificaciones'),
             ('Operario_Gestion_Ambiental', 'Operario de Gestión Ambiental'),
             ('Jefe_Mantenimiento', 'Jefe de Mantenimiento'), ('Técnico_Mantenimiento', 'Técnico de Mantenimiento'),
             ('Operario_Mantenimiento', 'Operario de Mantenimiento'), ('Jefe_Produccion', 'Jefe de Producción'),
             ('Supervisor_Investigacion_Desarrollo', 'Supervisor de Investigación y Desarrollo'),
             ('Asistente_Investigacion_Desarrollo', 'Asistente de Investigación y Desarrollo'),
             ('Supervisor_Produccion', 'Supervisor de Producción'),
             ('Controller_Produccion', 'Controller de Producción'), ('Jefe_Planta_Norte', 'Jefe de Planta Norte'),
             ('Jefe_Suministro_Agricola', 'Jefe de Suministro Agrícola'), ('Supervisor_Acopio', 'Supervisor de Acopio'),
             ('Asistente_Acopio', 'Asistente de Acopio'),
             ('Jefe_Planeamiento_Proyectos', 'Jefe de Planeamiento y Proyectos'),
             ('Planner_Mantenimiento', 'Planner de Mantenimiento'), ('Planner_Logistica', 'Planner de Logística'),
             ('Planner_Produccion', 'Planner de Producción'), ('Oficial_Jr_TI', 'Oficial Jr. de TI'),
             ('Analitico_Data', 'Analítico de Data'),
    )

    email = models.EmailField(max_length=255, unique=True, verbose_name='Correo electrónico')
    first_name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Nombre(s)')
    last_name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Apellido(s)')
    is_active = models.BooleanField(default=True, verbose_name='Es activo')
    is_staff = models.BooleanField(default=False, verbose_name='Es administrador')
    area = models.CharField(max_length=24, choices=AREAS.choices, default=AREAS.GERENCIA, verbose_name='Área')
    role = models.CharField(max_length=255, choices=roles, default='Director', verbose_name='Cargo')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creado el')
    history = HistoricalRecords()

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_area_name(self):
        return self.get_area_display()

    def get_role_name(self):
        return self.get_role_display()

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def get_short_name(self):
        return self.first_name

    def get_admin(self):
        return self.is_superuser

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'Usuarios'
        verbose_name = 'Usuario'
