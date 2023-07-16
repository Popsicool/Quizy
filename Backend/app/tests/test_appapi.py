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
from app.serializers import (CategorySerializer, CatExists, QuestionSerializer,
                             QuizzeSerializer, HistorySerializer, GetQuizSerializer)
from rest_framework.views import APIView


class ApiUrlsTests(SimpleTestCase):
    """ tests all urls of the app app to see if the resolve to the correct functions"""

    def test_ping_is_resolved(self):
        """ testing if ping is resolved to correct view """
        url = reverse('ping')
        self.assertEquals(resolve(url).func, ping)

    def test_contact_is_resolved(self):
        """ testing if ping is resolved to correct view """
        url = reverse('contact')
        self.assertEquals(resolve(url).func.view_class, ContactMessage)

    def test_category_is_resolved(self):
        """ testing if ping is resolved to correct view """
        url = reverse('category')
        self.assertEquals(resolve(url).func.view_class, CategoryView)

    def test_quiz_is_resolved(self):
        """ testing if ping is resolved to correct view """
        url = reverse('quiz')
        self.assertEquals(resolve(url).func.view_class, QuizzesView)

    def test_submit_is_resolved(self):
        """ testing if ping is resolved to correct view """
        url = reverse('submit')
        self.assertEquals(resolve(url).func.view_class, SubmitView)

    def test_get_quiz_is_resolved(self):
        """ testing if ping is resolved to correct view """
        url = reverse('get_quiz')
        self.assertEquals(resolve(url).func.view_class, GetQuizzes)


