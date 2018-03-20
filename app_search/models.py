import os
from django.db import models


# Create your models here.

class HomePage:
    @staticmethod
    def get_resolver_host_and_port():
        pass


class ResolutionServiceLocationFactory:
    @staticmethod
    def get_resolver_host_and_port():
        pass


class ApplicationProfileManager:
    APPLICATION_PROFILE_PRODUCTION = 'production'
    APPLICATION_PROFILE_DEVELOPMENT = 'development'

    @staticmethod
    def get_application_active_profile():
        return os.environ.get('APPLICATION_ACTIVE_PROFILE', ApplicationProfileManager.APPLICATION_PROFILE_PRODUCTION)
