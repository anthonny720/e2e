from enum import Enum

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response

UserAccount = get_user_model()


class UserRoles(Enum):
    DIRECTOR = 'Director'
    GERENTE_GENERAL = 'Gerente_General'
    GERENTE_ADMIN_FINANZAS = 'Gerente_Administacion_Finanzas'
    JEFE_ADMINISTRACION = 'Jefe_Administracion'
    ASISTENTE_ADMINISTRACION = 'Asistente_Administracion'
    ASISTENTE_TESORERIA = 'Asistente_Tesoreria'
    ENCARGADO_LOGISTICA_COMPRAS = 'Encargado_Logistica_Compras'
    OPERARIO_LOGISTICA_MP = 'Operario_Logistica_MP'
    OPERARIO_LOGISTICA_ALMACEN = 'Operario_Logistica_Almacen'
    ASISTENTE_LOGISTICA = 'Asistente_Logistica'
    ASISTENTE_COMPRAS = 'Asistente_Compras'
    ENCARGADO_SEGURIDAD_INDUSTRIAL = 'Encargado_Seguridad_Industrial'
    AGENTE_SEGURIDAD_INDUSTRIAL = 'Agente_Seguridad_Industrial'
    ASISTENTE_SEGURIDAD_INDUSTRIAL = 'Asistente_Seguridad_Industrial'
    GERENTE_COMERCIAL = 'Gerente_Comercial'
    JEFE_VENTAS_MARKETING = 'Jefe_Ventas_Marketing'
    EJECUTIVO_REGIONAL = 'Ejecutivo_Regional'
    ANALISTA_INTELIGENCIA_COMERCIAL = 'Analista_Inteligencia_Comercial'
    ENCARGADO_UNIDAD_OPERACIONES = 'Encargado_Unidad_Operaciones'
    ENCARGADA_CALIDAD = 'Encargada_Calidad'
    SUPERVISOR_CALIDAD_CAMPO = 'Supervisor_Calidad_Campo'
    ANALISTA_CONTROL_CALIDAD = 'Analista_Control_Calidad'
    ENCARGADO_CERTIFICACIONES = 'Encargado_Certificaciones'
    ASISTENTES_CERTIFICACIONES = 'Asistentes_Certificaciones'
    OPERARIO_GESTION_AMBIENTAL = 'Operario_Gestion_Ambiental'
    JEFE_MANTENIMIENTO = 'Jefe_Mantenimiento'
    TECNICO_MANTENIMIENTO = 'Técnico_Mantenimiento'
    OPERARIO_MANTENIMIENTO = 'Operario_Mantenimiento'
    JEFE_PRODUCCION = 'Jefe_Produccion'
    SUPERVISOR_INVESTIGACION_DESARROLLO = 'Supervisor_Investigacion_Desarrollo'
    ASISTENTE_INVESTIGACION_DESARROLLO = 'Asistente_Investigacion_Desarrollo'
    SUPERVISOR_PRODUCCION = 'Supervisor_Produccion'
    CONTROLLER_PRODUCCION = 'Controller_Produccion'
    JEFE_PLANTA_NORTE = 'Jefe_Planta_Norte'
    JEFE_SUMINISTRO_AGRICOLA = 'Jefe_Suministro_Agricola'
    SUPERVISOR_ACOPIO = 'Supervisor_Acopio'
    ASISTENTE_ACOPIO = 'Asistente_Acopio'
    JEFE_PLANEAMIENTO_PROYECTOS = 'Jefe_Planeamiento_Proyectos'
    PLANNER_MANTENIMIENTO = 'Planner_Mantenimiento'
    PLANNER_LOGISTICA = 'Planner_Logistica'
    PLANNER_PRODUCCION = 'Planner_Produccion'
    OFICIAL_JR_TI = 'Oficial_Jr_TI'
    ANALITICO_DATA = 'Analitico_Data'


class CustomPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        allowed_roles = getattr(view, 'allowed_roles', [])  # Asegúrate de que 'allowed_roles' está definido en la vista

        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role in allowed_roles

    def handle_no_permission(self, request):

        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class IsAdmin(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser
