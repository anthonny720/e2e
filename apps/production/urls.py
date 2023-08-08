from django.urls import path

from apps.production.views import ProcessListView, MODListView, MODDetailView, ProcessUpdateView, \
    PineapplePackingProcessListView, PineapplePackingProcessDetailView

app_name = "production"

urlpatterns = [
    path('mod/<str:category>', MODListView.as_view()),
    path('mod/<str:category>/<int:id>', MODDetailView.as_view()),
    path('process/<str:model_name>', ProcessListView.as_view()),
    path('process/<str:model_name>/<int:id>', ProcessUpdateView.as_view()),
    path('process/packing/Piña', PineapplePackingProcessListView.as_view()),
    path('process/packing/Piña/<int:id>', PineapplePackingProcessDetailView.as_view()),

]
