from rest_framework import serializers

from apps.finances.models import ReportCost


class ReportCostSerializer(serializers.ModelSerializer):
    lot_name = serializers.CharField(source='lot.lot',read_only=True)
    fcl_name = serializers.CharField(source='get_fcl_name',read_only=True)
    sku_name = serializers.CharField(source='sku.name',read_only=True)
    customer_name = serializers.CharField(source='customer.display_name',read_only=True)
    cut_name = serializers.CharField(source='cut.name',read_only=True)
    raw_material = serializers.CharField(source='lot.product.name',read_only=True)
    variety = serializers.CharField(source='lot.variety',read_only=True)
    condition = serializers.CharField(source='lot.condition',read_only=True)
    class Meta:
        model = ReportCost
        fields = '__all__'
