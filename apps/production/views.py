from rest_framework.generics import ListAPIView
from datetime import datetime

from django.db import DatabaseError
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from .models import (PineappleConditioning, PineapplePacking, MOD, Ovens)
from .serializers import PineappleConditioningSerializer, PineapplePackingSerializer, MODSerializer, OvenSerializer


class ProcessConditioningBaseListView(ListAPIView):
    serializer_class = None
    model_class = None

    def list(self, request, *args, **kwargs):
        try:

            queryset = self.model_class.objects.all()

            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            lot = request.query_params.get('lot', None)

            if lot:
                queryset = queryset.filter(lot__icontains=lot)
            if start_date and end_date:
                queryset = queryset.filter(
                    date__range=[datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")])
            elif start_date:
                queryset = queryset.filter(date__gte=start_date)
            else:
                queryset = queryset[:50]
            serializer_class = self.serializer_class
            serializer = serializer_class(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProcessPackingBaseListView(ListAPIView):
    serializer_class = None
    model_class = None

    def list(self, request, *args, **kwargs):
        try:

            queryset = self.model_class.objects.all()

            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            lot = request.query_params.get('lot', None)

            if lot:
                queryset = queryset.filter(lot__icontains=lot)
            if start_date and end_date:
                queryset = queryset.filter(
                    date__range=[datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")])
            elif start_date:
                queryset = queryset.filter(date__gte=start_date)
            else:
                queryset = queryset[:50]
            serializer_class = self.serializer_class
            serializer = serializer_class(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PineappleConditioningListView(ProcessConditioningBaseListView):
    serializer_class = PineappleConditioningSerializer
    model_class = PineappleConditioning

class PineapplePackingListView(ProcessPackingBaseListView):
    serializer_class = PineapplePackingSerializer
    model_class = PineapplePacking


class MODListView(APIView):
    serializer_class = MODSerializer
    model_class = MOD

    def get(self,request,*args,**kwargs):
        try:
            queryset=self.model_class.objects.all()
            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            if start_date and end_date:
                queryset = queryset.filter(
                    date__range=[datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")])
            elif start_date:
                queryset = queryset.filter(date__gte=start_date)
            else:
                queryset = queryset[:50]

            serializer_class=self.serializer_class
            serializer=serializer_class(queryset,many=True)
            return Response({'data':serializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OvenListView(APIView):
    serializer_class = OvenSerializer
    model_class = Ovens

    def get(self, request, *args, **kwargs):
        try:
            queryset = self.model_class.objects.all()
            start_date = request.query_params.get('start_date', None)
            end_date = request.query_params.get('end_date', None)
            lot = request.query_params.get('lot', None)
            if start_date and end_date:
                queryset = queryset.filter(
                    date__range=[datetime.strptime(start_date, "%d/%m/%Y"), datetime.strptime(end_date, "%d/%m/%Y")])
            if lot:
                queryset = queryset.filter(lot__icontains=lot)
            elif start_date:
                queryset = queryset.filter(date__gte=datetime.strptime(start_date, "%d/%m/%Y"))
            else:
                queryset = queryset[:50]

            serializer_class = self.serializer_class
            serializer = serializer_class(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)