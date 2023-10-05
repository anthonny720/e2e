from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.production.models import PineappleConditioning, PineapplePacking, MOD


# Register your models here.


@admin.register(PineappleConditioning)
class PineappleConditioningAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot', 'reject')
    search_fields = ('lot',)
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25

@admin.register(PineapplePacking)
class PineapplePackingAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot', 'process','pt_total','cut')
    search_fields = ('lot',)
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25

@admin.register(MOD)
class MODAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'process', 'pt','product')
    search_fields = ('product',)
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25
