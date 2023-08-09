from rest_framework import serializers

from apps.logistic.models import ILot, Lot, Pallets, Output, RegisterOutput, Records
from .models import Motions

class SummaryLotSerializer(serializers.ModelSerializer):
    parcels_name = serializers.CharField(source='get_parcels_name', read_only=True)
    amount_guide_kg = serializers.CharField(source='get_total_amount_guide_kg', read_only=True)
    amount_net_kg = serializers.CharField(source='get_total_amount_net_kg', read_only=True)
    discount_guide_kg = serializers.CharField(source='get_discount_guide_kg', read_only=True)
    discount_net_kg = serializers.CharField(source='get_discount_net_kg', read_only=True)
    provider_name = serializers.CharField(source='provider.business_name', read_only=True)
    difference_kg = serializers.CharField(source='get_net_difference', read_only=True)
    calibers = serializers.DictField(source='get_total_calibers', read_only=True)
    weight_pallets = serializers.CharField(source='get_total_weight_pallets', read_only=True)
    weight_boxes = serializers.CharField(source='get_total_weight_boxes', read_only=True)
    quantity_boxes = serializers.CharField(source='get_total_boxes', read_only=True)
    total_tare = serializers.CharField(source='get_total_tare', read_only=True)
    net_weight = serializers.CharField(source='get_total_net_weight', read_only=True)
    brute_weight = serializers.CharField(source='get_total_brute_weight', read_only=True)
    business_maquila_name = serializers.CharField(source='maquila.business_name', read_only=True)
    transport_name = serializers.CharField(source='transport.business_name', read_only=True)
    condition_name = serializers.CharField(source='get_condition_name', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    avg_box = serializers.CharField(source='get_avg_box', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)

    class Meta:
        model = Lot
        exclude =(
            'id',
            'drive',
            'description',
            'discount_description',
            'merma',
            'stock',
            'closed',
            'maquila',
            'product',
            'provider',
            'transport',
            'parcel',
            'condition',
        )
class LotSerializer(serializers.ModelSerializer):
    parcels_name = serializers.CharField(source='get_parcels_name', read_only=True)
    amount_guide_kg = serializers.CharField(source='get_total_amount_guide_kg', read_only=True)
    amount_net_kg = serializers.CharField(source='get_total_amount_net_kg', read_only=True)
    discount_guide_kg = serializers.CharField(source='get_discount_guide_kg', read_only=True)
    discount_net_kg = serializers.CharField(source='get_discount_net_kg', read_only=True)
    category_name = serializers.CharField(source='product.name', read_only=True)
    provider_name = serializers.CharField(source='provider.business_name', read_only=True)
    difference_kg = serializers.CharField(source='get_net_difference', read_only=True)
    calibers = serializers.DictField(source='get_total_calibers', read_only=True)
    weight_pallets = serializers.CharField(source='get_total_weight_pallets', read_only=True)
    weight_boxes = serializers.CharField(source='get_total_weight_boxes', read_only=True)
    pallets = serializers.DictField(source='get_pallets', read_only=True)
    boxes = serializers.DictField(source='get_boxes', read_only=True)
    avg_brute = serializers.CharField(source='get_avg_brute', read_only=True)
    avg_net = serializers.CharField(source='get_avg_net', read_only=True)
    quantity_boxes = serializers.CharField(source='get_total_boxes', read_only=True)
    quantity_pallets = serializers.CharField(source='get_quantity_pallets', read_only=True)
    total_tare = serializers.CharField(source='get_total_tare', read_only=True)
    net_weight = serializers.CharField(source='get_total_net_weight', read_only=True)
    brute_weight = serializers.CharField(source='get_total_brute_weight', read_only=True)
    business_maquila_name = serializers.CharField(source='maquila.business_name', read_only=True)
    transport_name = serializers.CharField(source='transport.business_name', read_only=True)
    condition_name = serializers.CharField(source='get_condition_name', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    avg_box = serializers.CharField(source='get_avg_box', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)
    price_final = serializers.CharField(source='get_final_price', read_only=True)

    class Meta:
        model = Lot
        fields = '__all__'

class LotUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lot
        fields = '__all__'

class ILotSerializer(serializers.ModelSerializer):
    net_weight = serializers.CharField(source='get_net_weight', read_only=True)
    pallet_name = serializers.CharField(source='get_pallet', read_only=True)
    boxes = serializers.CharField(source='get_quantity_boxes', read_only=True)
    weight_boxes = serializers.CharField(source='get_weight_boxes', read_only=True)
    weight_pallet = serializers.CharField(source='get_weight_pallet', read_only=True)
    total_tare= serializers.CharField(source='get_total_tare', read_only=True)
    location_name = serializers.CharField(source='location.name', read_only=True)

    class Meta:
        model = ILot
        fields = '__all__'


class MotionsSerializer(serializers.ModelSerializer):
    origin_name = serializers.CharField(source='origin.name', read_only=True)
    destination_name = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = Motions
        fields = '__all__'


class PalletsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pallets
        fields = '__all__'


class OutputSerializer(serializers.ModelSerializer):
    lot_name = serializers.CharField(source='lot.lot', read_only=True)

    class Meta:
        model = Output
        fields = '__all__'


class LotSummarySerializer(serializers.ModelSerializer):
    net_weight = serializers.CharField(source='get_total_net_weight', read_only=True)
    business_maquila_name = serializers.CharField(source='maquila.business_name', read_only=True)
    condition_name = serializers.CharField(source='get_condition_name', read_only=True)
    category_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Lot
        fields = (
            'id', 'net_weight', 'condition_name', 'variety', 'download_date', 'category_name', 'business_maquila_name',
            'stock', 'lot')


class ILotSummarySerializer(serializers.ModelSerializer):
    pallet_name = serializers.CharField(source='get_pallet', read_only=True)
    boxes = serializers.CharField(source='get_quantity_boxes', read_only=True)

    class Meta:
        model = ILot
        fields = ('pallet_name', 'boxes', 'tare', 'weight', 'number')


class RegisterOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterOutput
        fields = '__all__'


class SummaryOutputSerializer(serializers.ModelSerializer):
    output = serializers.SerializerMethodField(read_only=True)
    item = ILotSummarySerializer(read_only=True)

    def get_output(self, obj):
        try:
            return round(obj['output'], 2)
        except:
            return 0

    class Meta:
        model = RegisterOutput
        fields = ('output', 'date', 'item', 'kg', 'net_weight')



class RecordsMPSerializer(serializers.ModelSerializer):
    year=serializers.CharField(source='get_year',read_only=True)
    month=serializers.CharField(source='get_month',read_only=True)
    week=serializers.CharField(source='get_week',read_only=True)
    class Meta:
        model = Records
        fields = '__all__'
