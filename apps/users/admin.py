from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from simple_history.admin import SimpleHistoryAdmin

from apps.users.models import UserAccount


# Register your models here.
@admin.register(UserAccount)
class SamplesAdmin(ImportExportModelAdmin, SimpleHistoryAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'permissions',)
    search_fields = ('first_name', 'email', 'last_name',)
    ordering = ['first_name']
    list_filter = ('role', 'permissions',)
    list_editable = ('role',)
    list_per_page = 25
