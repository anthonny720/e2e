from django.urls import path

from .views import ListCreateLotView, DetailLotView, ListCreateILotView, ListCreateMotionsView, DeleteMotionView, \
    ListPalletsView, UpdateILotView, ListLotStockView, ListCreateOutputView, DeleteOutputView, AddOutputItemsView, \
    ListOutputItemsView

app_name = 'logistic'

urlpatterns = [
    path('lots', ListCreateLotView.as_view(), name='list-create-lot'),
    path('lots/<str:lot>', DetailLotView.as_view(), name='detail-lot'),
    path('lots/<str:lot>/data', ListCreateILotView.as_view(), name='list-create-data-lot'),
    path('lots/<str:lot>/data/<int:pk>', UpdateILotView.as_view(), name='update-data-lot'),
    path('motion', ListCreateMotionsView.as_view(), name='motion-list-create'),
    path('motion/<int:pk>', DeleteMotionView.as_view(), name='motion-delete-delete'),
    path('pallets', ListPalletsView.as_view(), name='list-pallets'),
    path('stock', ListLotStockView.as_view(), name='list-stock'),
    path('output', ListCreateOutputView.as_view(), name='list-create-output'),
    path('output/<int:pk>', DeleteOutputView.as_view(), name='delete-output'),
    path('output-items', AddOutputItemsView.as_view(), name='list-output-items'),
    path('output-items/<str:lot>', ListOutputItemsView.as_view(), name='create-output-items'),

]
