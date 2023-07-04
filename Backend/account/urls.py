from django.urls import path
from . import views

urlpatterns = [
    path("sign_up", views.UserCreateView.as_view(), name="sign_up"),
    path('change_password', views.ChangePasswordView.as_view(),
         name='change-password'),
    path('user/<int:id>', views.UserProfileView.as_view(), name='user-profile'),
]
