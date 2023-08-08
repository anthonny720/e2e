from django.db import DatabaseError
from django.db.models.deletion import ProtectedError
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.collection.models import Provider
from apps.collection.serializers import SupplierRMSerializer
from apps.management.models import Customer, Suppliers, Outsourcing, Transport, StorageArea, Location, CostProduction, \
    UnitOfMeasurement, Categories, TaxRates, Currency, Condition, Family, SubFamily, Cut, Packing, ContactPeople, \
    Container
from apps.management.serializers import (CustomerSerializer, SuppliersSerializer, OutsourcingSerializer,
                                         TransportSerializer, StorageAreaSerializer, LocationSerializer,
                                         CostProductionSerializer, UnitOfMeasurementSerializer,
                                         CategoriesSerializer, TaxRatesSerializer, CurrencySerializer,
                                         ConditionSerializer, FamilySerializer, SubFamilySerializer,
                                         CutSerializer, PackingSerializer, ContactSerializer, ContainerSerializer)
from apps.util.permissions import AnalystEditorPermission, PlanningLogisticEditorPermission


# Create your views here.

class BaseListView(APIView):
    model = None
    serializer_class = None
    filter_param = None

    def get_queryset(self):
        return self.model.objects.all()

    def get(self, request):
        try:
            queryset = self.get_queryset()
            filter_value = request.query_params.get(self.filter_param, None)
            if filter_value:
                filter_kwargs = {f"{self.filter_param}__icontains": filter_value}
                queryset = queryset.filter(**filter_kwargs)
            serializer = self.serializer_class(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Se ha creado correctamente.'}, status=status.HTTP_201_CREATED)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NoPostMixin:
    def post(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@permission_classes([AnalystEditorPermission])
class ListCustomerView(BaseListView):
    model = Customer
    serializer_class = CustomerSerializer
    filter_param = 'display_name'

@permission_classes([AnalystEditorPermission])
class ListSuppliersView(BaseListView):
    model = Suppliers
    serializer_class = SuppliersSerializer
    filter_param = 'display_name'

@permission_classes([AnalystEditorPermission])
class ListSuppliersRMView(BaseListView):
    model = Provider
    serializer_class = SupplierRMSerializer
    filter_param = 'display_name'

@permission_classes([AnalystEditorPermission])
class ListOutsourcingView(BaseListView):
    model = Outsourcing
    serializer_class = OutsourcingSerializer
    filter_param = 'display_name'

@permission_classes([AnalystEditorPermission])
class ListTransportView(BaseListView):
    model = Transport
    serializer_class = TransportSerializer
    filter_param = 'display_name'


class ListStorageAreaView(BaseListView, NoPostMixin):
    model = StorageArea
    serializer_class = StorageAreaSerializer
    filter_param = 'name'


class ListLocationView(BaseListView, NoPostMixin):
    model = Location
    serializer_class = LocationSerializer
    filter_param = 'name'


class ListCostProductionView(BaseListView, NoPostMixin):
    model = CostProduction
    serializer_class = CostProductionSerializer
    filter_param = 'name'


class ListUnitOfMeasurementView(BaseListView, NoPostMixin):
    model = UnitOfMeasurement
    serializer_class = UnitOfMeasurementSerializer
    filter_param = 'name'


class ListCategoriesView(BaseListView, NoPostMixin):
    model = Categories
    serializer_class = CategoriesSerializer
    filter_param = 'name'


class ListTaxRatesView(BaseListView, NoPostMixin):
    model = TaxRates
    serializer_class = TaxRatesSerializer
    filter_param = 'name'


class ListCurrencyView(BaseListView, NoPostMixin):
    model = Currency
    serializer_class = CurrencySerializer
    filter_param = 'name'


class ListConditionView(BaseListView, NoPostMixin):
    model = Condition
    serializer_class = ConditionSerializer
    filter_param = 'name'


class ListFamilyView(BaseListView, NoPostMixin):
    model = Family
    serializer_class = FamilySerializer
    filter_param = 'name'


class ListSubFamilyView(BaseListView, NoPostMixin):
    model = SubFamily
    serializer_class = SubFamilySerializer
    filter_param = 'name'


class ListCutView(BaseListView, NoPostMixin):
    model = Cut
    serializer_class = CutSerializer
    filter_param = 'name'


class ListPackingView(BaseListView, NoPostMixin):
    model = Packing
    serializer_class = PackingSerializer
    filter_param = 'name'


class ListContainerView(BaseListView, NoPostMixin):
    model = Container
    serializer_class = ContainerSerializer
    filter_param = 'name'


class BaseDetailView(APIView):
    model = None
    serializer_class = None

    def get_object(self, slug):
        return self.model.objects.get(slug=slug)

    def get(self, request, slug):
        try:
            instance = self.get_object(slug)
            serializer = self.serializer_class(instance)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {slug}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, slug):
        try:
            instance = self.get_object(slug)
            serializer = self.serializer_class(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Actualizado correctamente'}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {slug}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, slug):
        try:
            instance = self.get_object(slug)
            instance.delete()
            return Response({'message': 'Eliminado correctamente'}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {slug}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except ProtectedError as e:
            related_objects = e.protected_objects

            error_message = f'No se puede eliminar este objeto debido a la siguiente relación "PROTECT":'
            error_message += f'\n\n{str(e)}'
            return Response({'message': error_message}, status=status.HTTP_409_CONFLICT)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@permission_classes([AnalystEditorPermission,PlanningLogisticEditorPermission])
class DetailCustomerView(BaseDetailView):
    model = Customer
    serializer_class = CustomerSerializer

@permission_classes([AnalystEditorPermission,PlanningLogisticEditorPermission])
class DetailSuppliersView(BaseDetailView):
    model = Suppliers
    serializer_class = SuppliersSerializer

@permission_classes([AnalystEditorPermission])
class DetailOutsourcingView(BaseDetailView):
    model = Outsourcing
    serializer_class = OutsourcingSerializer

@permission_classes([AnalystEditorPermission,PlanningLogisticEditorPermission])
class DetailTransportView(BaseDetailView):
    model = Transport
    serializer_class = TransportSerializer

@permission_classes([AnalystEditorPermission])
class DetailSupplierRMView(BaseDetailView):
    model = Provider
    serializer_class = SupplierRMSerializer

@permission_classes([AnalystEditorPermission,PlanningLogisticEditorPermission])
class AddContactView(APIView):
    model = ContactPeople
    serializer_class = ContactSerializer

    def post(self, request):
        try:
            model = request.data.get('model')
            parent_id = request.data.get('parent_id')
            if model == 'customers':
                model = Customer.objects.get(id=parent_id)
            elif model == 'suppliers':
                model = Suppliers.objects.get(id=parent_id)
            elif model == 'outsourcings':
                model = Outsourcing.objects.get(id=parent_id)
            elif model == 'transports':
                model = Transport.objects.get(id=parent_id)
            elif model == 'suppliers_rm':
                model = Provider.objects.get(id=parent_id)

            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            model.contacts.add(serializer.instance)
            model.save()

            return Response({'message': 'Creado correctamente'}, status=status.HTTP_201_CREATED)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@permission_classes([AnalystEditorPermission,PlanningLogisticEditorPermission])
class DetailContactView(APIView):
    model = ContactPeople
    serializer_class = ContactSerializer

    def get_object(self, id):
        return self.model.objects.get(id=id)

    def patch(self, request, id):
        try:
            instance = self.get_object(id)
            serializer = self.serializer_class(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Actualizado correctamente'}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {id}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, id):
        try:
            instance = self.get_object(id)
            instance.delete()
            return Response({'message': 'Eliminado correctamente'}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {id}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except ProtectedError as e:
            related_objects = e.protected_objects
            error_message = f'No se puede eliminar este objeto debido a la siguiente relación "PROTECT":'
            error_message += f'\n\n{str(e)}'
            return Response({'message': error_message}, status=status.HTTP_409_CONFLICT)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
