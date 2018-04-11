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


# TODO - Server Response model
class ServerResponse:
    pass


# TODO - Recommendation model
class Recommendation:
    pass


# TODO - Resolved Resource model
class ResolvedResource:
    pass


# TODO - Response Resolve Payload
class ResponseResolvePayload:
    pass


# TODO - Server Response to Resolve request
class ServerResponseResolve(ServerResponse):
    pass


# TODO - Resolver Service wrapper / client
class ResolverService:
    pass
