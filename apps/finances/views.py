from datetime import datetime

from django.db import DatabaseError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.finances.models import ReportCost
from apps.finances.serializers import ReportCostSerializer
from apps.logistic.models import Lot
from apps.management.models import Customer, Cut
from apps.operations_and_planning.models import Product, SalesOrder
from apps.production.models import PackingProcessPineapple
from apps.util.permissions import PlanningLogisticEditorPermission


@permission_classes([PlanningLogisticEditorPermission])
class ListCostView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = ReportCost.objects.all().order_by('-date')
            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            if start_date and end_date:
                queryset = queryset.filter(
                    date__range=[datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")])
            else:
                queryset = queryset[:50]
            serializer = ReportCostSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            category = request.data.get('category')
            lot = get_object_or_404(Lot, pk=request.data.get('lot'))
            id_process = request.data.get('id_process')
            fcl = request.data.get('full_load_container')
            fcl_obj = None
            if fcl is not None:
                fcl_obj = get_object_or_404(SalesOrder, id=request.data.get('full_load_container'))

            if not lot.disabled_update:
                return Response({'message': f'El lote tiene campos incompletos {lot.lot}'},
                                status=status.HTTP_400_BAD_REQUEST)
            if category == 'Piña':
                query = get_object_or_404(PackingProcessPineapple, pk=id_process)
                query.disable = True
                cost = ReportCost.objects.create(date=request.data.get('date'),
                    sku=get_object_or_404(Product, id=request.data.get('sku')),
                    exchange_rate=request.data.get('exchange_rate'),
                    customer=get_object_or_404(Customer, id=request.data.get('customer')), full_load_container=fcl_obj,
                    cut=get_object_or_404(Cut, id=request.data.get('cut')), lot=lot,
                    participation=request.data.get('participation'), price_mp=lot.price_camp,
                    freight=lot.get_freight_kg(), mp=request.data.get('mp'), service_download=lot.service_downloads,
                    kg_processed=request.data.get('kg_processed'), kg_pt=request.data.get('kg_pt'),
                    humidity=request.data.get('humidity'), cost_bags=request.data.get('cost_bags'),
                    cost_boxes=request.data.get('cost_boxes'), cost_materials=request.data.get('cost_materials'),
                    cost_mod_conditioning=request.data.get('cost_mod_conditioning'),
                    cost_mod_packing=request.data.get('cost_mod_packing'), glp=request.data.get('glp'),
                    price_sale=request.data.get('price_sale'))
                cost.save()
                query.save()
            return Response({'message': 'Costo registrado correctamente'}, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
