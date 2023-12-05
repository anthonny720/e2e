from django.urls import path

from .views import AnalysisListView, AnalysisDetailView

app_name = 'quality_assurance'

urlpatterns = [
    path('<str:model_name>', AnalysisListView.as_view(), name='analysis_list'),
    path('<str:model_name>/<int:pk>', AnalysisDetailView.as_view(), name='analysis_detail'),

]
