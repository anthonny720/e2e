from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.commercial.models import Proforma, SKU_PFI, DispatchInfo, Invoice, SalesProgress


class SKU_PFIInline(admin.TabularInline):  # O use admin.StackedInline según sus preferencias
    model = SKU_PFI
    extra = 1
# Register your models here.
@admin.register(Proforma)
class ProformaAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('kam', 'commercial_status', 'commercial_dispatch_date', 'po_number', 'pfi_number', 'client',)
    search_fields = ('po_number', 'pfi_number', 'sku_pfi__sku__nombre')
    ordering = ['-created_at']
    date_hierarchy = 'created_at'
    list_filter = ('kam', 'market', 'region',)
    inlines = [SKU_PFIInline]  # Usa SKU_PFIInline para mostrar los SKUs
    list_per_page = 25


@admin.register(SKU_PFI)
class SKU_PFIAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('proforma', 'sku', 'kg', 'price',)
    search_fields = ('proforma__pfi_number',)
    ordering = ['sku']
    list_per_page = 25


@admin.register(DispatchInfo)
class DispatchInfoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('load_date', 'ship', 'etd', 'eta','booking')
    search_fields = ('booking',)
    ordering = ['-load_date']
    date_hierarchy = 'load_date'
    list_per_page = 25

@admin.register(Invoice)
class InvoiceAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('invoice_number', 'invoice_date', 'proforma', 'pfi_number','due_date')
    search_fields = ('invoice_number','pfi_number')
    ordering = ['-invoice_date']
    date_hierarchy = 'invoice_date'
    list_per_page = 25

@admin.register(SalesProgress)
class SalesProgressAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('sku', 'commercial_status', 'client_name', 'kg','price_total','date')
    search_fields = ('sku','fcl_name','client_name')
    list_filter = ('commercial_status','fcl_name','client_name')
    ordering = ['-date']
    date_hierarchy = 'date'
    list_per_page = 25