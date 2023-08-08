from django.urls import path

from apps.operations_and_planning.views import ListRecordsView, ListMaterialView, ListProductView, \
    DetailProductView, DetailMaterialView, ListRecipeView, DetailRecipeView, ListStockView, ListStockEntryView, \
    ListStockExitView, ListPurchasesView, ListStockAvailableView, DetailPurchaseView, ListPurchaseItemView, \
    DetailPurchaseItemView, UpdateTransferStockReceivedView, ListSalesOrderView, DetailSalesOrderView, \
    SalesPlanningView, DetailProductionPlanningView, ListProductionPlanningView, CalendarScheduleManufacturingView, \
    ListStockReEntryView

app_name = "operations_and_planning"

urlpatterns = [
    path('materials', ListMaterialView.as_view()),
    path('products', ListProductView.as_view()),
    path('recipe', ListRecipeView.as_view()),
    path('stock', ListStockView.as_view()),
    path('stock/transfer', UpdateTransferStockReceivedView.as_view()),
    path('stock/entry', ListStockEntryView.as_view()),
    path('stock/reentry', ListStockReEntryView.as_view()),
    path('stock/output', ListStockExitView.as_view()),
    path('stock/available', ListStockAvailableView.as_view()),
    path('manufacturing', ListProductionPlanningView.as_view()),
    path('manufacturing/<int:id>', DetailProductionPlanningView.as_view()),
    path('manufacturing/sales', SalesPlanningView.as_view()),
    path('manufacturing/calendar', CalendarScheduleManufacturingView.as_view()),

    path('sales', ListSalesOrderView.as_view()),
    path('sales/<str:id>', DetailSalesOrderView.as_view()),
    path('purchases', ListPurchasesView.as_view()),
    path('purchases/items', ListPurchaseItemView.as_view()),

    path('purchases/items/<int:id>', DetailPurchaseItemView.as_view()),
    path('purchases/<int:id>', DetailPurchaseView.as_view()),
    path('recipe/<int:id>', DetailRecipeView.as_view()),
    path('materials/<int:id>', DetailMaterialView.as_view()),
    path('products/<int:id>', DetailProductView.as_view()),

    path('records/<str:category>', ListRecordsView.as_view()),

]
