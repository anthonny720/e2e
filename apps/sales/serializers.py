from rest_framework import serializers

from apps.sales.models import Samples


class SamplesSerializer(serializers.ModelSerializer):
    packing_type_name = serializers.CharField(source='get_packaging_type', read_only=True)
    market_name = serializers.CharField(source='get_market', read_only=True)
    status_name = serializers.CharField(source='get_status', read_only=True)

    class Meta:
        model = Samples
        fields = '__all__'
