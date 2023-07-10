from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from account.models import UserData
from account.serializers import UserProfileSerializer, UserSerializer


class UserSerializerTest(APITestCase):

    def test_post_with_valid_data(self):
        serializer = UserSerializer(data={
            'email': 'user1@example.com',
            'username': 'user1',
            'first_name': 'user1',
            'last_name': '1',
            'password': 'testpwd'
        })
        # Check if the serializer is valid
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.username, 'user1')
        self.assertTrue(isinstance(user, UserData))

    def test_post_with_invalid_data(self):
        serializer = UserSerializer(data={
            'email': 'user1@example.com',
            'username': 'user1',
            'first_name': 'user1',
            'last_name': '1',
        })
        self.assertFalse(serializer.is_valid())
        self.assertRaises(serializer.save(), AssertionError)


class UserProfileSerializerTest(APITestCase):
    def setUp(self):
        # Create a user object
        self.user = UserData.objects.create_user(
            username='admin', password='admin', email='bob.dylan.com')

    def test_userprofile_serializer_valid(self):
        # Create a serializer instance with valid data
        serializer = UserProfileSerializer(data={
            'username': 'user1',
            'password': 'user1',
            'first_name': 'user',
            'last_name': '1',
            'email': 'user1@example.com'
        })
        # Check if the serializer is valid
        self.assertTrue(serializer.is_valid())
        # Check the output of the serializer data
        self.assertEqual(serializer.validated_data, {
            'username': 'user1',
            'first_name': 'user',
            'last_name': '1',
            'email': 'user1@example.com'
        })
        # Save the serializer data to create a new user object
        user = serializer.save()
        # Check the attributes of the new user object
        self.assertEqual(user.username, 'user1')
        self.assertEqual(user.email, 'user1@example.com')
        # self.assertTrue(user.check_password('user1'))

    def test_userprofile_serializer_invalid(self):
        # Create a serializer instance with invalid data
        serializer = UserProfileSerializer(data={
            'username': '',
            'password': '',
            'email': ''
        })
        # Check if the serializer is invalid
        self.assertFalse(serializer.is_valid())
        # Check the output of the serializer errors
