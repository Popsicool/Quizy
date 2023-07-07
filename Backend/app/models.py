from django.db import models
from account.models import UserData
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext as _

class CategoryModel(models.Model):
    name = models.CharField(max_length = 50, null = True, blank=True, unique= True)
    def __str__(self):
        return self.name

class Question(models.Model):
    CHOICES = (
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
    )
    quiz = models.ForeignKey("app.Quizze", on_delete = models.CASCADE)
    question = models.TextField()
    A = models.TextField()
    B = models.TextField()
    C = models.TextField()
    D = models.TextField()
    answer = models.CharField(max_length=1, choices = CHOICES)

class Quizze(models.Model):
    owner = models.ForeignKey(UserData, on_delete= models.CASCADE)
    title = models.CharField(max_length=250)
    category = models.ManyToManyField(CategoryModel)
    participants = models.IntegerField(default = 0)
    created = models.DateTimeField(_("Created"), auto_now_add=True)
    def __str__(self):
        return f"{self.title} by {self.owner.username}"
    @property
    def questions(self):
        return self.question_set.all()
class History(models.Model):
    quiz = models.ForeignKey(Quizze, on_delete = models.SET_NULL, null=True)
    grade = models.IntegerField()
    date = models.DateTimeField(_("Date"), auto_now_add=True)
    user = models.ForeignKey(UserData, on_delete = models.CASCADE)

# class History(models.Model):
#     quizzes = models.ManyToManyField(Grades)
#     def __str__(self):
#         return f"{self.user.username}'s History"


# @receiver(post_save, sender=UserData)
# def user_post_save_receiver(sender, instance, created, *args, **kwargs):
#     """
#     after save
#     """
#     if created:
#         history = History.objects.create(user = instance)
#         history.save()
#         instance.save()
