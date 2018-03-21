# 
# Project   : cloud-web-frontend
# Timestamp : 21-03-2018 13:17
# Author    : Manuel Bernal Llinares
# ---
# © 2017 Manuel Bernal Llinares <mbdebian@gmail.com>
# All rights reserved.
# 

"""
Production Environment settings
"""

import os
from .base import *

ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost').strip().split(',')
SECURE_HSTS_SECONDS = 0
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
# We don't do redirect because this is designed to be deployed behing an SSL termination load balancer
SECURE_SSL_REDIRECT = False
# Thus, there is no SSL Host
SECURE_SSL_HOST = None
