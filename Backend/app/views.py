from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
import json
import re
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .serializers import CategorySerializer, QuizzeSerializer
from .models import CategoryModel, Quizze, Question, History
# Create your views here.

@api_view(["GET"])
def ping(request):
    message = {"reply": "ping"}
    return Response(message)


regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

def check(email):
    if(re.fullmatch(regex, email)):
        return True
    return False

class ContactMessage(APIView):
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        message = request.data.get("message")
        if not name or not email or not message:
            return Response(data= {"message": "Incomplete data"}, status= status.HTTP_400_BAD_REQUEST)
        if not check(email):
            return Response(data= {"message": "Invalid Email format"}, status= status.HTTP_400_BAD_REQUEST)
        return Response(data= {"message": "Sent"}, status= status.HTTP_200_OK)




class QuizzesView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = QuizzeSerializer
    def get(self, request):
        id = request.GET.get("id")
        quiz = get_object_or_404(Quizze, pk = id)
        # all_quizzes = Quizze.objects.all()
        return Response(data= quiz, status = status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        if validate:= QuizzesView.check_valid(data):
            return Response({"message": validate}, status= status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data = data)
        if serializer.is_valid():
            questions = data.get("questions")
            for q in questions:
                quest = Question.objects.create(question = q.get("question"),
                A = q.get("A"), B = q.get("B"), C = q.get("C"), D = q.get("D"), answer = q.get("answer"))
                quest.save()
                serializer.questions.add(quest)
            serializer.save(owner = request.user)

            return Response(data=serializer.data, status = status.HTTP_201_CREATED)
        return Response(data= serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    # def add_more()
    def check_valid(data):
        if not data.get("title"):return "No title"
        if not data.get("category"):return "No category"
        if not data.get("questions"):return "No questions"
        if not isinstance(data.get("questions"), list):return "Questions not a list"
        if not isinstance(data.get("category"), list):return "Category not a list"
        questions = data.get("questions")
        cat = CategoryModel.objects.all()
        categories = [c.name for c in cat]

        for c in data.get("category"):
            if c not in categories:
                return "Category not found"
        for i in questions:
            if not i.get("question") or not i.get("A") or not i.get(
                "B") or not i.get("C") or not i.get(
                    "D") or not i.get("answer"): return "Invalid Option"
            if i.get("answer") not in ["A", "B", "C", "D"]:
                return "Invalid Answer"
        return False
class CategoryView(generics.GenericAPIView):
    serializer_class = CategorySerializer
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    queryset = CategoryModel.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        categories = CategoryModel.objects.all()
        serializer = self.serializer_class(categories, many =True)
        return Response(data= serializer.data, status =status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        if name := data.get("name"):
            data["name"] = name.capitalize()
        serializer = self.serializer_class(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status =status.HTTP_201_CREATED)
        return Response(data= serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        id = request.GET.get("id")
        categories = get_object_or_404(CategoryModel, pk = id)
        data = request.data
        if name := data.get("name"):
            data[name] = name.capitalize()
        serializer = self.serializer_class(data = data, instance = categories, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status =status.HTTP_200_OK)
        return Response(data= serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        id = request.GET.get("id")
        categories = get_object_or_404(CategoryModel, pk = id)
        categories.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
