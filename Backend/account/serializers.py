from rest_framework import serializers
from .models import UserData
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        token['email'] = user.email
        token['username'] = user.username
        # ...

        return token

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserData
        fields = ["email", "username", "first_name", "last_name", "password"]

    def create(self, validated_data):
        user = UserData.objects.create(email=validated_data['email'],
                                       username=validated_data['username'],
                                       first_name=validated_data['first_name'],
                                       last_name=validated_data['last_name']
                                         )
        user.set_password(validated_data['password'])
        user.save()
        return user

class ChangePasswordSerializer(serializers.Serializer):
    model = UserData

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
