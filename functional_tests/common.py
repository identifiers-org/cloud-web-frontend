# 
# Author    : Manuel Bernal Llinares
# Project   : cloud-web-frontend
# Timestamp : 19-03-2018 16:22
# ---
# © 2017 Manuel Bernal Llinares <mbdebian@gmail.com>
# All rights reserved.
# 

"""
Common environment file for running functional tests
"""

import os
import uuid
from selenium import webdriver
# Application imports
import config_manager
import toolbox.general as general_toolbox


# Some globals
__browser_profile_counter = 0


def get_browser_instance():
    logger = config_manager.get_app_config_manager().get_logger_for("{}.{}".format(__name__, "get_browser_instance"))
    folder_prefix = os.path.join(config_manager.get_app_config_manager().get_session_working_dir(),
                                 "browser_profile_no")
    profile_folder = "{}{}".format(folder_prefix, uuid.uuid4())
    general_toolbox.check_create_folders([profile_folder])
    logger.debug("Creating Browser instance, profile folder at '{}'".format(profile_folder))
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('--ignore-certificate-errors')
    chrome_options.add_argument("user-data-dir={}".format(profile_folder))

