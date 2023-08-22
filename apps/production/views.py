from datetime import datetime

from django.db import DatabaseError
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from .models import (ProcessPineapple as Piña, PackingProcessPineapple as PackingPiña, MOD)
from .serializers import ProcessPineappleSerializer, MODSerializer, PackingProcessPineappleSerializer
from ..util.permissions import ProductionEditorPermission, PlanningProductionEditorPermission


class ProcessListView(ListAPIView):
    serializer_class_map = {
        Piña: ProcessPineappleSerializer,
    }

    def get_queryset(self):
        model_name = self.kwargs.get('model_name')
        model_class = globals().get(model_name)
        return model_class.objects.all()

    def get_serializer_class(self):
        model_name = self.kwargs.get('model_name')
        return self.serializer_class_map.get(globals().get(model_name))

    def list(self, request, *args, **kwargs):
        try:

            queryset = self.get_queryset()

            provider = request.query_params.get('provider', None)
            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            lot = request.query_params.get('lot', None)

            if provider:
                queryset = queryset.filter(stock__lot__provider__id__icontains=provider)
            if lot:
                queryset = queryset.filter(stock__lot__lot__icontains=lot)
            if start_date and end_date:
                queryset = queryset.filter(date__range=[datetime.strptime(start_date, "%d/%m/%Y"),
                                                        datetime.strptime(end_date, "%d/%m/%Y")])
            elif start_date:
                queryset = queryset.filter(date__gte=start_date)
            else:
                queryset = queryset[:50]
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlanningProductionEditorPermission])
class ProcessUpdateView(UpdateAPIView):
    serializer_class_map = {
        Piña: ProcessPineappleSerializer,
    }

    def get_queryset(self):
        model_name = self.kwargs.get('model_name')
        model_class = globals().get(model_name)
        return model_class.objects.filter(id=self.kwargs["id"])

    def get_serializer_class(self):
        model_name = self.kwargs.get('model_name')
        return self.serializer_class_map.get(globals().get(model_name))

    def partial_update(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            instance = queryset.first()
            data = request.data
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente.'}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BasePackingProcessListView(ListAPIView):
    model_class = None
    serializer_class = None

    def get_queryset(self):
        return self.model_class.objects.all()

    def list(self, request, *args, **kwargs):
        try:

            queryset = self.get_queryset()

            provider = request.query_params.get('provider', None)
            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            lot = request.query_params.get('lot', None)

            if provider:
                queryset = queryset.filter(lot=provider)
            if lot:
                queryset = queryset.filter(lot__stock__lot__lot__icontains=lot)
            if start_date and end_date:
                queryset = queryset.filter(date__range=[datetime.strptime(start_date, "%d/%m/%Y"),
                                                        datetime.strptime(end_date, "%d/%m/%Y")])
            elif start_date:
                queryset = queryset.filter(date__gte=start_date)
            else:
                queryset = queryset[:50]
            serializer_class = self.serializer_class
            serializer = serializer_class(queryset, many=True)

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
            return Response({'message': 'Se ha creado correctamente el proceso de envasado.'},
                            status=status.HTTP_201_CREATED)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@permission_classes([PlanningProductionEditorPermission])
class BasePackingProcessDetailView(UpdateAPIView):
    model_class = None
    serializer_class = None

    def patch(self, request, *args, **kwargs):
        try:
            packing_process = self.model_class.objects.get(id=kwargs["id"])
            serializer = self.serializer_class(packing_process, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente.'}, status=status.HTTP_200_OK)
        except DatabaseError as e:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message,'detail':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@permission_classes([PlanningProductionEditorPermission])
class PineapplePackingProcessListView(BasePackingProcessListView):
    model_class = PackingPiña
    serializer_class = PackingProcessPineappleSerializer
@permission_classes([PlanningProductionEditorPermission])
class PineapplePackingProcessDetailView(BasePackingProcessDetailView):
    model_class = PackingPiña
    serializer_class = PackingProcessPineappleSerializer


def get_filtered_query(category, provider=None, start_date=None, end_date=None):
    queryset = MOD.objects.filter(process__lot__product__name__icontains=category).distinct()

    if provider:
        queryset = queryset.filter(process__lot__provider__id__icontains=provider)
    if start_date and end_date:
        queryset = queryset.filter(date__range=[datetime.strptime(start_date, "%d/%m/%Y"),
                                                datetime.strptime(end_date, "%d/%m/%Y")])
    else:
        queryset = queryset[:50]
    return queryset


class MODListView(APIView):
    def get(self, request, *args, **kwargs):
        category = kwargs["category"].capitalize()

        provider = request.query_params.get('provider', None)
        start_date = request.query_params.get('start_date', None)
        end_date = request.query_params.get('end_date', None)
        try:
            queryset = get_filtered_query(category, provider, start_date, end_date)
            serializer = MODSerializer(queryset, many=True)
            response = serializer.data
            return Response({'data': response}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([PlanningProductionEditorPermission])
class MODDetailView(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            mod = MOD.objects.get(id=kwargs["id"])
            serializer = MODSerializer(mod, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'Registro actualizado correctamente.'}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
