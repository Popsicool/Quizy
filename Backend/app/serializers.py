from rest_framework import serializers
from .models import CategoryModel, Question, Quizze
from django.shortcuts import get_object_or_404
from .models import History

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

class CatExists(serializers.ModelSerializer):
    def validate(self, attrs):
        if not CategoryModel.objects.filter(name = attrs["name"]).exists():
            raise serializers.ValidationError("category does not exist")
        return attrs
    name = serializers.CharField(max_length = 100)
    class Meta:
        model = CategoryModel
        fields = ["name"]



class QuestionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only = True)
    CHOICES = (
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
    )
    question = serializers.CharField()
    A = serializers.CharField()
    B = serializers.CharField()
    C = serializers.CharField()
    D = serializers.CharField()
    answer = serializers.ChoiceField(choices = CHOICES)
    class Meta:
        model = Question
        fields = ["id","A", "B", "C", "D", "answer", "question"]

class QuizzeSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    category = CatExists(many=True)
    id = serializers.IntegerField(read_only = True)
    participants = serializers.IntegerField(read_only = True)
    title = serializers.CharField(max_length=250)
    class Meta:
        model = Quizze
        fields = ["id","title", "questions", "category", "participants"]
    def create(self, validated_data):
        questions = validated_data.pop("questions")
        category = validated_data.pop("category")
        quiz = Quizze.objects.create(**validated_data)
        for q in questions:
            Question.objects.create(**q, quiz = quiz)
        for c in category:
            quiz.category.add(CategoryModel.objects.get(name=c.get("name")))
        return quiz
    def update(self, instance, validated_data):
        questions = validated_data.pop("questions")
        category = validated_data.pop("category")
        instance.title = validated_data.get("title", instance.title)
        instance.save()
        keep_cat = []
        existing_ids = [q.id for q in instance.questions]
        for q in questions:
            if "id" in q.keys():
                if Question.objects.filter(id=q["id"]).exists():
                    c  = Question.objects.get(id = q["id"])
                    c.A = q.get("A", c.A)
                    c.B = q.get("B", c.B)
                    c.C = q.get("C", c.C)
                    c.D = q.get("D", c.D)
                    c.question = q.get("question", c.question)
                    c.answer = q.get("answer", c.answer)
                    c.save()
                    keep_cat.append(c.id)
                else:
                    continue
            else:
                c = Question.objects.create(**q, quiz=instance)
                keep_cat.append(c.id)
        for quest in instance.questions:
            if quest.id not in keep_cat:
                quest.delete()
        return instance

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ["quiz","grade", "date"]