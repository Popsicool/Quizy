from typing import Any
from django import http
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
from app.models import Quizze, CategoryModel, Question, History
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
        # test post request
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


class ContactMessageViewTest(APITestCase):
    customers_url = reverse('contact')

    def setUp(self) -> None:
        self.client = APIClient()

    def test_valid_customer_post(self):
        """ testing expected valid input """
        data = {
            'name': 'ViewTester',
            'email': 'viewTester@alx.com',
            'message': 'Test Message'
        }

        response = self.client.post(
            self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'detail': 'Sent'})

    def test_valid_customer_post(self):
        """ testing with missing data """
        invalid_data = [{
            'email': 'viewTester@alx.com',
            'message': 'Test Message'
        },
            {
            'name': 'ViewTester',
            'message': 'Test Message'
        },
            {
            'name': 'ViewTester',
            'email': 'viewTester@alx.com'
        }]

        for data in invalid_data:
            response = self.client.post(
                self.customers_url, data, format='json')
            self.assertEqual(response.status_code,
                             status.HTTP_400_BAD_REQUEST)
            self.assertEqual(response.data, {'detail': 'Incomplete data'})

    def test_with_invalid_email(self):
        """ testing with different invlid emails """

        invalid_data = [
            {
                'name': 'ViewTester',
                'email': 'viewTester @alx.com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'view*Tester@alx.com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'ግጽፈታኝ@alx.com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'viewTester@+alx.com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'viewTester@ alx.com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'viewTester@ኤኤልx.com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'viewTester@alx.1com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'viewTester@alx.8com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'viewTester@alx.+com',
                'message': 'Test Message'
            },
            {
                'name': 'ViewTester',
                'email': 'viewTester@alx.com ',
                'message': 'Test Message'
            },

        ]

        for data in invalid_data:
            response = self.client.post(
                self.customers_url, data, format='json')
            self.assertEqual(response.status_code,
                             status.HTTP_400_BAD_REQUEST)
            self.assertEqual(
                response.data, {'detail': 'Invalid Email format'})

    def test_contact_with_invalid_method(self):
        """ testing view with invalid methods """
        # test get request
        response = self.client.get(self.customers_url)
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


class QuizzesViewTest(APITestCase):
    """ test suite for the QuizzesView """
    customers_url = reverse('quiz')

    def setUp(self):
        """ create a necessary instances client and Authenticated user for tests"""
        self.client = APIClient()

        # create User
        self.user = UserData.objects.create_user(
            username='admin', password='admin', email='bob.dylan.com')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # create category
        self.category = CategoryModel.objects.create(name='test_category')

        # create Quiz
        self.quiz = Quizze.objects.create(
            owner=self.user,
            title='test quiz',
        )
        self.quiz.category.set([self.category])

    def test_valid_quiz_get(self):
        """ testing a valid get requst on the url"""
        self.client.force_authenticate(user=self.user)
        data = {'id': self.quiz.id}
        response = self.client.get(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'id': self.quiz.id, 'title': 'test quiz', 'questions': [
        ], 'category': [dict([('name', 'test_category')])], 'participants': 0})

    def test_invalid_data_quiz_get(self):
        """ testing an invalid data for get requst on the url"""
        self.client.force_authenticate(user=self.user)
        data = {'ids': '1'}
        response = self.client.get(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invalid_data_quiz_get(self):
        """ testing an invalid id for get requst on the url"""

        self.client.force_authenticate(user=self.user)
        # testing id that doesnt exist in database
        data = {'id': '0'}
        response = self.client.get(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.reason_phrase, 'Not Found')
        # testing invliad datatype
        data = {'id': 'a'}
        with self.assertRaises(ValueError) as err:
            self.client.get(self.customers_url, data, format='json')
        self.assertEqual(str(err.exception),
                         "Field 'id' expected a number but got 'a'.")
