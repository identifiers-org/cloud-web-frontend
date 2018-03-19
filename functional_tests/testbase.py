# 
# Author    : Manuel Bernal Llinares
# Project   : cloud-web-frontend
# Timestamp : 19-03-2018 18:52
# ---
# © 2017 Manuel Bernal Llinares <mbdebian@gmail.com>
# All rights reserved.
# 

"""
This is just an initial test that I'll use when creating the django application to make sure things are in place, I will
remove it in the future, because it will stop passing.
"""

# Application imports
import functional_tests.common as ftcommon

browser = ftcommon.get_browser_instance()
browser.get('http://localhost:8000')

assert 'Django' in browser.title
browser.close()