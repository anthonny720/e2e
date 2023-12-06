from django.urls import path

from apps.management.views import (ListCustomerView, ListSuppliersView, ListOutsourcingView, ListTransportView,
                                   ListStorageAreaView, ListLocationView, ListCostProductionView,
                                   ListUnitOfMeasurementView, ListCategoriesView, DetailCustomerView,
                                   DetailSuppliersView, DetailOutsourcingView, DetailTransportView,
                                   DetailSupplierRMView, ListSuppliersRMView)

app_name = "management"
urlpatterns = [
    path('customers', ListCustomerView.as_view()),
    path('suppliers', ListSuppliersView.as_view()),
    path('outsourcings', ListOutsourcingView.as_view()),
    path('transports', ListTransportView.as_view()),
    path('suppliers_rm', ListSuppliersRMView.as_view()),
    path('storage-areas', ListStorageAreaView.as_view()),
    path('locations', ListLocationView.as_view()),
    path('costs', ListCostProductionView.as_view()),
    path('units', ListUnitOfMeasurementView.as_view()),
    path('categories', ListCategoriesView.as_view()),
    path('customers/<str:slug>', DetailCustomerView.as_view()),
    path('suppliers/<str:slug>', DetailSuppliersView.as_view()),
    path('outsourcings/<str:slug>', DetailOutsourcingView.as_view()),
    path('transports/<str:slug>', DetailTransportView.as_view()),
    path('suppliers_rm/<str:slug>', DetailSupplierRMView.as_view())]
