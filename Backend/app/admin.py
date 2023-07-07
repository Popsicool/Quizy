
from django.contrib import admin
from .models import CategoryModel, Question, Quizze, History

admin.site.register(CategoryModel)
admin.site.register(Question)
admin.site.register(Quizze)
admin.site.register(History)
