from django.urls import path, reverse, include, resolve
from django.test import SimpleTestCase
from account.views import (UserCreateView, ChangePasswordView, UserProfileView)
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.db import connections, DEFAULT_DB_ALIAS
from django.contrib.auth.models import User
from account.models import UserData
from rest_framework.views import APIView


class ApiUrlsTests(SimpleTestCase):

    def test_get_userCreate_is_resolved(self):
        url = reverse('sign_up')
        self.assertEquals(resolve(url).func.view_class, UserCreateView)

    def test_get_changepassword_is_resolved(self):
        url = reverse('change-password')
        self.assertEquals(resolve(url).func.view_class, ChangePasswordView)

    def test_get_userprofileview_is_resolved(self):
        url = reverse('user-profile', args=[1])
        self.assertEquals(resolve(url).func.view_class, UserProfileView)


class UserCreateViewTests(APITestCase):
    customers_url = reverse('sign_up')

    def setUp(self):
        self.client = APIClient()

    def test_post_customers_correct(self):
        data = {
            "username": "Mr",
            "first_name": "Peter",
            "last_name": "Parkerz",
            "email": "bod.dylan@gmail.com",
            "password": "testing321"
        }
        response = self.client.post(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), 5)

    def test_post_customers_missing_password(self):
        data = {
            "username": "Mr",
            "first_name": "Peter",
            "last_name": "Parkerz",
            "email": "bod.dylan@gmail.com",
        }
        response = self.client.post(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_customers_missing_email(self):
        data = {
            "username": "Mr",
            "first_name": "Peter",
            "last_name": "Parkerz",
            "password": "testing321"
        }
        response = self.client.post(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ChangePasswordViewTests(APITestCase):
    customers_url = reverse('change-password')

    def setUp(self) -> None:
        self.client = APIClient()
        self.user = UserData.objects.create_user(
            username='admin', password='admin', email='bob.dylan.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_update_changepassword_correct(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'old_password': 'admin',
            'new_password': 'updateadmin',
        }
        response = self.client.put(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'],
                         'Password updated successfully')