class PingViewTests(APITestCase):
    """ tests the '' end point with the name ping for various conditions"""
    customers_url = reverse('ping')

    def setUp(self):
        """ creates a APIClient instance for testing """
        self.client = APIClient()

    def test_ping_with_get(self):
        """ test ping with valid get """
        response = self.client.get(self.customers_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"reply": "ping"})

    def test_ping_with_invalid_method(self):
        """ test ping with various invalid endpoints """
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
    """ tests the /contact end point with the name contact for various conditions"""
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

    def test_invalid_customer_post(self):
        """ testing with missing post data """
        invalid_data = [{
            # missing name
            'email': 'viewTester@alx.com',
            'message': 'Test Message'
        },
            {
            # missing email
            'name': 'ViewTester',
            'message': 'Test Message'
        },
            {
            # missing message
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
        """ testing with different invalid emails """

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
    """ tests the /quiz end point with the name quiz for various conditions """
    customers_url = reverse('quiz')

    def setUp(self):
        """ creates instances of client, user, category, quiz and question for tests """
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

        # create question
        self.question = Question.objects.create(
            quiz=self.quiz,
            question="The acronym RIP stands for which of these?",
            A="Routing Information Protocol",
            B="Regular Interval Processes",
            C="Runtime Instance Processes",
            D="Routine Inspection Protocol",
            answer="A"
        )

    def test_valid_quiz_get(self):
        """ testing a valid get request to retrieve quiz """
        self.client.force_authenticate(user=self.user)
        data = {'id': self.quiz.id}
        response = self.client.get(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'id': self.quiz.id,
                                         'title': 'test quiz',
                                         'questions': [QuestionSerializer(self.question).data],
                                         'category': [dict([('name', 'test_category')])],
                                         'participants': 0})

    def test_invalid_data_quiz_get(self):
        """ testing get request with id that doesnt exist"""
        self.client.force_authenticate(user=self.user)

        # testing id that doesnt exist in database
        data = {'ids': '-1'}
        response = self.client.get(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.reason_phrase, 'Not Found')

    def test_invalid_id_data_quiz_get(self):
        """ testing an invalid id for get request """
        self.client.force_authenticate(user=self.user)

        # testing invalid id datatype
        invalid_data = [{'id': 'a'}, {'id': ['a']}, {'id': True}]

        for data in invalid_data:
            with self.assertRaises(ValueError) as err:
                self.client.get(self.customers_url, data, format='json')

    def test_valid_get_with_invalid_user(self):
        """ test a vald get request with an authenticated user """
        data = {'id': self.quiz.id}
        response = self.client.get(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data,
                         {'id': self.quiz.id,
                          'title': 'test quiz',
                          'questions': [QuestionSerializer(self.question).data],
                          'category': [dict([('name', 'test_category')])],
                          'participants': 0})

    def test_valid_post(self):
        """ testing a valid post request """
        self.client.force_authenticate(user=self.user)
        data = {
            'title': 'testing post reqest',
            'category': [CategorySerializer(self.category).data],
            'questions': [QuestionSerializer(self.question).data],
        }
        response = self.client.post(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, QuizzeSerializer(response.data).data)

    def test_invalid_post(self):
        """ testing with invalid data for post request """
        self.client.force_authenticate(user=self.user)
        invalid_data = [
            {
                # missing title
                'title': '',
                'category': [CategorySerializer(self.category).data],
                'questions': [QuestionSerializer(self.question).data],
            },
            {
                # title with invalid datatype
                'title': ['testing post request'],
                'category': [CategorySerializer(self.category).data],
                'questions': [QuestionSerializer(self.question).data],
            },
            {
                # missing category
                'title': 'testing post request',
                'category': [],
                'questions': [QuestionSerializer(self.question).data],
            },
            {
                # category with invalid datatype
                'title': 'testing post request',
                'category': CategorySerializer(self.category).data,
                'questions': [QuestionSerializer(self.question).data],
            },
            # {
            #     # missing questions
            #     'title': 'testing post request',
            #     'category': [CategorySerializer(self.category).data],
            #     'questions': [],
            # },
            {
                # questions with invalid datatype
                'title': 'testing post request',
                'category': [CategorySerializer(self.category).data],
                'questions': QuestionSerializer(self.question).data,
            },
        ]
        for data in invalid_data:
            response = self.client.post(
                self.customers_url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_post_with_invalid_user(self):
        """ testing a valid post request with an unauthenticated user"""

        data = {
            'title': 'testing post reqest',
            'category': [CategorySerializer(self.category).data],
            'questions': [QuestionSerializer(self.question).data],
        }
        response = self.client.post(self.customers_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CategoryViewTest(APITestCase):
    customers_url = reverse('category')

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

        # create question
        self.question = Question.objects.create(
            quiz=self.quiz,
            question="The acronym RIP stands for which of these?",
            A="Routing Information Protocol",
            B="Regular Interval Processes",
            C="Runtime Instance Processes",
            D="Routine Inspection Protocol",
            answer="A"
        )

    def test_valid_get(self):
        """ tests valid get request """
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.customers_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = CategoryModel.objects.all()
        self.assertEqual(response.data, CategorySerializer(
            queryset, many=True).data)

    def test_valid_get_invalid_user(self):
        """ testing with a user that havent logged in"""

        response = self.client.get(self.customers_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        queryset = CategoryModel.objects.all()
        self.assertEqual(response.data, CategorySerializer(
            queryset, many=True).data)

    def test_valid_post_request(self):
        """ testing a valid post request """
        self.client.force_authenticate(user=self.user)
        valid_data = [
            {'name': 'test_category'},
            # name with category that doesnt exist
            {'name': 'invalid_category'},
        ]
        for data in valid_data:
            response = self.client.post(
                self.customers_url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(
                response.data, CategorySerializer(response.data).data)

    def test_invalid_post_request(self):
        """ testing with and invalid data set """
        self.client.force_authenticate(user=self.user)

        invalid_data = [
            {'names': 'test_category'},  # with no name key
            {},                           # with empty dict
        ]
        for data in invalid_data:
            response = self.client.post(
                self.customers_url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_post_with_invalid_user(self):
        """ testing a valid request with an unauthorized user """

        valid_data = [
            {'name': 'test_category'},
            # name with category that doesnt exist
            {'name': 'invalid_category'},
        ]
        for data in valid_data:
            response = self.client.post(
                self.customers_url, data, format='json')
            self.assertEqual(response.status_code,
                             status.HTTP_401_UNAUTHORIZED)

    def test_valid_put_request(self):
        """ testing a valid put request on category """
        self.client.force_authenticate(user=self.user)

        data = {'name': 'new name'}
        Query = {'QUERY_STRING': f'id={self.category.id}'}

        response = self.client.put(
            self.customers_url, data=data, **Query, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data, {'id': self.category.id, 'name': data['name']})

    def test_valid_put_invalid_user(self):
        """ testing a valid put request with invalid user"""

        data = {'name': 'new name'}
        Query = {'QUERY_STRING': f'id={self.category.id}'}

        response = self.client.put(
            self.customers_url, data=data, **Query, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_valid_put_invalid_Query(self):
        """ testing a in valid query for put request"""
        self.client.force_authenticate(user=self.user)

        data = {'name': 'new name'}
        invalid_id = [
            {'QUERY_STRING': 'id=0'},  # none existing id
            {'QUERY_STRING': 'id=-1'},  # invalid id
            {'QUERY_STRING': f'ids={self.category.id}'},  # invlid Query string
            {'QUERY_STRING': ''},  # none existing id
        ]

        invalid_type = [
            {'QUERY_STRING': 'id=a'},  # invalid id
            {'QUERY_STRING': 'id=[1]'},  # invalid id
        ]

        for Query in invalid_id:
            response = self.client.put(
                self.customers_url, data=data, **Query, format='json')
            self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        for Query in invalid_type:
            with self.assertRaises(ValueError) as err:
                self.client.put(self.customers_url, data=data,
                                **Query, format='json')
        # self.assertEqual(str(err.exception),
        #                  "'int' object has no attribute 'capitalize'")

    def test_invalid_data_put_request(self):
        """ testing invlid data for put request on cateagory """
        self.client.force_authenticate(user=self.user)

        invliad_data = [
            {'name': self.category.name},  # name already exists
            {'name': ''},  # name is empty
        ]
        Query = {'QUERY_STRING': f'id={self.category.id}'}

        for data in invliad_data:
            response = self.client.put(
                self.customers_url, data=data, **Query, format='json')

            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        data = {'name': 1}
        with self.assertRaises(AttributeError) as err:
            self.client.put(self.customers_url, data=data,
                            **Query, format='json')
        self.assertEqual(str(err.exception),
                         "'int' object has no attribute 'capitalize'")
