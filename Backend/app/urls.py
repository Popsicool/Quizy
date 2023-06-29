from django.urls import path
from . import views

urlpatterns = [
    path("", views.ping, name = "ping"),
    path("/contact", views.ContactMessage.as_view(), name = "contact"),
]
