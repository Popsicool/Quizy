from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
import json
import re
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .serializers import CategorySerializer, QuizzeSerializer, HistorySerializer, GetQuizSerializer
from .models import CategoryModel, Quizze, Question, History
from drf_yasg.utils import swagger_auto_schema
# Create your views here.


@swagger_auto_schema(method="GET",
                     operation_description="Test Endpoint for pinging", responses={200: 'ping'})
@api_view(["GET"])
def ping(request):
    message = {"reply": "ping"}
    return Response(message)


regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'


def check(email):
    if (re.fullmatch(regex, email)):
        return True
    return False


class ContactMessage(APIView):
    """ A class view for messaging devs """
    parser_classes = [FormParser, MultiPartParser, JSONParser]

    def post(self, request):
        """ 
            Post request for sending data for Devs
            - Authentication not required
            - Data = {
                'name': 'ViewTester',
                'email': 'viewTester@alx.com',
                'message': 'Test Message'
            }
            - Response = {'detail': 'Sent'}
        """
        name = request.data.get("name")
        email = request.data.get("email")
        message = request.data.get("message")
        if not name or not email or not message:
            return Response(data={"detail": "Incomplete data"}, status=status.HTTP_400_BAD_REQUEST)
        if not check(email):
            return Response(data={"detail": "Invalid Email format"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={"detail": "Sent"}, status=status.HTTP_200_OK)


class QuizzesView(APIView):
    """ A QuizzesView for handling various Quiz related methods """
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = QuizzeSerializer

    def get(self, request):
        """ 
            GET request getting a quiz based on its Id
            - Authentication required
            - data = {'id': <int>}
            - Response = {'id': quiz.id,
                          'title': quiz.title,
                          'questions': list of questions,
                          'category': list of category,
                          'participants': 0}
        """
        id = request.GET.get("id")
        quiz = get_object_or_404(Quizze, pk=id)
        # quizzes = Quizze.objects.all()
        serializer = self.serializer_class(quiz)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """ 
            POST request for creating quiz
            - Authentication required
            - Data = {
                    'title': 'Quiz title',  # NotNULL
                    'category': list of Category object, # NotNULL
                    'questions': list of Questions object,
                }
            - Response = {
                          'id': quiz.id,
                          'title': quiz.title,
                          'questions': list of New Questions object,
                          'category': list of Category object,
                          'participants': 0
                        }
        """
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        """ 
            PUT request for updating a quiz
            - Authentication required
            - can update title, Quiz or Category
            - Data = {
                    'title': 'Quiz title',  # NotNULL
                    'category': list of Category object, # NotNULL
                    'questions': list of New Questions object,
                }
            - Response = {
                          'id': quiz.id,
                          'title': quiz.title,
                          'questions': list of New Questions object,
                          'category': list of Category object,
                          'participants': 0
                        }
        """
        id = request.GET.get("id")
        quiz = get_object_or_404(Quizze, pk=id)
        data = request.data
        if request.user != quiz.owner:
            return Response({"detail": "UnAuthorized user"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(
            data=data, instance=quiz, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
            DELETE request for Deleteing a quiz
            - Authentication required
            - Query params id=quiz.id
        """
        id = request.GET.get("id")
        quiz = get_object_or_404(Quizze, pk=id)
        data = request.data
        if request.user != quiz.owner:
            return Response({"detail": "UnAuthorized user"}, status=status.HTTP_400_BAD_REQUEST)
        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategoryView(generics.GenericAPIView):
    """ A CategoryView for handling various Category related methods """
    serializer_class = CategorySerializer
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    queryset = CategoryModel.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        """ 
            GET request getting a category
            - Authentication required
            - Query Params = {'id': <int>}
            - Response = {'id': category.id,
                          'name': category.name
                        }
            - if no id is given it returns list of Category objects
        """
        categories = CategoryModel.objects.all()
        serializer = self.serializer_class(categories, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
            POST request for creating a category
            - Authentication required
            - Data = {
                    'name': 'name of Category', # NotNULl
                }
            - Response = {
                          'id': category.id,
                          'name': 'name of category'
                        }
        """
        data = request.data
        name = data.get("name")
        if name:
            data["name"] = name.capitalize()
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        """ 
            PUT request for updating a Category
            - Authentication required
            - can update name
            - Requires a Query Params
            - Data = {
                        'name': 'new category name'
                    }
            - Response = {
                          'id': category.id,
                          'name': 'new category name'
                        }
        """
        id = request.GET.get("id")
        categories = get_object_or_404(CategoryModel, pk=id)
        data = request.data
        name = data.get("name")

        if name:
            data[name] = name.capitalize()
        serializer = self.serializer_class(
            data=data, instance=categories, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
            DELETE request for Deleteing a Category
            - Authentication required
            - Query params id=quiz.id
            - Response = @04 status Code
        """
        id = request.GET.get("id")
        categories = get_object_or_404(CategoryModel, pk=id)
        categories.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SubmitView(APIView):
    """ A SubmitView for handling various History related methods """
    permission_classes = [IsAuthenticated]
    serializer_class = HistorySerializer

    def get(self, request):
        """ 
            GET request getting a History
            - Authentication required
            - Gets users from request
            - Response = list of grades
        """
        user = request.user
        histories = History.objects.filter(user=user).order_by("-date")
        serializer = self.serializer_class(histories, many=True)
        data = []
        for idx, d in enumerate(serializer.data):
            quiz = Quizze.objects.get(id=d["quiz"])
            serializer.data[idx]["title"] = quiz.title
            serializer.data[idx]["author"] = quiz.owner.username
            serializer.data[idx]["author_id"] = quiz.owner.id
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
            POST request for creating a History
            - Authentication required
            - Data = {}
            - Response = {}
        """
        data = request.data
        quiz_id = data.get("id")
        if not quiz_id:
            return Response({"detail": "Quiz id is missing"}, status=status.HTTP_400_BAD_REQUEST)
        quiz = get_object_or_404(Quizze, pk=quiz_id)
        score = data.get("score")
        if not score:
            return Response({"detail": "Score is missing"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            score = int(score)
        except ValueError:
            return Response({"detail": "Score not an integer"}, status=status.HTTP_400_BAD_REQUEST)
        if score > 100:
            return Response({"detail": "Score Above 100%"}, status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        if not History.objects.filter(quiz=quiz, user=user).exists():
            quiz.participants += 1
        quiz.save()
        history = History.objects.create(quiz=quiz, grade=score, user=user)
        return Response({"status": "success"}, status=status.HTTP_200_OK)


class GetQuizzes(APIView):
    serializer_class = GetQuizSerializer

    def get(self, request):
        """ 
            GET request getting a quiz
            - Authentication not required
            - Query Params = {'category': category}
            - Response = List of Quizzes that match a category
        """
        category = request.query_params.get('category')
        quizzes = Quizze.objects.all().order_by("-participants")
        if category:
            quizzes = quizzes.filter(category__name__contains=category)
        serializer = self.serializer_class(quizzes, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
