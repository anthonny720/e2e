from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.production.models import ProcessPineapple, MOD, PackingProcessPineapple


# Register your models here.

@admin.register(ProcessPineapple)
class ProcessPineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('stock',)
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25

@admin.register(PackingProcessPineapple)
class PackingProcessPineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25


@admin.register(MOD)
class MODAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('get_total_cost_conditioning',
                    'get_cmo_kg_conditioning',
                    'get_productivity_conditioning',
                    'get_total_cost_packing',
                    'get_cmo_kg_packing',
                    'get_productivity_packing',)
    list_per_page = 25
