from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.logistic.models import Lot, Pallets, Boxes, Motions, ILot, Output, RegisterOutput


# Register your models here.

@admin.register(Lot)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot', 'closed', 'maquila', 'product', 'provider', 'discount')
    filter_horizontal = ('parcel',)
    search_fields = ('lot',)
    list_editable = ('closed',)
    list_display_links = ('lot',)
    ordering = ['-entry_date']
    date_hierarchy = 'entry_date'
    list_filter = ('maquila', 'product', 'provider', 'closed')
    list_per_page = 25


@admin.register(ILot)
class ILotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('number', 'weight', 'tare',  'lot', 'location',)
    list_filter = ('lot__product', 'lot__provider', 'lot__maquila',)
    search_fields = ('number', 'lot__lot',)
    ordering = ['lot__date_entry']

    list_per_page = 25


@admin.register(Pallets)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'weight')
    list_per_page = 25


@admin.register(Boxes)
class LotAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'weight')
    list_per_page = 25


@admin.register(Motions)
class MotionsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'description')
    date_hierarchy = 'date'
    ordering = ['-date']
    list_per_page = 31


@admin.register(Output)
class OutputAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'lot', 'kg', 'destine')
    date_hierarchy = 'date'
    ordering = ['-date']
    list_per_page = 30


@admin.register(RegisterOutput)
class RegisterOutputAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'item', 'kg', 'net_weight')
    date_hierarchy = 'date'
    ordering = ['-date']
    list_per_page = 30
