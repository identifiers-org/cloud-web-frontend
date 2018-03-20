# 
# Project   : cloud-web-frontend
# Timestamp : 20-03-2018 3:52
# Author    : Manuel Bernal Llinares
# ---
# © 2017 Manuel Bernal Llinares <mbdebian@gmail.com>
# All rights reserved.
# 

"""
Acceptance test for the home page, which is the main landing page of the website.
"""

import unittest
# Application imports
import functional_tests.common as ftcommon


class MainLandingPage(unittest.TestCase):

    def setUp(self):
        self.browser = ftcommon.get_browser_instance()

    def tearDown(self):
        self.browser.quit()

    def test_main_landing_page_content(self):
        self.browser.get('http://localhost:8000')
        self.assertIn('Identifiers.org', self.browser.title)
        # TODO - complete this test