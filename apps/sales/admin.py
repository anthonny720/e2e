from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.sales.models import Samples


# Register your models here.
@admin.register(Samples)
class SamplesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = (
    'date', 'code', 'client', 'product', 'packaging_type', 'status', 'net_weight', 'courier', 'courier_account',
    'courier_cost', 'shipping_date', 'tracking', 'estimated_delivery')
    search_fields = ('code', 'tracking', 'client', 'product',)
    ordering = ['-date']
    list_filter = ('status', 'country', 'client',)
    date_hierarchy = 'date'
    list_per_page = 25
