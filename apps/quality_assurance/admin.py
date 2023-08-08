from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

# Register your models here.
from apps.quality_assurance.models import (Pineapple, Mango, Banano, Goldenberry,
                                           Blueberry, )


@admin.register(Pineapple)
class PineappleAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__business_name',)
    list_per_page = 20


@admin.register(Mango)
class MangoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__business_name',)
    list_per_page = 20


@admin.register(Banano)
class BananoAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__business_name',)
    list_per_page = 20


@admin.register(Goldenberry)
class GoldenberryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__business_name',)
    list_per_page = 20


@admin.register(Blueberry)
class BlueberryAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('lot',)
    search_fields = ('lot__lot',)
    list_filter = ('lot__provider__business_name',)
    list_per_page = 20


