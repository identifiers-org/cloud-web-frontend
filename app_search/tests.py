from django.test import TestCase
from django.urls import resolve
from app_search.views import home_page


# Create your tests here.

class HomePageTest(TestCase):

    def test_this_app_is_the_root_landing_page(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'home.html')
