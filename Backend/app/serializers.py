from rest_framework import serializers
from .models import CategoryModel, Question, Quizze

class CategorySerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        if CategoryModel.objects.filter(name = attrs["name"]).exists():
            raise serializers.ValidationError("category name already exist")
        return attrs
    id = serializers.IntegerField(read_only = True)
    name = serializers.CharField(max_length = 100)
    class Meta:
        model = CategoryModel
        fields = ["id","name"]

class QuestionSerializer(serializers.ModelSerializer):
    CHOICES = (
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
    )
    A = serializers.CharField()
    B = serializers.CharField()
    C = serializers.CharField()
    D = serializers.CharField()
    answer = serializers.ChoiceField(choices = CHOICES)
    class Meta:
        model = Question
        fields = ["A", "B", "C", "D", "answer"]

class QuizzeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only = True)
    title = serializers.CharField(max_length=250)
    class Meta:
        model = Quizze
        fields = ["id","title"]