from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from core import settings

urlpatterns = [path('admin/', admin.site.urls),
               path('api/collection/', include('apps.collection.urls'), name='collection'),
               path('api/logistic/', include('apps.logistic.urls'), name='logistic'),
               path('api/management/', include('apps.management.urls'), name='management'),
               path('api/operations/', include('apps.operations_and_planning.urls'), name='operations'),
               path('api/production/', include('apps.production.urls'), name='production'),
               path('api/quality_assurance/', include('apps.quality_assurance.urls'), name='quality'),
               path('api/sales/', include('apps.sales.urls'), name='sales'),
               path('api/finances/', include('apps.finances.urls'), name='finance'),
               path('api/users/', include('apps.users.urls'), name='users'), path('auth/', include('djoser.urls')),
               path('auth/', include('djoser.urls.jwt')), ]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
