from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.operations_and_planning.models import Material, Product, Recipe, Stock, StockEntry, StockExit, StockReentry, ProductionPlanning


# Register your models here.
class Recipe_Inline(admin.TabularInline):  # O use admin.StackedInline según sus preferencias
    model = Recipe
    extra = 1


@admin.register(Material)
class MaterialAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('sap', 'name', 'group', 'unit_of_measurement', 'price')
    list_filter = ('group',)
    search_fields = ('sap', 'name', 'group', 'unit_of_measurement', 'price')
    ordering = ['name']
    list_per_page = 25


@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name', 'performance', 'capacity')
    search_fields = ('name',)
    ordering = ['name']
    inlines = [Recipe_Inline]
    list_per_page = 25


@admin.register(Recipe)
class RecipeAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('product', 'material', 'quantity',)
    search_fields = ('product', 'material', 'quantity',)
    ordering = ['id']
    list_per_page = 25


@admin.register(Stock)
class StockAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'quantity', 'product')
    search_fields = ('product__name', 'product__sap')
    list_filter = ('date',)
    date_hierarchy = 'date'
    ordering = ['product']
    list_per_page = 25


@admin.register(StockEntry)
class StockEntryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('arrival_date', 'item', 'quantity', 'price_per_unit', 'stock')
    search_fields = ('item',)
    date_hierarchy = 'arrival_date'
    ordering = ['item']
    list_per_page = 25


@admin.register(StockReentry)
class StockEntryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('stock_entry', 'date', 'quantity')
    date_hierarchy = 'date'
    ordering = ['-date']
    list_per_page = 25


@admin.register(StockExit)
class StockExitAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'stock_entry', 'quantity')
    search_fields = ('stock_entry',)
    date_hierarchy = 'date'
    ordering = ['stock_entry']
    list_per_page = 25


@admin.register(ProductionPlanning)
class ProductionPlanningAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'date', 'raw_material', 'performance', 'expected', 'stock_start', 'stock_end', 'process_plant')
    # search_fields = ('sale__sku',)
    date_hierarchy = 'date'
    # ordering = ['sale__date']
    list_per_page = 25
