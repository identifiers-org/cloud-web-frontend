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
    SERVER_RESPONSE_KEY_API_VERSION = 'apiVersion'
    SERVER_RESPONSE_KEY_ERROR_MESSAGE = 'errorMessage'
    SERVER_RESPONSE_KEY_PAYLOAD = 'payload'

    def __init__(self, json_data=None):
        self.api_version = ""
        self.error_message = ""
        self.http_status = 0
        self.payload = {}
        if json_data:
            if self.SERVER_RESPONSE_KEY_API_VERSION in json_data:
                self.api_version = json_data[self.SERVER_RESPONSE_KEY_API_VERSION]
                # TODO - We should check the API Version in the response matches the one supported here
            if self.SERVER_RESPONSE_KEY_ERROR_MESSAGE in json_data:
                self.error_message = json_data[self.SERVER_RESPONSE_KEY_ERROR_MESSAGE]
            # Payload is delegated to specialized responses


# TODO - Recommendation model
class Recommendation:
    def __init__(self):
        self.recommendation_index = 0
        self.recommendation_explanation = ""


# TODO - Resolved Resource model
class ResolvedResource:
    def __init__(self):
        self.id = ""
        self.resource_prefix = ""
        self.access_url = ""
        self.info = ""
        self.institution = ""
        self.location = ""
        self.official = False
        self.recommendation = {}


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
            if (self.SERVER_RESPONSE_KEY_PAYLOAD in json_data) and (json_data[self.SERVER_RESPONSE_KEY_PAYLOAD]):
                self.payload = ResponseResolvePayload(json_data=json_data)



# TODO - Resolver Service wrapper / client
class ResolverService:
    pass
