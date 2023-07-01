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
from drf_yasg.utils import swagger_auto_schema
# Create your views here.

@swagger_auto_schema(method= "GET",
operation_description="Test Endpoint for pinging", responses={200: 'ping'})
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
            return Response(data= {"detail": "Incomplete data"}, status= status.HTTP_400_BAD_REQUEST)
        if not check(email):
            return Response(data= {"detail": "Invalid Email format"}, status= status.HTTP_400_BAD_REQUEST)
        return Response(data= {"detail": "Sent"}, status= status.HTTP_200_OK)




class QuizzesView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = QuizzeSerializer
    def get(self, request):
        id = request.GET.get("id")
        quiz = get_object_or_404(Quizze, pk = id)
        quizzes = Quizze.objects.all()
        serializer = self.serializer_class(quizzes, many =True)
        return Response(data= serializer.data, status = status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data = data)
        if serializer.is_valid():
            serializer.save(owner = request.user)
            return Response(data=serializer.data, status =status.HTTP_201_CREATED)
        return Response(data= serializer.errors, status= status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        id = request.GET.get("id")
        quiz = get_object_or_404(Quizze, pk = id)
        data = request.data
        if request.user != quiz.owner:
            return Response({"detail": "UnAuthorized user"}, status= status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data = data, instance = quiz, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status =status.HTTP_200_OK)
        return Response(data= serializer.errors, status= status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        id = request.GET.get("id")
        quiz = get_object_or_404(Quizze, pk = id)
        data = request.data
        if request.user != quiz.owner:
            return Response({"detail": "UnAuthorized user"}, status= status.HTTP_400_BAD_REQUEST)
        quiz.delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
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
        name = data.get("name")
        if name:
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
        name = data.get("name")
        if name:
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
