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


class PrefixRegistrationHomePage:
    @staticmethod
    def get_registry_host_and_port():
        return ResolutionServiceLocationFactory.get_registry_host_and_port()


class ResolutionServiceLocationFactory:
    @staticmethod
    def get_resolver_host_and_port():
        return (os.environ.get('WEB_CONFIG_SERVICE_RESOLVER_HOST', 'localhost'),
                os.environ.get('WEB_CONFIG_SERVICE_RESOLVER_PORT', '8080'))

    @staticmethod
    def get_registry_host_and_port():
        return (os.environ.get('WEB_CONFIG_SERVICE_REGISTRY_HOST', 'localhost'),
                os.environ.get('WEB_CONFIG_SERVICE_REGISTRY_PORT', '8081'))


class ResolutionModel:
    def __init__(self):
        self.logger = config_manager \
            .get_app_config_manager() \
            .get_logger_for("{}.{}".format(__name__, type(self).__name__))

    def resolve(self, compact_id):
        host, port = ResolutionServiceLocationFactory.get_resolver_host_and_port()
        resolver = ApiServicesFactory.get_resolver(host=host, port=port)
        server_response = resolver.resolve(compact_id)
        resolved_resource = None
        if server_response.http_status == 200:
            resolved_resource = resolver.get_highest_recommended_resolved_resource(
                server_response.payload.resolved_resources)
        return server_response, resolved_resource

    def resolve_with_selector(self, compact_id, selector):
        host, port = ResolutionServiceLocationFactory.get_resolver_host_and_port()
        resolver = ApiServicesFactory.get_resolver(host=host, port=port)
        server_response = resolver.resolve(compact_id, selector)
        resolved_resource = None
        if server_response.http_status == 200:
            resolved_resource = server_response.payload.resolved_resources[0]
        return server_response, resolved_resource


class ResolutionEngine:
    """
    This engine is going to implement the request mechanism to the Resolution API itself until we have time to write a
    proper Python module.
    """
    pass
