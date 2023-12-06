from django.urls import path

from apps.commercial.views import ListSalesProgressView, DetailSalesOrderView

app_name = "commercial"

urlpatterns = [

    path('sales', ListSalesProgressView.as_view()), path('sales/<str:slug>', DetailSalesOrderView.as_view()),

]
