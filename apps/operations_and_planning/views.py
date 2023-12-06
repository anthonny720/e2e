# Create your views here.
from datetime import datetime, timedelta

from django.db import DatabaseError
from django.db.models import OuterRef, ProtectedError, Avg, Sum
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.operations_and_planning.serializers import MaterialSerializer, ProductSerializer, StockSerializer, \
    StockEntrySerializer, StockExitSerializer, ProductDetailSerializer, StockReEntrySerializer, \
    ProductionPlanningSerializer
from .models import (Material, Product, Stock, StockEntry, StockExit, StockReentry, ProductionPlanning)
from ..commercial.models import SalesProgress
from ..commercial.serializers import SalesOrderShortSerializer
from ..logistic.models import Records
from ..logistic.serializers import RecordsMPSerializer
from ..util.permissions import CustomPermission, UserRoles

months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


def get_filtered_query(category, provider, start_date, end_date, lot):
    queryset = Records.objects.filter(category__icontains=category)
    if provider:
        queryset = queryset.filter(supplier__icontains=provider)
    if lot:
        queryset = queryset.filter(lot__icontains=lot)
    if start_date and end_date:
        queryset = queryset.filter(
            entry_date__range=[datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")])
    else:
        queryset = queryset[:30]
    return queryset


# Create your views here.
class ListRecordsView(APIView):
    def get(self, request, *args, **kwargs):
        category = kwargs["category"].capitalize()
        provider = request.query_params.get('provider', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        lot = request.query_params.get('lot', None)
        queryset = get_filtered_query(category, provider, start_date, end_date, lot)
        try:
            serializer = RecordsMPSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BaseListView(APIView):
    model = None
    serializer_class = None
    filter_params = None
    date_query = None

    def get_queryset(self):
        return self.model.objects.all()

    def get(self, request):
        try:
            queryset = self.get_queryset()
            filter_kwargs = {}
            for param in self.filter_params:
                filter_value = self.request.query_params.get('name', None)
                if filter_value:
                    filter_kwargs[f"{param}__icontains"] = filter_value

            if filter_kwargs:
                queryset = queryset.filter(**filter_kwargs)

            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            if start_date and end_date and self.date_query:
                date_range_filter = f"{self.date_query}__range"
                date_value = [datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")]
                queryset = queryset.filter(**{date_range_filter: date_value})
            else:
                if start_date == '' and end_date == '':
                    if not self.date_query:
                        queryset = queryset.order_by('-id')[:50]
                    else:
                        queryset = queryset.order_by(f"-{self.date_query}")[:50]
                else:
                    pass
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
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NoMixin():
    def post(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class BaseDetailView(APIView):
    model = None
    serializer_class = None

    def get_object(self, id):
        return self.model.objects.get(id=id)

    def get(self, request, id):
        try:
            instance = self.get_object(id)
            serializer = self.serializer_class(instance)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {id}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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


class ListMaterialView(BaseListView, NoMixin):
    model = Material
    serializer_class = MaterialSerializer
    filter_params = []


class ListProductView(BaseListView, NoMixin):
    model = Product
    serializer_class = ProductSerializer
    filter_params = []


class DetailProductView(BaseDetailView, NoMixin):
    model = Product
    serializer_class = ProductDetailSerializer


class ListStockView(BaseListView, NoMixin):
    model = Stock
    serializer_class = StockSerializer
    filter_params = ['product__name']

    def get_queryset(self):
        # Subconsulta para obtener la fecha máxima de cada material
        max_dates = Stock.objects.filter(product=OuterRef('product')).order_by('-date').values('date')[:1]
        # Filtrar los registros para obtener el stock más reciente de cada material
        latest_stocks = Stock.objects.filter(product_id__in=Stock.objects.values('product').distinct(),
                                             date__in=max_dates)

        return latest_stocks


class ListStockReEntryView(BaseListView, NoMixin):
    model = StockReentry
    serializer_class = StockReEntrySerializer
    filter_params = ['stock_entry_item__name']
    date_query = 'date'


class ListStockEntryView(BaseListView, NoMixin):
    model = StockEntry
    serializer_class = StockEntrySerializer
    filter_params = ['item__name']
    date_query = 'arrival_date'


class ListStockExitView(BaseListView, NoMixin):
    model = StockExit
    serializer_class = StockExitSerializer
    filter_params = ['stock_entry__item__name']
    date_query = 'date'


class ListPlanningProductionView(APIView):
    model = SalesProgress
    serializer_class = SalesOrderShortSerializer

    def get(self, request, *args, **kwargs):
        try:
            queryset = self.model.objects.filter(commercial_status='100', status__in=['TBT', 'TBD', 'TBP']).order_by(
                '-date')
            serializer = self.serializer_class(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListProductionPlanningView(BaseListView):
    permission_classes = [CustomPermission]
    allowed_roles = [UserRoles.PLANNER_PRODUCCION.value]

    model = ProductionPlanning
    serializer_class = ProductionPlanningSerializer
    filter_params = []


class DetailProductionPlanningView(BaseDetailView):

    permission_classes = [CustomPermission]
    allowed_roles = [UserRoles.PLANNER_PRODUCCION.value]
    model = ProductionPlanning
    serializer_class = ProductionPlanningSerializer

    def get_object(self, id):
        query = self.model.objects.get(id=id)
        return query


class CalendarScheduleManufacturingView(APIView):
    model = ProductionPlanning

    def get(self, request):
        data = []
        try:
            query = self.model.objects.filter(sale__commercial_status='100', sale__status__in=['TBT', 'TBD', 'TBP'])
            for item in query:
                data.append(
                    {'title': item.sale.sku + ' - ' + item.sale.client_name + " " + str(item.raw_material) + " kg",
                     'date': item.date, })
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SimulatorView(APIView):

    def post(self, request):
        try:
            data = request.data
            sku = data['sku']
            quantity = data['quantity']
            result = []
            product = Product.objects.get(id=sku)
            name = product.name.split(' ')[0].capitalize()
            condition = product.name.split(' ')[1].capitalize()
            three_months_ago = timezone.now() - timedelta(days=360)
            history = Records.objects.filter(category__icontains=name, condition__icontains=condition,
                                             entry_date__range=[three_months_ago, timezone.now()], field_price__gt=0,
                                             palletizing_per_kg__gt=0, freight__gt=0).order_by('-entry_date')
            average_price_camp = history.aggregate(avg_price_camp=Avg('field_price'))['avg_price_camp']

            sum_download_per_kg = history.aggregate(sum_download_per_kg=Sum('palletizing_per_kg'))['sum_download_per_kg']
            sum_freight = history.aggregate(sum_freight=Sum('freight'))['sum_freight']
            sum_usable_weight = history.aggregate(sum_usable_weight=Sum('usable_weight'))['sum_usable_weight']
            download_per_kg = sum_download_per_kg / sum_usable_weight if sum_usable_weight else None
            freight_per_kg = sum_freight / sum_usable_weight if sum_usable_weight else None

            result.append({'name': "Materia Prima", 'calculate': (float(quantity) / float(product.performance)) * 100,
                           'category': product.group.name, 'unit': product.unit_of_measurement.name,
                           'price': average_price_camp})
            result.append({'name': "Servicio Descarga", 'calculate': (float(quantity) / float(product.performance))*100,
                           'category': product.group.name, 'unit': product.unit_of_measurement.name,
                           'price': download_per_kg})
            result.append({'name': "Flete", 'calculate': (float(quantity) / float(product.performance))*100,
                           'category': product.group.name, 'unit': product.unit_of_measurement.name,
                           'price': freight_per_kg})
            for i in product.recipe_products.all():
                result.append(
                    {'name': i.material.name, 'quantity': i.quantity, 'calculate': float(i.quantity) * float(quantity),
                     'category': i.material.group.name, 'unit': i.material.unit_of_measurement.name,
                     'price': i.material.price})
            return Response({'data': result}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
