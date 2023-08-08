from django.urls import path

from apps.finances.views import ListCostView

app_name = "finance"

urlpatterns = [
    path('costs', ListCostView.as_view(), ),

]
