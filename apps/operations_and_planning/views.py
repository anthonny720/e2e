# Create your views here.
from datetime import datetime

from django.db import DatabaseError
from django.db.models import ProtectedError, OuterRef
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.operations_and_planning.serializers import MaterialSerializer, ProductSerializer, RecipeSerializer, \
    StockSerializer, StockEntrySerializer, StockExitSerializer, PurchaseSerializer, StockExitDetailSerializer, \
    PurchaseDetailSerializer, PurchaseItemSerializer, SalesOrderSerializer, SalesOrderDetailSerializer, \
    ProductDetailSerializer, SalesOrderShortSerializer, ProductionPlanningSerializer, StockReEntrySerializer
from .models import (Material, Product, Recipe, Stock, StockEntry, StockExit, Purchase, PurchaseItems, SalesOrder,
                     ProductionPlanning, StockReEntry)

from ..logistic.models import Records
from ..logistic.serializers import RecordsMPSerializer
from ..util.permissions import AnalystEditorPermission, PlanningLogisticEditorPermission, \
    PlanningProductionEditorPermission

months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


def get_filtered_query(category, provider, start_date, end_date):
    queryset = Records.objects.filter(category__icontains=category)
    if provider:
        queryset = queryset.filter(supplier__icontains=provider)
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
        queryset = get_filtered_query(category, provider, start_date, end_date)
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
                filter_value = self.request.query_params.get(param, None)
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
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


@permission_classes([AnalystEditorPermission])
class ListMaterialView(BaseListView):
    model = Material
    serializer_class = MaterialSerializer
    filter_params = ['name', 'sap']


@permission_classes([AnalystEditorPermission])
class ListProductView(BaseListView):
    model = Product
    serializer_class = ProductSerializer
    filter_params = ['name', 'group__name']


@permission_classes([AnalystEditorPermission])
class DetailMaterialView(BaseDetailView):
    model = Material
    serializer_class = MaterialSerializer


@permission_classes([AnalystEditorPermission])
class DetailProductView(BaseDetailView):
    model = Product
    serializer_class = ProductDetailSerializer


class NoGetMixin:
    def get(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class NoPostMixin:
    def post(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@permission_classes([AnalystEditorPermission])
class ListRecipeView(BaseListView, NoGetMixin):
    model = Recipe
    serializer_class = RecipeSerializer
    filter_params = ['product__name', 'material__name']


@permission_classes([AnalystEditorPermission])
class DetailRecipeView(BaseDetailView, NoGetMixin):
    model = Recipe
    serializer_class = RecipeSerializer


class ListStockView(BaseListView, NoPostMixin):
    model = Stock
    serializer_class = StockSerializer
    filter_params = ['product__name', 'product__sap']

    def get_queryset(self):
        # Subconsulta para obtener la fecha máxima de cada material
        max_dates = Stock.objects.filter(product=OuterRef('product')).order_by('-date').values('date')[:1]
        # Filtrar los registros para obtener el stock más reciente de cada material
        latest_stocks = Stock.objects.filter(product_id__in=Stock.objects.values('product').distinct(),
                                             date__in=max_dates)

        return latest_stocks


@permission_classes([PlanningLogisticEditorPermission])
class ListStockReEntryView(BaseListView, NoPostMixin):
    model = StockReEntry
    serializer_class = StockReEntrySerializer
    filter_params = ['stock_entry__purchase_item__material__name']
    date_query = 'date'


@permission_classes([PlanningLogisticEditorPermission])
class ListStockEntryView(BaseListView, NoPostMixin):
    model = StockEntry
    serializer_class = StockEntrySerializer
    filter_params = ['purchase_item__material__name']
    date_query = 'date'

    def patch(self, request):
        try:
            instance = get_object_or_404(self.model, id=request.data['id'])
            quantity = request.data['stock']
            last = Stock.objects.filter(product=instance.purchase_item.material).last()
            stock, created = Stock.objects.get_or_create(product=instance.purchase_item.material, date=datetime.now())
            if created:
                stock.quantity = last.quantity
                stock.save()
            instance.stock += int(quantity)
            instance.save()
            stock.quantity += int(quantity)
            stock.save()
            stock = StockReEntry.objects.create(stock_entry=instance, quantity=quantity)
            stock.save()
            return Response({'message': 'Actualizado correctamente'}, status=status.HTTP_200_OK)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {id}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlanningLogisticEditorPermission])
