from rest_framework import serializers

from apps.commercial.models import SalesProgress


class SalesProgressSerializer(serializers.ModelSerializer):
    recipe = serializers.SerializerMethodField()

    class Meta:
        model = SalesProgress
        fields = '__all__'

    def get_recipe(self, obj):
        return obj.get_recipe()


class SalesOrderShortSerializer(serializers.ModelSerializer):
    planning = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SalesProgress
        fields = ('id', 'client_name', 'fcl_name', 'sku', 'kg', 'mp', 'planning')

    def get_planning(self, obj):
        return obj.get_planning()
