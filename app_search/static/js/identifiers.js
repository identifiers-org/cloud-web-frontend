/**
 * Project: cloud-identifiersjs
 * Timestamp: 2018-03-17 3:13
 * @author Manuel Bernal Llinares <mbdebian@gmail.com>
 * ---
 *
 * This Javascript library implements services wrappers to access identifiers.org cloud API
 *
 * DISCLAIMER ==========================================================================================================
 * I know, I suck at Javascript, it's been many years since the last time I had to do anything with it, and I think I
 * never properly setup any development environment / workflow for Javascript.
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN
 * AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 * =====================================================================================================================
 */
var IdentifiersJS = (function () {
    "use strict";

    // API version compatibility
    var apiVersion = "1.0";

    // Scheme
    var scheme = 'http';

    // Resolver Service (Defaults)
    var wsResolverHost = 'localhost';
    var wsResolverPort = '8080';

    // Registry service (Defaults)
    var wsRegistryHost = 'localhost';
    var wsRegistryPort = '8081';

    // Helpers
    function getAjax(url, success, error) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                success(xhr);
            } else if (xhr.readyState > 3 && xhr.status != 200) {
                error(xhr);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }

    function postAjax(url, body, success, error) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) {
                success(xhr);
            } else if (xhr.readyState > 3 && xhr.status != 200) {
                error(xhr);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(body));
        return xhr;
    }
    // --- END - Helpers

    // Server Request
    function ServerRequest() {
        this.apiVersion = apiVersion;
        this.payload = {};
    }

    // Server Response
    function ServerResponse() {
        this.apiVersion = "";
        this.errorMessage = "";
        this.httpStatus = 0;
        this.payload = {};
    }

    ServerResponse.prototype.fromResponse = function (serverResponse) {
        //console.debug("Building Server Response from Object...");
        this.apiVersion = (serverResponse.apiVersion !== undefined) ? serverResponse.apiVersion : this.apiVersion;
        this.errorMessage = (serverResponse.errorMessage !== undefined) ?
            serverResponse.errorMessage : this.errorMessage;
        if (serverResponse.payload) {
            this.payload.fromResponsePayload(serverResponse.payload);
        }
    };

    // --- (RESOLVER) Compact ID Resolution Services ---
    // Models
    function Recommendation(object) {
        // Defaults
        this.recommendationIndex = 0;
        this.recommendationExplanation = "";
        if (object) {
            this.recommendationIndex =
                (object.recommendationIndex !== undefined) ?
                    object.recommendationIndex : this.recommendationIndex;
            this.recommendationExplanation =
                (object.recommendationExplanation !== undefined) ?
                    object.recommendationExplanation : this.recommendationExplanation;
        }
    }

    function Location(object) {
        this.countryCode = "";
        this.countryName = "";
        if (object) {
            this.countryCode =
                (object.countryCode !== undefined) ?
                    object.countryCode : this.countryCode;
            this.countryName =
                (object.countryName !== undefined) ?
                    object.countryName : this.countryName;
        }
    }

    function Institution(object) {
        this.id = 0;
        this.name = "";
        this.homeUrl = "";
        this.description = "";
        this.location = new Location();
        if (object) {
            this.id = (object.id !== undefined) ? object.id : this.id;
            this.name = (object.name !== undefined) ? object.name : this.name;
            this.homeUrl = (object.homeUrl !== undefined) ? object.homeUrl : this.homeUrl;
            this.description = (object.description !== undefined) ? object.description : this.description;
            if (object.location) {
                this.location = new Location(object.location)
            }
        }
    }

    function ResolvedResource(object) {
        // Defaults
        this.id = "";
        this.providerCode = "";
        this.compactIdentifierResolvedUrl = "";
        this.description = "";
        this.institution = new Institution();
        this.location = "";
        this.official = false;
        this.recommendation = new Recommendation();
        if (object) {
            //console.log("[RESOLVED_RESOURCE] Building from object --> " + JSON.stringify(object));
            this.id = (object.id !== undefined) ? object.id : this.id;
            this.providerCode = (object.providerCode !== undefined) ? object.providerCode : this.providerCode;
            this.compactIdentifierResolvedUrl = (object.compactIdentifierResolvedUrl !== undefined) ? object.compactIdentifierResolvedUrl : this.compactIdentifierResolvedUrl;
            this.description = (object.description !== undefined) ? object.description : this.description;
            this.location = (object.location !== undefined) ? object.location : this.location;
            this.official = (object.official !== undefined) ? object.official : this.official;
            if (object.recommendation) {
                this.recommendation = new Recommendation(object.recommendation);
            }
            if (object.institution) {
                this.institution = new Institution(object.institution);
            }
        }
    }

    function ResponseResolvePayload() {
        this.resolvedResources = [];
    }

    ResponseResolvePayload.prototype.fromResponsePayload = function (responsePayload) {
        if (responsePayload.resolvedResources) {
            for (var index in responsePayload.resolvedResources) {
                //console.log("[PROCESSING] Resolved Resource " + JSON.stringify(responsePayload.resolvedResources[index]));
                this.resolvedResources[this.resolvedResources.length] = new ResolvedResource(responsePayload.resolvedResources[index]);
            }
        }
    };

    function ServerResponseResolve() {
        ServerResponse.call(this);
        this.payload = new ResponseResolvePayload();
    }
    ServerResponseResolve.prototype = Object.create(ServerResponse.prototype);
    ServerResponseResolve.prototype.constructor = ServerResponseResolve;
    // --- END - (RESOLVER) Compact ID Resolution Services ---

    // --- Service Wrappers --- RESOLVER
    function ResolverService(host, port) {
        this.host = host;
        this.port = port;
        console.info("Instance of Resolver Service at host ", host, ", port ", port);
    }

    ResolverService.prototype.resolve = function (callback, compactId, selector) {
        var endpoint = scheme + "://" + this.host + ":" + this.port;
        if (typeof selector !== "undefined") {
            endpoint = endpoint + "/" + selector;
        }
        endpoint = endpoint + "/" + compactId;
        // Prepare default response
        var response = new ServerResponseResolve();
        var processResponse = function (xhr) {
            console.debug("Resolve Response, HTTP Status " + xhr.status + " - Response text: " + xhr.responseText);
            response.httpStatus = xhr.status;
            response.errorMessage = xhr.statusText;
            if (xhr.responseText) {
                response.fromResponse(JSON.parse(xhr.responseText));
            }
            callback(response);
        };
        getAjax(endpoint, processResponse, processResponse);
    };

    ResolverService.prototype.getHighestRecommendedResolvedResource = function (resolvedResources) {
        return this.sortResolvedResourcesByRecommendationIndexAscending(resolvedResources)[resolvedResources.length - 1];
    };

    ResolverService.prototype.sortResolvedResourcesByRecommendationIndexAscending = function (resolvedResources) {
        if (resolvedResources) {
            return resolvedResources.sort(function (a, b) {
                return a.recommendation.recommendationIndex - b.recommendation.recommendationIndex; });
        }
        return resolvedResources;
    };

    function printResolveResponse(compactId, selector) {
        return function (response) {
            console.log("==================================================================");
            console.log("---> Resolution of Compact ID '" + compactId + "'");
            if (typeof selector !== "undefined")
                console.log("\tSelector '" + selector + "'");
            console.log("\tResponse API Version " + response.apiVersion);
            console.log("\tHTTP Status " + response.httpStatus);
            console.log("\tError Message " + response.errorMessage);
            if (response.payload) {
                console.log("\tPayload contains " + response.payload.resolvedResources.length + " resolved resources");
                if (response.payload.resolvedResources) {
                    response.payload.resolvedResources.forEach(function (resolvedResource) {
                        console.log("\t- Resolved Resource Location '" + resolvedResource.location + "'");
                        console.log("\t\tInformation: " + resolvedResource.description);
                        console.log("\t\tAccess URL: " + resolvedResource.compactIdentifierResolvedUrl);
                        console.log("\t\tRecommendation Score: " + resolvedResource.recommendation.recommendationIndex);
                    });
                }
            }
            console.log("==================================================================");
        };
    }

    function printResolvedResource(resolvedResource) {
        console.log("============= Resolved Resource ID " + resolvedResource.id + " =======================");
        console.log("\tResolved Resource Location '" + resolvedResource.location + "'");
        console.log("\tResolved Resource Prefix '" + resolvedResource.providerCode + "'");
        console.log("\tInformation: " + resolvedResource.description);
        console.log("\tAccess URL: " + resolvedResource.compactIdentifierResolvedUrl);
        console.log("\tRecommendation Score: " + resolvedResource.recommendation.recommendationIndex);
        console.log("=======================================================");
    }

    function testResolve() {
        var resolver = IdentifiersJS.getResolver('localhost', 8080);
        var compactId = "CHEBI:36927";
        var selector = "ols";
        resolver.resolve(printResolveResponse(compactId), compactId);
        resolver.resolve(printResolveResponse(compactId, selector), compactId, selector);
        console.debug("Highest recommended Resolved Resource:");
        resolver.resolve(function (response) {
            printResolvedResource(resolver.getHighestRecommendedResolvedResource(response.payload.resolvedResources));
        }, compactId);
    }
    // [___ (RESOLVER) Compact ID Resolution Services ___]

    // --- API Services Factory ---
    function factoryGetResolver(host, port) {
        var dstHost = wsResolverHost;
        var dstPort = wsResolverPort;
        if (typeof host !== "undefined") {
            dstHost = host;
            if (typeof port !== "undefined") {
                dstPort = port;
            }
        }
        return new ResolverService(dstHost, dstPort);
    }
    // --- END - API Services Factory ---

    return {
        getResolver: factoryGetResolver,
        unitTestResolver: testResolve,
    };
})();
