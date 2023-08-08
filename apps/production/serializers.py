from rest_framework import serializers

from apps.production.models import ProcessPineapple, MOD, BaseProcess, BasePackingProcess, PackingProcessPineapple


class BaseProcessSerializer(serializers.ModelSerializer):
    kg_logistic = serializers.CharField(source='get_stock_logistic', read_only=True)
    lot = serializers.CharField(source='get_lot', read_only=True)
    date_clean = serializers.CharField(source='get_date', read_only=True)
    supplier = serializers.CharField(source='get_provider', read_only=True)

    class Meta:
        model = BaseProcess
        fields = '__all__'


class ProcessPineappleSerializer(BaseProcessSerializer):
    percent_rejection = serializers.CharField(source='get_percent_rejection', read_only=True)
    processed_kg = serializers.CharField(source='get_processed_kg', read_only=True)
    percent_crown = serializers.CharField(source='get_percent_crown', read_only=True)
    percent_shell_trunk = serializers.CharField(source='get_percent_shell_trunk', read_only=True)
    percent_pulp = serializers.CharField(source='get_percent_pulp', read_only=True)
    kg_enabled = serializers.CharField(source='get_kg_enabled', read_only=True)
    percent_enabled = serializers.CharField(source='get_percent_enabled', read_only=True)

    class Meta:
        model = ProcessPineapple
        fields = '__all__'


class BasePackingProcessSerializer(serializers.ModelSerializer):
    cut_name = serializers.CharField(source='cut.name', read_only=True)
    client_name = serializers.CharField(source='client.display_name', read_only=True)
    boxes_name = serializers.CharField(source='boxes.name', read_only=True)
    bags_name = serializers.CharField(source='bags.name', read_only=True)
    kg_net = serializers.CharField(source='get_total_kg_net', read_only=True)
    kg_processed = serializers.CharField(source='get_kg_processed', read_only=True)
    performance = serializers.CharField(source='get_performance', read_only=True)
    lot_name = serializers.CharField(source='lot.get_lot', read_only=True)
    supplier_name = serializers.CharField(source='lot.get_provider', read_only=True)
    mod_day = serializers.ListField(source='get_mod_day', read_only=True)
    lot_id = serializers.CharField(source='lot.get_lot_id', read_only=True)


    class Meta:
        model = BasePackingProcess
        fields = '__all__'


class PackingProcessPineappleSerializer(BasePackingProcessSerializer):
    class Meta:
        model = PackingProcessPineapple
        fields = '__all__'


class MODSerializer(serializers.ModelSerializer):
    total_kg = serializers.CharField(source='get_total_kg', read_only=True)
    total_process_kg = serializers.CharField(source='get_total_process_kg', read_only=True)
    cmo_conditioning = serializers.CharField(source='get_cmo_conditioning', read_only=True)
    cmo_conditioning_night = serializers.CharField(source='get_cmo_conditioning_night', read_only=True)
    cmo_conditioning_25 = serializers.CharField(source='get_cmo_conditioning_25', read_only=True)
    cmo_conditioning_35 = serializers.CharField(source='get_cmo_conditioning_35', read_only=True)
    total_hours_conditioning = serializers.CharField(source='get_total_hours_conditioning', read_only=True)
    total_cost_conditioning = serializers.CharField(source='get_total_cost_conditioning', read_only=True)
    cmo_kg_conditioning = serializers.CharField(source='get_cmo_kg_conditioning', read_only=True)
    productivity_conditioning = serializers.CharField(source='get_productivity_conditioning', read_only=True)
    cmo_packing_day = serializers.CharField(source='get_cmo_packing_day', read_only=True)
    cmo_packing_night = serializers.CharField(source='get_cmo_packing_night', read_only=True)
    cmo_packing_25 = serializers.CharField(source='get_cmo_packing_25', read_only=True)
    cmo_packing_35 = serializers.CharField(source='get_cmo_packing_35', read_only=True)
    total_hours_packing = serializers.CharField(source='get_total_hours_packing', read_only=True)
    total_cost_packing = serializers.CharField(source='get_total_cost_packing', read_only=True)
    cmo_kg_packing = serializers.CharField(source='get_cmo_kg_packing', read_only=True)
    productivity_packing = serializers.CharField(source='get_productivity_packing', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)

    class Meta:
        model = MOD
        fields = '__all__'
