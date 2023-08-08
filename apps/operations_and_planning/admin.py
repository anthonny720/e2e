from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.operations_and_planning.models import Material, Product, Recipe, Stock, StockEntry, StockExit, \
    Purchase, PurchaseItems, SalesOrder, ProductionPlanning, StockReEntry


# Register your models here.



@admin.register(Material)
class MaterialAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'sap', 'name','group','unit_of_measurement','price')
    list_filter = ('group',)
    search_fields = ( 'sap', 'name','group','unit_of_measurement','price')
    ordering = ['name']
    list_per_page = 25

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'name','performance','capacity')
    list_filter = ('group','raw_material','condition','family','subfamily','cut','packing')
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25

@admin.register(Recipe)
class RecipeAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('product', 'material', 'quantity',)
    search_fields = ('product', 'material', 'quantity',)
    ordering = ['id']
    list_per_page = 25
    

@admin.register(Stock)
class StockAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'date', 'quantity','product')
    search_fields = ( 'product__name','product__sap')
    list_filter = ('date',)
    date_hierarchy = 'date'
    ordering = ['product']
    list_per_page = 25

@admin.register(StockEntry)
class StockEntryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('date', 'purchase_item', 'quantity','price_per_unit','stock')
    search_fields = ( 'purchase_item',)
    date_hierarchy = 'date'
    ordering = ['purchase_item']
    list_per_page = 25
@admin.register(StockReEntry)
class StockEntryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('stock_entry', 'date', 'quantity')
    date_hierarchy = 'date'
    ordering = ['-date']
    list_per_page = 25
    
@admin.register(StockExit)
class StockExitAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'date','stock_entry', 'quantity')
    search_fields = ( 'stock_entry',)
    date_hierarchy = 'date'
    ordering = ['stock_entry']
    list_per_page = 25

@admin.register(Purchase)
class PurchaseAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'supplier','order_id', 'invoice_id','arrival_date','tax_rate','status')
    search_fields = ( 'supplier','status')
    date_hierarchy = 'order_date'
    ordering = ['-order_id']
    list_per_page = 25




@admin.register(PurchaseItems)
class PurchaseItemsAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'purchase','material', 'quantity','price_per_unit','total_price')
    search_fields = ( 'purchase','material')
    ordering = ['-id']
    list_per_page = 25

@admin.register(SalesOrder)
class SalesOrderAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'order_id','quote_id', 'full_container_load_name','sku','quantity','management','delivery')
    search_fields = ( 'sku','customer__display_name','order_id','quote_id')

    ordering = ['-id']
    list_per_page = 25

@admin.register(ProductionPlanning)
class ProductionPlanningAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ( 'sale','date', 'raw_material','expected')
    search_fields = ( 'sale','date','raw_material','expected')

    ordering = ['-id']
    list_per_page = 25