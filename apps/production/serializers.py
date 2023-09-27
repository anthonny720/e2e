from rest_framework import serializers

from apps.production.models import PineappleConditioning, PineapplePacking


class PineappleConditioningSerializer(serializers.ModelSerializer):
    class Meta:
        model = PineappleConditioning
        fields = '__all__'

class PineapplePackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PineapplePacking
        fields = '__all__'