from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

schema_view = get_schema_view(
   openapi.Info(
      title="Quizy App project",
      default_version='v1',
      description="This is the backend APIs for our webstack project",
    #   terms_of_service="",
      contact=openapi.Contact(email="akinolasamson1234@gmail.com"),
      license=openapi.License(name="Quizy App"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('alx/', admin.site.urls),
    path('api/v1/', include('app.urls')),
    path('api/v1/auth/', include('account.urls')),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]

urlpatterns += staticfiles_urlpatterns()