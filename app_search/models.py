import os
from django.db import models


# Create your models here.

class HomePage:
    @staticmethod
    def get_resolver_host_and_port():
        return ResolutionServiceLocationFactory.get_resolver_host_and_port()


class ResolutionServiceLocationFactory:
    @staticmethod
    def get_resolver_host_and_port():
        return (os.environ.get('WEB_CONFIG_SERVICE_RESOLVER_HOST', 'localhost'),
                os.environ.get('WEB_CONFIG_SERVICE_RESOLVER_PORT', '8080'))


class ResolutionModel:
    pass


class ResolutionEngine:
    """
    This engine is going to implement the request mechanism to the Resolution API itself until we have time to write a
    proper Python module.
    """
    pass
