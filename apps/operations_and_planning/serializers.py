from rest_framework import serializers

from apps.operations_and_planning.models import Material, Product, Recipe, Stock, StockEntry, StockExit, StockReentry, ProductionPlanning


class MaterialSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    unit_of_measurement_name = serializers.CharField(source='unit_of_measurement.name', read_only=True)

    class Meta:
        model = Material
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    material_name = serializers.CharField(source='material.name', read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    unit_of_measurement_name = serializers.CharField(source='unit_of_measurement.name', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class ProductDetailSerializer(serializers.ModelSerializer):
    recipe_list = RecipeSerializer(read_only=True, many=True, source='recipe_products')
    group_name = serializers.CharField(source='group.name', read_only=True)
    unit_of_measurement_name = serializers.CharField(source='unit_of_measurement.name', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class StockSerializer(serializers.ModelSerializer):
    product = MaterialSerializer(read_only=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_price')
    # reorder_point = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='reorder_point')
    lead_time_Real = serializers.CharField(read_only=True, source='get_lead_time')
    lead_time = serializers.CharField(read_only=True, source='get_last_lead_time')
    reorder_point = serializers.CharField(read_only=True, source='get_reorder_point')
    safety_stock = serializers.CharField(read_only=True, source='get_safety_stock')
    consumption_average = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True,
                                                   source='calculate_daily_consumption_average')

    class Meta:
        model = Stock
        fields = '__all__'


class StockEntrySerializer(serializers.ModelSerializer):
    material = serializers.CharField(source='item.name', read_only=True)
    code_sap = serializers.CharField(source='item.sap', read_only=True)
    supplier = serializers.CharField(source='provider.business_name', read_only=True)

    class Meta:
        model = StockEntry
        fields = '__all__'


class StockReEntrySerializer(serializers.ModelSerializer):
    stock_entry = StockEntrySerializer(read_only=True)

    class Meta:
        model = StockReentry
        fields = '__all__'


class StockExitSerializer(serializers.ModelSerializer):
    stock_entry = StockEntrySerializer(read_only=True)
    price = serializers.CharField(source='stock_entry.price_per_unit', read_only=True)

    class Meta:
        model = StockExit
        fields = '__all__'


class StockExitDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockExit
        fields = '__all__'

class ProductionPlanningSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionPlanning
        fields = '__all__'

