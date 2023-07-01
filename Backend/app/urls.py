from django.urls import path
from . import views

urlpatterns = [
    path("", views.ping, name = "ping"),
    path("contact", views.ContactMessage.as_view(), name = "contact"),
    path("category", views.CategoryView.as_view(), name = "category"),
    path("quiz", views.QuizzesView.as_view(), name= "quiz"),
    path("submit", views.SubmitView.as_view(), name= "submit")
]
