from _decimal import Decimal
from datetime import datetime

from django.db import DatabaseError
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.logistic.models import Lot, ILot, Motions, Pallets, Output, RegisterOutput
from apps.logistic.serializers import LotSerializer, ILotSerializer, MotionsSerializer, PalletsSerializer, \
    OutputSerializer, LotSummarySerializer, RegisterOutputSerializer, SummaryOutputSerializer, LotUpdateSerializer
from apps.management.models import Location
from apps.production.models import ProcessPineapple, MOD
from apps.quality_assurance.models import Pineapple, Banano, Mango, Blueberry, Goldenberry
from apps.util.permissions import RawMaterialEditorPermission, LogisticsEditorPermission, \
    PlanningLogisticEditorPermission, CollectionEditorPermission


class ListPalletsView(APIView):
    def get(self, request, format=None):
        try:
            queryset = Pallets.objects.all()
            serializer = PalletsSerializer(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Create your views here.
@permission_classes([RawMaterialEditorPermission])
class ListCreateLotView(APIView):
    def get(self, request, format=None):

        try:
            queryset = Lot.objects.all()
            lot = request.query_params.get('lot', None)
            if lot:
                queryset = queryset.filter(lot__contains=str(lot))
            else:
                queryset = queryset[:30]
            serializer = LotSummarySerializer(queryset, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None):
        try:
            serializer = LotSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            lot = serializer.save()
            if lot.product.name == 'Piña':
                Pineapple.objects.create(lot=lot)
            elif lot.product.name == 'Plátano':
                Banano.objects.create(lot=lot)
            elif lot.product.name == 'Mango':
                Mango.objects.create(lot=lot)
            elif lot.product.name == "Arándano":
                Blueberry.objects.create(lot=lot)
            elif lot.product.name == "Aguaymanto":
                Goldenberry.objects.create(lot=lot)
            else:
                pass
            return Response({"message": "Lote creado correctamente"}, status=status.HTTP_201_CREATED, )
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlanningLogisticEditorPermission | CollectionEditorPermission])
class DetailLotView(APIView):

    def get(self, request, *args, **kwargs):
        lot = get_object_or_404(Lot, lot=kwargs['lot'])
        serializer = LotSerializer(lot)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, lot, format=None):
        try:
            report = get_object_or_404(Lot, lot=lot)
            if report.disabled_update:
                return Response(
                    {'message': 'El lote ya esta bloqueado para su edición. Contáctese con el administrador'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            serializer = LotUpdateSerializer(report, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Lote actualizado correctamente.'})
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([RawMaterialEditorPermission])
class ListCreateILotView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            lot = kwargs['lot']
            serializer = ILotSerializer(ILot.objects.filter(lot__lot=lot), many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, format=None, *args, **kwargs):
        data = request.data
        lot = kwargs['lot']
        try:
            query = Lot.objects.get(lot=lot)
            output = Output.objects.filter(lot=query)

            if query.closed:
                return Response({"error": "El lote ya esta bloqueado para su edición. Contáctese con el administrador"},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            if output.exists():
                return Response({"error": "El lote ya tiene salida"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            data['lot'] = query.id
            serializer = ILotSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Item agregado correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([RawMaterialEditorPermission])
class UpdateILotView(APIView):
    def delete(self, request, *args, **kwargs):
        lot = kwargs['lot']
        query = Lot.objects.get(lot=lot)
        output = Output.objects.filter(lot=query)
        if query.closed:
            return Response({"error": "El lote ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if output.exists():
            return Response({"error": "El lote ya tiene salida"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            inf = get_object_or_404(ILot, id=kwargs['pk'])
            inf.delete()
            return Response({"message": "Item eliminado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, *args, **kwargs):
        lot = kwargs['lot']
        query = Lot.objects.get(lot=lot)
        output = Output.objects.filter(lot=query)
        if query.closed:
            return Response({"error": "El lote ya esta bloqueado para su edición. Contáctese con el administrador"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if output.exists():
            return Response({"error": "El lote ya tiene salida"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        inf = get_object_or_404(ILot, id=kwargs['pk'])
        data = request.data
        data['lot'] = query.id
        serializer = ILotSerializer(inf, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Item actualizado correctamente"}, status=status.HTTP_200_OK)


@permission_classes([RawMaterialEditorPermission | LogisticsEditorPermission])
class ListCreateMotionsView(APIView):
    def get(self, request):
        try:
            queryset = Motions.objects.all()
            date_start = request.query_params.get('start_date', None)
            date_end = request.query_params.get('end_date', None)
            if date_start and date_end:
                queryset = queryset.filter(
                    date__range=[datetime.strptime(date_start, "%d/%m/%Y"), datetime.strptime(date_end, "%d/%m/%Y")])
            else:
                queryset = queryset.filter(date__range=[datetime.now().date(), datetime.now().date()])
            serializer = MotionsSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        origin_id = request.data.get('origin')
        destination_id = request.data.get('destination')
        quantity = int(request.data.get('quantity'))
        description = request.data.get('description')

        origin = get_object_or_404(Location, id=origin_id)
        destination = get_object_or_404(Location, id=destination_id)

        if origin == destination:
            return Response({'error': 'No se puede mover stock al mismo origen.'}, status=status.HTTP_400_BAD_REQUEST)

        if origin.stock < quantity:
            return Response({'error': 'No hay suficiente stock en el origen.'}, status=status.HTTP_400_BAD_REQUEST)

        origin.stock -= quantity
        origin.save()

        destination.stock += quantity
        destination.save()

        motion = Motions(description=description, origin=origin, destination=destination, quantity=quantity)
        motion.save()

        return Response({'success': True}, status=status.HTTP_201_CREATED)


@permission_classes([RawMaterialEditorPermission | LogisticsEditorPermission])
class DeleteMotionView(APIView):
    def delete(self, request, pk, format=None):
        motion = get_object_or_404(Motions, id=pk)
        old_origin_quantity = motion.origin.stock
        old_destination_quantity = motion.destination.stock
        Location.objects.filter(id=motion.origin.id).update(stock=old_origin_quantity + motion.quantity)
        Location.objects.filter(id=motion.destination.id).update(stock=old_destination_quantity - motion.quantity)
        motion.delete()
        return Response({'message': 'Movimiento eliminado correctamente.'}, status=status.HTTP_200_OK)


class ListLotStockView(APIView):
    def get(self, request):
        try:
            lots = Lot.objects.all().filter(stock__gt=0).order_by('-id')[0:10]
            serializer = LotSerializer(lots, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([RawMaterialEditorPermission])
class ListCreateOutputView(APIView):
    def get(self, request):
        try:
            queryset = Output.objects.all()
            date_start = request.query_params.get('start_date', None)
            date_end = request.query_params.get('end_date', None)
            if date_start and date_end:
                queryset = queryset.filter(
                    date__range=[datetime.strptime(date_start, "%d/%m/%Y"), datetime.strptime(date_end, "%d/%m/%Y")])
            else:
                queryset = queryset.filter(date__range=[datetime.now().date(), datetime.now().date()])

            serializer = OutputSerializer(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        lot_id = request.data.get('lot_id')
        quantity = Decimal(request.data.get('kg'))
        destine = request.data.get('destine')

        lot = get_object_or_404(Lot, id=lot_id)
        try:

            if lot.stock < quantity:
                return Response({'error': 'Stock insuficiente en el lote de origen.'},
                                status=status.HTTP_400_BAD_REQUEST)

            if destine == 'P':
                lot.stock -= quantity
                lot.save()
                output = Output(lot=lot, kg=quantity, destine=destine)
                output.save()
                try:
                    if lot.product.name == 'Piña':
                        pineapple = ProcessPineapple(stock=output)
                        pineapple.save()
                        obj, create = MOD.objects.get_or_create(date=output.date)
                        obj.process.add(output)
                        obj.save()
                    else:
                        pass
                except Exception as e:
                    return Response({
                        'error': 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.',
                        'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                return Response({'message': 'Stock enviado a producción'}, status=status.HTTP_201_CREATED)

            elif destine == 'M':
                lot.stock -= quantity
                lot.merma += quantity
                lot.save()
                output = Output(lot=lot, kg=quantity, destine=destine)
                output.save()
                return Response({'message': 'Stock enviado enviado a merma'}, status=status.HTTP_201_CREATED)

            else:
                pass
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([RawMaterialEditorPermission])
class DeleteOutputView(APIView):
    def delete(self, request, *args, **kwargs):
        output = get_object_or_404(Output, id=kwargs.get('pk'))
        try:
            out = output
            output.delete()
            if out.destine == 'P':
                out.lot.stock += Decimal(out.kg)
                out.lot.save()
                return Response({'message': 'Movimiento eliminado.'}, status=status.HTTP_200_OK)
            elif out.destine == 'M':
                out.lot.stock += Decimal(out.kg)
                out.lot.merma -= Decimal(out.kg)
                out.lot.save()
                return Response({'message': 'Movimiento eliminado.'}, status=status.HTTP_200_OK)
            else:
                pass
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddOutputItemsView(APIView):

    def post(self, request, format=None):
        try:
            serializer = RegisterOutputSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Salida registrada correctamente'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListOutputItemsView(APIView):
    def get(self, request, lot):
        try:
            queryset = RegisterOutput.objects.filter(item__lot__lot=lot)
            serializer = SummaryOutputSerializer(queryset, many=True)

            summary = RegisterOutput.objects.filter(item__lot__lot=lot).values('date').annotate(
                output=Sum('net_weight')).order_by('-date')
            summary_serializer = SummaryOutputSerializer(summary, many=True)

            return Response({"data": serializer.data, 'summary': summary_serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
