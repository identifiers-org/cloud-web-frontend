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
