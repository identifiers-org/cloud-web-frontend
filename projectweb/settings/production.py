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

DEBUG = False
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost').strip().split(',')
CORS_ORIGIN_WHITELIST = os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost').strip().split(',')
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
# We don't do redirect because this is designed to be deployed behing an SSL termination load balancer
SECURE_SSL_REDIRECT = False
# Thus, there is no SSL Host
SECURE_SSL_HOST = None
# And nothing to do with any of the other SSL based settings
SECURE_HSTS_SECONDS = 0

X_FRAME_OPTIONS = 'DENY'
# Also, we don't use session cookies, so we don't need to set anything there
# TODO - Check how these settings play with the Load Balancer SSL termination
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True

# Static files
STATIC_ROOT = os.environ.get('DJANGO_STATIC_ROOT', 'static')
