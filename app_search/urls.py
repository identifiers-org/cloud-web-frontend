# 
# Project   : cloud-web-frontend
# Timestamp : 20-03-2018 11:43
# Author    : Manuel Bernal Llinares
# ---
# © 2017 Manuel Bernal Llinares <mbdebian@gmail.com>
# All rights reserved.
# 

"""
Resolution / Search application specific URL routing
"""

from django.urls import path, re_path
from app_search import views as app_search_views

urlpatterns = [
    path('', app_search_views.home_page, name='resolution_home'),
    re_path('^(?P<selector>.+)/(?P<compact_id>.+)$', app_search_views.resolve_with_selector),
    re_path('^(?P<compact_id>.+)$', app_search_views.resolve),
]

