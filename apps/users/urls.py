from django.urls import path

from .views import UserDeleteAPIView, UpdateUserAPIView

app_name = "users"
urlpatterns = [
    path('<int:id>/delete', UserDeleteAPIView.as_view(), name='user_delete'),
    path('<int:id>/update', UpdateUserAPIView.as_view(), name='user_update'),
]
