# 
# Project   : cloud-web-frontend
# Timestamp : 11-04-2018 19:21
# Author    : Manuel Bernal Llinares <mbdebian@gmail.com>
# ---
# 

"""
This module implements an Identifiers.org Python abstraction to access its web services.

In order to meet the initial prototype deadline, just enough client code will be included into this module. The idea
behind modularizing it here, is that the code is as reusable as possible later on, when we refactor it out.
"""

import abc
import json

# Constants
# API Version
api_version = "1.0"
# Scheme
scheme = "http"


# TODO - Abstract Services Clients Factory

# TODO - Server Request model
class ServerRequest:
    def __init__(self):
        self.api_version = api_version
        self.payload = {}


# Server Response model
class ServerResponse:
    SERVER_RESPONSE_JSON_KEY_API_VERSION = 'apiVersion'
    SERVER_RESPONSE_JSON_KEY_ERROR_MESSAGE = 'errorMessage'
    SERVER_RESPONSE_JSON_KEY_PAYLOAD = 'payload'

    def __init__(self, json_data=None):
        self.api_version = ""
        self.error_message = ""
        self.http_status = 0
        self.payload = {}
        if json_data:
            if self.SERVER_RESPONSE_JSON_KEY_API_VERSION in json_data:
                self.api_version = json_data[self.SERVER_RESPONSE_JSON_KEY_API_VERSION]
                # TODO - We should check the API Version in the response matches the one supported here
            if self.SERVER_RESPONSE_JSON_KEY_ERROR_MESSAGE in json_data:
                self.error_message = json_data[self.SERVER_RESPONSE_JSON_KEY_ERROR_MESSAGE]
            # Payload is delegated to specialized responses


# TODO - Recommendation model
class Recommendation:
    RECOMMENDATION_JSON_KEY_RECOMMENDATION_INDEX = 'recommendationIndex'
    RECOMMENDATION_JSON_KEY_RECOMMENDATION_EXPLANATION = 'recommendationExplanation'

    def __init__(self, json_data=None):
        self.recommendation_index = 0
        self.recommendation_explanation = "--- Default Recommendation ---"
        if json_data:
            if self.RECOMMENDATION_JSON_KEY_RECOMMENDATION_EXPLANATION in json_data:
                self.recommendation_explanation = json_data[self.RECOMMENDATION_JSON_KEY_RECOMMENDATION_EXPLANATION]
            if self.RECOMMENDATION_JSON_KEY_RECOMMENDATION_INDEX in json_data:
                self.recommendation_index = json_data[self.RECOMMENDATION_JSON_KEY_RECOMMENDATION_INDEX]


# TODO - Resolved Resource model
class ResolvedResource:
    RESOLVED_RESOURCE_JSON_KEY_ID = 'id'
    RESOLVED_RESOURCE_JSON_KEY_RESOURCE_PREFIX = 'resourcePrefix'
    RESOLVED_RESOURCE_JSON_KEY_ACCESS_URL = 'accessUrl'
    RESOLVED_RESOURCE_JSON_KEY_INFO = 'info'
    RESOLVED_RESOURCE_JSON_KEY_INSTITUTION = 'institution'
    RESOLVED_RESOURCE_JSON_KEY_LOCATION = 'location'
    RESOLVED_RESOURCE_JSON_KEY_OFFICIAL = 'official'
    RESOLVED_RESOURCE_JSON_KEY_RECOMMENDATION = 'recommendation'

    def __init__(self, json_data=None):
        self.id = ""
        self.resource_prefix = ""
        self.access_url = ""
        self.info = ""
        self.institution = ""
        self.location = ""
        self.official = False
        self.recommendation = Recommendation()
        if json_data:
            if self.RESOLVED_RESOURCE_JSON_KEY_ID in json_data:
                self.id = json_data[self.RESOLVED_RESOURCE_JSON_KEY_ID]
            if self.RESOLVED_RESOURCE_JSON_KEY_RESOURCE_PREFIX in json_data:
                self.resource_prefix = json_data[self.RESOLVED_RESOURCE_JSON_KEY_RESOURCE_PREFIX]
            if self.RESOLVED_RESOURCE_JSON_KEY_ACCESS_URL in json_data:
                self.access_url = json_data[self.RESOLVED_RESOURCE_JSON_KEY_ACCESS_URL]
            if self.RESOLVED_RESOURCE_JSON_KEY_INFO in json_data:
                self.info = json_data[self.RESOLVED_RESOURCE_JSON_KEY_INFO]


# TODO - Response Resolve Payload
class ResponseResolvePayload:
    def __init__(self, json_data=None):
        self.resolved_resources = []


# TODO - Server Response to Resolve request
class ServerResponseResolve(ServerResponse):
    def __init__(self, json_data=None):
        super().__init__(json_data=json_data)
        self.payload = ResponseResolvePayload()
        if json_data:
            if (self.SERVER_RESPONSE_JSON_KEY_PAYLOAD in json_data) and (json_data[self.SERVER_RESPONSE_JSON_KEY_PAYLOAD]):
                self.payload = ResponseResolvePayload(json_data=json_data)


# TODO - Resolver Service wrapper / client
class ResolverService:
    pass
