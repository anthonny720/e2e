from datetime import datetime

from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response

from .models import (Blueberry as blueberry, Banano as banano, Goldenberry as goldenberry, Mango as mango,Pineapple as pineapple, )
from .serializers import (BlueberrySerializer, BananoSerializer, GoldenberrySerializer, MangoSerializer,PineappleSerializer, )
from ..util.permissions import CustomPermission, UserRoles


class AnalysisListView(ListAPIView):
    serializer_class_map = {blueberry: BlueberrySerializer, banano: BananoSerializer,
                            goldenberry: GoldenberrySerializer, mango: MangoSerializer,
                            pineapple: PineappleSerializer, }

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
            date_start = request.query_params.get('start_date', None)
            date_end = request.query_params.get('end_date', None)
            if date_start and date_end:
                queryset = queryset.filter(lot__download_date__range=[datetime.strptime(date_start, "%d/%m/%Y"),
                                                                      datetime.strptime(date_end, "%d/%m/%Y")])
            else:
                queryset = queryset.order_by('-lot__download_date')[:50]
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(queryset, many=True)

            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AnalysisDetailView(RetrieveUpdateAPIView):
    permission_classes = [CustomPermission]
    allowed_roles = [UserRoles.ANALISTA_CONTROL_CALIDAD.value]

    serializer_class_map = {blueberry: BlueberrySerializer, banano: BananoSerializer,
                            goldenberry: GoldenberrySerializer, mango: MangoSerializer,
                            pineapple: PineappleSerializer, }

    def get_queryset(self):
        model_name = self.kwargs.get('model_name')
        model_class = globals().get(model_name)
        return model_class.objects.all()

    def get_serializer_class(self):
        model_name = self.kwargs.get('model_name')
        return self.serializer_class_map.get(globals().get(model_name))

    def patch(self, request, *args, **kwargs):

        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "Registro actualizado correctamente."
            return Response({'message': success_message}, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = 'Se ha producido un error inesperado en el servidor. Por favor, inténtelo de nuevo más tarde.'
            return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
