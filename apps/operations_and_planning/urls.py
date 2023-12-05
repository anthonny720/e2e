from django.urls import path

from apps.operations_and_planning.views import ListRecordsView, ListMaterialView, ListProductView, DetailProductView, ListStockView, ListStockEntryView, ListStockExitView, ListStockReEntryView, ListPlanningProductionView, ListProductionPlanningView, DetailProductionPlanningView, CalendarScheduleManufacturingView

app_name = "operations_and_planning"

urlpatterns = [path('materials', ListMaterialView.as_view()), path('products', ListProductView.as_view()),
               path('stock', ListStockView.as_view()), path('stock/entry', ListStockEntryView.as_view()),
               path('stock/reentry', ListStockReEntryView.as_view()), path('stock/output', ListStockExitView.as_view()),
               path('manufacturing', ListProductionPlanningView.as_view()),
               path('manufacturing/<int:id>', DetailProductionPlanningView.as_view()),
               path('manufacturing/sales', ListPlanningProductionView.as_view()),
               path('manufacturing/calendar', CalendarScheduleManufacturingView.as_view()),
               path('products/<int:id>', DetailProductView.as_view()),
               path('records/<str:category>', ListRecordsView.as_view()),
               ]
