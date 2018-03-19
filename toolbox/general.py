# 
# Author    : Manuel Bernal Llinares
# Project   : cloud-web-frontend
# Timestamp : 19-03-2018 19:24
# ---
# © 2017 Manuel Bernal Llinares <mbdebian@gmail.com>
# All rights reserved.
# 

"""
General Toolbox for the application
"""

import os
import json
import shutil
import subprocess
# App modules
from exceptions import ToolBoxException



def read_json(json_file="json_file_not_specified.json"):
    """
    Reads a json file and it returns its object representation, no extra checks
    are performed on the file so, in case anything happens, the exception will
    reach the caller
    :param json_file: path to the file in json format to read
    :return: an object representation of the data in the json file
    """
    with open(json_file) as jf:
        return json.load(jf)


def check_create_folders(folders):
    """
    Check if folders exist, create them otherwise
    :param folders: list of folder paths to check
    :return: no return value
    """
    for folder in folders:
        if not os.path.exists(folder):
            try:
                os.makedirs(folder)
            except Exception as e:
                raise ToolBoxException(str(e))
        else:
            if not os.path.isdir(folder):
                raise ToolBoxException("'{}' is not a folder".format(folder))
