from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.collection.models import Product, Parcel, Provider


# Register your models here.
@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('name','enable')
    search_fields = ('name',)
    ordering = ['name']
    list_per_page = 25


@admin.register(Provider)
class SupplierRMAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('business_name', 'ruc', 'address', 'email', 'phone')
    search_fields = ('display_name',)
    ordering = ['display_name']
    list_per_page = 25


@admin.register(Parcel)
class ParcelAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('parcel', 'provider', 'status')
    search_fields = ('parcel',)
    ordering = ['parcel']
    list_filter = ('provider',)
    list_per_page = 25
