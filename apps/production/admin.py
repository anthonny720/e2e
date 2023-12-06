from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.production.models import PineappleConditioning, PineapplePacking, MOD, Ovens


# Register your models here.


@admin.register(PineappleConditioning)
class PineappleConditioningAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot', 'kg_procesados', 'kg_habilitados')
    search_fields = ('lot',)
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25


@admin.register(PineapplePacking)
class PineapplePackingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot', 'process', 'pt_total', 'cut', 'rendimiento')
    search_fields = ('lot',)
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25


@admin.register(MOD)
class MODAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'conditioning', 'cmo_packing', 'cmo_rest')
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25


@admin.register(Ovens)
class OvenAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'oven', 'product', 'lot')
    search_fields = ('product', 'lot')
    ordering = ['-date']
    list_filter = ('oven', 'product',)
    date_hierarchy = 'date'
    list_per_page = 25