class ListStockExitView(APIView):
    model = StockExit
    serializer_class = StockExitSerializer

    def get(self, request):
        try:
            stock_exits = self.model.objects.all()
            product_name = request.query_params.get('product__name', None)
            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            if product_name:
                stock_exits = stock_exits.filter(stock_entry__purchase_item__material__name__icontains=product_name)

            if start_date and end_date:
                stock_exits = stock_exits.filter(
                    date__range=[datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")])
            else:
                stock_exits = stock_exits[:50]

            serializer = self.serializer_class(stock_exits, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = StockExitDetailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Creado correctamente'}, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListStockAvailableView(BaseListView):
    model = StockEntry
    serializer_class = StockEntrySerializer

    def get_queryset(self):
        query = self.model.objects.filter(stock__gt=0)
        return query

    def get(self, request):
        try:
            stock_entries = self.get_queryset()
            product_name = request.query_params.get('product__name', None)
            serializer = self.serializer_class(stock_entries, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlanningLogisticEditorPermission])
class ListPurchasesView(BaseListView):
    model = Purchase
    serializer_class = PurchaseSerializer
    filter_params = ['supplier__display_name', 'order_id', 'invoice_id', 'guide_number']
    date_query = 'order_date'


@permission_classes([PlanningLogisticEditorPermission])
class DetailPurchaseView(BaseDetailView):
    model = Purchase
    serializer_class = PurchaseDetailSerializer


@permission_classes([PlanningLogisticEditorPermission])
class ListPurchaseItemView(BaseListView):
    model = PurchaseItems
    serializer_class = PurchaseItemSerializer


@permission_classes([PlanningLogisticEditorPermission])
class DetailPurchaseItemView(BaseDetailView, NoGetMixin):
    model = PurchaseItems
    serializer_class = PurchaseItemSerializer


@permission_classes([PlanningLogisticEditorPermission])
class UpdateTransferStockReceivedView(APIView):
    model = Stock

    def post(self, request, *args, **kwargs):
        try:
            self.model.receive_purchase(request.data['id'])
            return Response({'message': 'Actualizado correctamente'}, status=status.HTTP_201_CREATED)
        except self.model.DoesNotExist:
            error_message = f'No se ha encontrado un objeto con el id {id}'
            return Response({'message': error_message}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlanningLogisticEditorPermission])
class ListSalesOrderView(BaseListView):
    model = SalesOrder
    serializer_class = SalesOrderSerializer
    filter_params = ['sku__name', 'customer__display_name', 'process_plant__display_name', 'order_id', 'quote_id',
                     'management']
    date_query = 'order_date'

    def get_queryset(self):
        query = self.model.objects.all().order_by('-month', '-year')
        return query


@permission_classes([PlanningLogisticEditorPermission])
class DetailSalesOrderView(BaseDetailView):
    model = SalesOrder
    serializer_class = SalesOrderDetailSerializer

    def get_object(self, id):
        query = self.model.objects.get(slug=id)
        return query


class SalesPlanningView(BaseListView):
    model = SalesOrder
    serializer_class = SalesOrderShortSerializer
    filter_params = []

    def get_queryset(self):
        query = self.model.objects.filter(delivery='pending').order_by('month', '-year')
        return query


@permission_classes([PlanningProductionEditorPermission])
class ListProductionPlanningView(BaseListView, NoGetMixin):
    model = ProductionPlanning
    serializer_class = ProductionPlanningSerializer
    filter_params = []


@permission_classes([PlanningProductionEditorPermission])
class DetailProductionPlanningView(BaseDetailView, NoGetMixin):
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
            query = self.model.objects.filter(sale__delivery='pending')
            for item in query:
                data.append({
                    'title': item.sale.sku.raw_material.name + ' ' + item.sale.sku.cut.name + ' - ' + item.sale.customer.display_name + " " + str(
                        item.raw_material) + " kg", 'date': item.date, 'color': item.sale.color})
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'data': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
