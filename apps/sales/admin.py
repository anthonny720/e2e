from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.sales.models import Samples


# Register your models here.
@admin.register(Samples)
class SamplesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'delivery_date', 'code', 'client', 'status',)
    search_fields = ('code',)
    ordering = ['code']
    list_filter = ('status',)
    date_hierarchy = 'date'
    list_per_page = 25
