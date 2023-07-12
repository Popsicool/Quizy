from rest_framework.test import APITestCase, APIClient
from rest_framework.exceptions import ValidationError
from account.models import UserData
from account.serializers import (UserProfileSerializer,
                                 UserSerializer,
                                 ChangePasswordSerializer)


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
        self.assertRaises(ValidationError, serializer.is_valid,
                          raise_exception=True)


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
        self.assertRaises(ValidationError, serializer.is_valid,
                          raise_exception=True)


# class ChangePasswordSerializerTestCase(APITestCase):
#     def setUp(self):
#         # Create a test user
#         self.user = UserData.objects.create_user(
#             username="testuser", email="testuser@gmail.com", password="testpass")
#         # Create a test client
#         self.client = APIClient()
#         # Authenticate the client with the test user

#     def test_change_password_serializer_success(self):
#         self.client.force_authenticate(user=self.user)
#         # Test that the serializer is valid and changes the password with valid data
#         data = {"old_password": "testpass", "new_password": "newpass"}
#         serializer = ChangePasswordSerializer(data=data)
#         self.assertTrue(serializer.is_valid())
#         serializer.save()
#         # Test that the user can authenticate with the new password
#         self.assertTrue(self.user.check_password("testpass"))

#     def test_change_password_serializer_fail(self):
#         self.client.force_authenticate(user=self.user)
#         # Test that the serializer is invalid and raises a ValidationError with invalid data
#         data = {"old_password": "wrongpass", "new_password": "newpass"}
#         serializer = ChangePasswordSerializer(data=data)
#         self.assertFalse(serializer.is_valid())
#         self.assertRaises(ValidationError, serializer.save, user=self.user)
