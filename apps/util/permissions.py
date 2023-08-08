from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response

UserAccount = get_user_model()


class AnalystEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.PLANIFICACION_ANALISTA and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)
class OperationsEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.OPERACIONES and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class LogisticsEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.LOGISTICA and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class CertificationsEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.CERTIFICACIONES and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class AdministrationEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.ADMINISTRACION and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class QualityEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.CALIDAD and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class RawMaterialEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.MATERIA_PRIMA and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class ProductionEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.PRODUCCION and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class PlanningProductionEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.PLANIFICACION_PRODUCCION and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class PlanningLogisticEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.PLANIFICACION_LOGISTICA and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class PurchasingEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.COMPRAS and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class CollectionEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.ACOPIO and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class AccountingEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.CONTABILIDAD and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class CommercialEditorPermission(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated
        else:
            return request.user.is_authenticated and request.user.role == UserAccount.Roles.COMERCIAL and request.user.permissions == UserAccount.Permissions.EDITOR

    def handle_no_permission(self, request):
        return Response({'error': self.message}, status=status.HTTP_403_FORBIDDEN)


class IsAdmin(BasePermission):
    message = "No tiene permisos para realizar esta acción"

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser
