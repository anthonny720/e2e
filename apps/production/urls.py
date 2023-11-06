from django.urls import path
from .views import PineappleConditioningListView, PineapplePackingListView, MODListView, OvenListView

app_name = "production"

urlpatterns = [
    path('pineapple_conditioning/', PineappleConditioningListView.as_view(), name='pineapple_conditioning'),
    path('pineapple_packing/', PineapplePackingListView.as_view(), name='pineapple_packing'),
    path('mod/', MODListView.as_view(), name='mod'),
    path('ovens/', OvenListView.as_view(), name='oven'),
]
