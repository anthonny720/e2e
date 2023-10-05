from django.db import DatabaseError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.commercial.models import SalesProgress
from apps.commercial.serializers import SalesProgressSerializer


# Create your views here.


class ListSalesProgressView(APIView):
    model = SalesProgress
    serializer_class = SalesProgressSerializer

    def get(self, request, *args, **kwargs):
        try:
            queryset = self.model.objects.all().order_by('-date')
            sku = self.request.query_params.get('sku', None)
            client_name = self.request.query_params.get('client_name', None)
            po_number = self.request.query_params.get('po_number', None)
            pfi_number = self.request.query_params.get('pfi_number', None)
            commercial_status = self.request.query_params.get('commercial_status', None)
            month = self.request.query_params.get('month', None)
            year = self.request.query_params.get('year', None)
            fcl_name = self.request.query_params.get('fcl_name', None)

            if sku:
                queryset = queryset.filter(sku__icontains=sku)
            if client_name:
                queryset = queryset.filter(client_name__icontains=client_name)
            if po_number:
                queryset = queryset.filter(po_number__icontains=po_number)
            if pfi_number:
                queryset = queryset.filter(pfi_number__icontains=pfi_number)
            if commercial_status:
                queryset = queryset.filter(commercial_status__icontains=commercial_status)
            if month:
                queryset = queryset.filter(date__month=month)
            if year:
                queryset = queryset.filter(date__year=year)
            if fcl_name:
                queryset = queryset.filter(fcl_name__icontains=fcl_name)

            serializer = self.serializer_class(queryset, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailSalesOrderView(APIView):
    model = SalesProgress
    serializer_class = SalesProgressSerializer

    def get(self, request,slug, *args, **kwargs):
        try:
            queryset = self.model.objects.get(slug=slug)
            serializer = self.serializer_class(queryset, many=False)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        except DatabaseError:
            error_message = 'No se puede procesar su solicitud debido a un error de base de datos. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'message': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)