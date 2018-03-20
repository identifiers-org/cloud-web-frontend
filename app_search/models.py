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
        return (os.environ.get('WEB_CONFIG_SERVICE_RESOLVER_HOST', 'localhost'),
                os.environ.get('WEB_CONFIG_SERVICE_RESOLVER_PORT', '8080'))


