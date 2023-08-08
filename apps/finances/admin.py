from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.finances.models import CostFixed, ReportCost


@admin.register(CostFixed)
class CostFixedAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date','water','rent','consumables','depreciation','electricity','internet','indirect_labor','maintenance','laboratory','supplementary')
    ordering = ['-date']
    list_per_page = 25
    date_hierarchy = 'date'

@admin.register(ReportCost)
class ReportCostAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date',)
    ordering = ['-date']
    list_per_page = 25
    date_hierarchy = 'date'