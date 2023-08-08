from django.urls import path

from apps.sales import views

app_name = 'sales'
urlpatterns = [
    path('samples', views.ListSamplesView.as_view(), name='samples'),
    path('calendar', views.ListDatePendingView.as_view(), name='pending-calendar'),
    path('samples/create', views.CreateSampleView.as_view(), name='create-sample'),
    path('samples/update/<int:pk>', views.UpdateSampleView.as_view(), name='update-sample'),
]
