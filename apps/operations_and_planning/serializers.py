from rest_framework import serializers

from apps.operations_and_planning.models import Material, Product, Recipe, Stock, StockEntry, StockExit, Purchase, \
    PurchaseItems, SalesOrder, ProductionPlanning, StockReEntry


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
    expected = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_expected_quantity')
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
    material = serializers.CharField(source='purchase_item.material.name', read_only=True)
    code_sap = serializers.CharField(source='purchase_item.material.sap', read_only=True)
    order_id = serializers.CharField(source='purchase_item.purchase.order_id', read_only=True)
    supplier = serializers.CharField(source='purchase_item.purchase.supplier.display_name', read_only=True)
    currency = serializers.CharField(source='purchase_item.purchase.currency.name', read_only=True)

    class Meta:
        model = StockEntry
        fields = '__all__'

class StockReEntrySerializer(serializers.ModelSerializer):
    stock_entry = StockEntrySerializer(read_only=True)

    class Meta:
        model = StockReEntry
        fields = '__all__'

class StockExitSerializer(serializers.ModelSerializer):
    stock_entry = StockEntrySerializer(read_only=True)
    currency = serializers.CharField(source='stock_entry.purchase_item.purchase.currency.name', read_only=True)
    price = serializers.CharField(source='stock_entry.purchase_item.price_per_unit', read_only=True)

    class Meta:
        model = StockExit
        fields = '__all__'


class StockExitDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockExit
        fields = '__all__'


class PurchaseItemSerializer(serializers.ModelSerializer):
    unit = serializers.CharField(source='material.unit_of_measurement.name', read_only=True)
    material_name = serializers.CharField(source='material.name', read_only=True)
    material_sap = serializers.CharField(source='material.sap', read_only=True)
    currency_name = serializers.CharField(source='purchase.currency.name', read_only=True)
    class Meta:
        model = PurchaseItems
        fields = '__all__'


class PurchaseSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.display_name', read_only=True)
    currency_name = serializers.CharField(source='currency.name', read_only=True)

    class Meta:
        model = Purchase
        fields = '__all__'


class PurchaseDetailSerializer(serializers.ModelSerializer):
    tax_value = serializers.CharField(source='tax_rate.rate', read_only=True)
    items = PurchaseItemSerializer(read_only=True, many=True, source='items_purchase')
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_total_price')
    supplier_name = serializers.CharField(source='supplier.display_name', read_only=True)
    currency_name = serializers.CharField(source='currency.name', read_only=True)

    class Meta:
        model = Purchase
        fields = '__all__'


class SalesOrderSerializer(serializers.ModelSerializer):
    sku_name = serializers.CharField(source='sku.name', read_only=True)
    customer_name = serializers.CharField(source='customer.display_name', read_only=True)
    process_plant_name = serializers.CharField(source='process_plant.display_name', read_only=True)
    month_name = serializers.SerializerMethodField()

    def get_month_name(self, obj):
        return dict(SalesOrder.MONTH_CHOICES).get(obj.month)

    class Meta:
        model = SalesOrder
        fields = '__all__'


class SalesOrderDetailSerializer(serializers.ModelSerializer):
    sku_name = serializers.CharField(source='sku.name', read_only=True)
    customer_name = serializers.CharField(source='customer.display_name', read_only=True)
    currency_name = serializers.CharField(source='currency.name', read_only=True)
    process_plant_name = serializers.CharField(source='process_plant.display_name', read_only=True)
    recipe = serializers.SerializerMethodField()
    tax_rate_name = serializers.CharField(source='tax_rate.rate', read_only=True)
    planning = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SalesOrder
        fields = '__all__'

    def get_recipe(self, obj):
        return obj.get_recipe()
    
    def get_planning(self, obj):
        return obj.get_planning()


class SalesOrderShortSerializer(serializers.ModelSerializer):
    customer = serializers.CharField(source='customer.display_name', read_only=True)
    sku = serializers.CharField(source='sku.name', read_only=True)
    planning = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SalesOrder
        fields = (
            'id',
            'month',
            'year',
            'customer',
            'full_container_load_name',
            'sku',
            'quantity',
            'raw_material',
            'performance',
            'capacity',
            'planning'
        )

    def get_planning(self, obj):
        return obj.get_planning()


class ProductionPlanningSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductionPlanning
        fields = '__all__'
