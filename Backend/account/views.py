from django.shortcuts import render, get_list_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from account.serializers import UserSerializer, ChangePasswordSerializer, UserProfileSerializer
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from .models import UserData
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
# Create your views here.


class UserCreateView(generics.GenericAPIView):
    """ A QuizzesView for handling various Quiz related methods """
    serializer_class = UserSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(generics.UpdateAPIView):
    """    An endpoint for changing password.  """
    serializer_class = ChangePasswordSerializer
    model = UserData
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveAPIView):
    """ Retrives a user by the id given into the Query Params"""
    queryset = UserData.objects.all()
    serializer_class = UserProfileSerializer
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    permission_classes = (IsAuthenticated,)
    lookup_field = 'id'
