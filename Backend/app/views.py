from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
import json
import re
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