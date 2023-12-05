from rest_framework import serializers

from apps.collection.models import Product, Parcel, Provider
from apps.management.serializers import CustomerSupplierProxySerializer


class ProductSerializer(serializers.ModelSerializer):
    stock = serializers.CharField(source='get_stock', read_only=True)
    pending = serializers.CharField(source='get_pending_count', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class SupplierRMSerializer(CustomerSupplierProxySerializer):
    class Meta:
        model = Provider
        fields = '__all__'


class ParcelSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(source='provider.business_name', read_only=True)
    status_name = serializers.CharField(source='get_status_name', read_only=True)
    type_mp_name = serializers.CharField(source='get_type_mp_name', read_only=True)
    type_sample_name = serializers.CharField(source='get_sample_type_name', read_only=True)
    product_name = serializers.CharField(source='provider.product.name', read_only=True)

    class Meta:
        model = Parcel
        fields = '__all__'
