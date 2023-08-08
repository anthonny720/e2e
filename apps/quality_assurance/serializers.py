from rest_framework import serializers
from .models import Pineapple, Banano, Blueberry, Mango, Goldenberry


class BaseSerializer(serializers.ModelSerializer):
    entry_date = serializers.CharField(source='lot.entry_date', read_only=True)
    week = serializers.CharField(source='lot.get_week', read_only=True)
    lot_name = serializers.CharField(source='lot.lot', read_only=True)
    net_weight = serializers.CharField(source='lot.get_total_net_weight', read_only=True)



class PineappleSerializer(BaseSerializer):
    calibers = serializers.DictField(source='lot.get_calibers_percentage', read_only=True)
    maturation_total = serializers.CharField(source='get_maturation_total', read_only=True)

    class Meta:
        model = Pineapple
        fields = '__all__'


class BananoSerializer(BaseSerializer):
    maturation_total = serializers.CharField(source='get_maturation_total', read_only=True)
    class Meta:
        model = Banano
        fields = '__all__'


class BlueberrySerializer(BaseSerializer):
    class Meta:
        model = Blueberry
        fields = '__all__'


class MangoSerializer(BaseSerializer):
    total_defects = serializers.CharField(source='get_total_defects', read_only=True)
    class Meta:
        model = Mango
        fields = '__all__'


class GoldenberrySerializer(BaseSerializer):
    maturation_total = serializers.CharField(source='get_maturation_total', read_only=True)
    defects = serializers.CharField(source='get_defects', read_only=True)

    class Meta:
        model = Goldenberry
        fields = '__all__'

