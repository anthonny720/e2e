from rest_framework import serializers

from apps.production.models import PineappleConditioning, PineapplePacking, MOD


class PineappleConditioningSerializer(serializers.ModelSerializer):
    class Meta:
        model = PineappleConditioning
        fields = '__all__'

class PineapplePackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PineapplePacking
        fields = '__all__'

class MODSerializer(serializers.ModelSerializer):
    class Meta:
        model = MOD
        fields = '__all__'