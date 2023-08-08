from rest_framework import serializers

from apps.management.models import *

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPeople
        fields = '__all__'
class CustomerSupplierProxySerializer(serializers.ModelSerializer):
    contacts = ContactSerializer(many=True,read_only=True)
    class Meta:
        model = CustomerSupplierProxy
        fields = '__all__'

class CustomerSerializer(CustomerSupplierProxySerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class SuppliersSerializer(CustomerSupplierProxySerializer):
    class Meta:
        model = Suppliers
        fields = '__all__'
class OutsourcingSerializer(CustomerSupplierProxySerializer):
    class Meta:
        model = Outsourcing
        fields = '__all__'
class TransportSerializer(CustomerSupplierProxySerializer):
    class Meta:
        model = Transport
        fields = '__all__'
class StorageAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorageArea
        fields = '__all__'
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
class CostProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CostProduction
        fields = '__all__'
class UnitOfMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitOfMeasurement
        fields = '__all__'
class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
class TaxRatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxRates
        fields = '__all__'
class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'
class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = '__all__'
class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'
class SubFamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubFamily
        fields = '__all__'
class CutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cut
        fields = '__all__'
class PackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Packing
        fields = '__all__'

class ContainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Container
        fields = '__all__'

