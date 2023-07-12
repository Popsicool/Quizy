from django.urls import path, reverse, include, resolve
from django.test import SimpleTestCase
from app.views import (ping, ContactMessage, QuizzesView,
                       CategoryView, SubmitView, GetQuizzes)
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.db import connections, DEFAULT_DB_ALIAS
from django.contrib.auth.models import User
from account.models import UserData
from rest_framework.views import APIView


class ApiUrlsTests(SimpleTestCase):

    def test_ping_is_resolved(self):
        url = reverse('ping')
        self.assertEquals(resolve(url).func, ping)

    def test_contact_is_resolved(self):
        url = reverse('contact')
        self.assertEquals(resolve(url).func.view_class, ContactMessage)

    def test_category_is_resolved(self):
        url = reverse('category')
        self.assertEquals(resolve(url).func.view_class, CategoryView)

    def test_quiz_is_resolved(self):
        url = reverse('quiz')
        self.assertEquals(resolve(url).func.view_class, QuizzesView)

    def test_submit_is_resolved(self):
        url = reverse('submit')
        self.assertEquals(resolve(url).func.view_class, SubmitView)

    def test_get_quiz_is_resolved(self):
        url = reverse('get_quiz')
        self.assertEquals(resolve(url).func.view_class, GetQuizzes)


class PingViewTests(APITestCase):
    customers_url = reverse('ping')

    def setUp(self):
        self.client = APIClient()

    def test_ping_with_get(self):
        response = self.client.get(self.customers_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"reply": "ping"})

    def test_ping_with_invalid_method(self):
        # test poost request
        response = self.client.post(self.customers_url)
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

        # test put request
        response = self.client.put(self.customers_url)
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

        # test delete request
        response = self.client.delete(self.customers_url)
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

        # test patch request
        response = self.client.patch(self.customers_url)
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)
