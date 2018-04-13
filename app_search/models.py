import os
from django.db import models
# Application imports
import config_manager
from .identifierspy import ApiServicesFactory


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
    def __init__(self):
        self.logger = config_manager \
            .get_app_config_manager() \
            .get_logger_for("{}.{}".format(__name__, type(self).__name__))

    def resolve(self, compact_id):
        host, port = ResolutionServiceLocationFactory.get_resolver_host_and_port()
        resolver = ApiServicesFactory.get_resolver(host=host, port=port)
        resolved_resource = resolver.resolve(compact_id)
        # TODO

    def resolve_with_selector(self, compact_id, selector):
        pass


class ResolutionEngine:
    """
    This engine is going to implement the request mechanism to the Resolution API itself until we have time to write a
    proper Python module.
    """
    pass
