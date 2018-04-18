/**
 * Project: cloud-web-frontend
 * Timestamp: 2018-03-20 12:19
 * @author Manuel Bernal Llinares <mbdebian@gmail.com>
 * ---
 *
 * Javascript glue for the resolution page.
 */
var AppSearchHomePageGlue = (function () {
    // To simplify things, as all these components are not generic, they are going to be coupled, and I'll save a lot of
    // coding on event producers and consumers, as well as a big mediator.
    var resolver;
    var resolutionRequestController;
    var resolutionResultsController;
    var messageBannerController;

    function initPage() {
        // This function hooks all the events to the webpage
        resolver = IdentifiersJS.getResolver(resolverHost, resolverPort);
        resolutionRequestController = new ResolutionRequestController("resolution_form",
            "resolve_input_box",
            "btn_resolve",
            "btn_resolve_lucky",
            "navbar_resolution_form",
            "navbar_resolve_input_box",
            "navbar_btn_resolve",
            "navbar_btn_resolve_lucky");
        messageBannerController = new MessageBannerController('message_banner');
        resolutionResultsController = new ResolutionResultsController('resolution_results');
        // Set the focus on the search box
        document.getElementById('resolve_input_box').focus();
    }

    // Resolution request controller
    function ResolutionRequestController(resolutionFormId,
                                         inputTextId,
                                         btnResolveId,
                                         btnLuckyId,
                                         navBarResolutionFormId,
                                         navBarInputTextId,
                                         navBarBtnResolveId,
                                         navBarBtnLuckyId) {
        this.resolutionFormId = resolutionFormId;
        this.inputTextId = inputTextId;
        this.btnResolveId = btnResolveId;
        this.btnLuckyId = btnLuckyId;
        this.navBarResolutionFormId = navBarResolutionFormId;
        this.navBarInputTextId = navBarInputTextId;
        this.navBarBtnResolveId = navBarBtnResolveId;
        this.navBarBtnLuckyId = navBarBtnLuckyId;
        console.debug("Wiring the Resolution Request Controller");
        // Attach events
        this.clickBtnLuckyListenerSetup();
        this.clickBtnResolveListenerSetup();
        this.formSubmitListenerSetup();
    }

    ResolutionRequestController.prototype.clickBtnLuckyListenerSetup = function () {
        that = this;
        document.getElementById(this.btnLuckyId).addEventListener("click", function (event) {
            event.preventDefault();
            // Resolve Compact ID
            getResolvedResources(function (resolvedResources) {
                if (resolvedResources) {
                    // Select Highest Scored Resolved Resource
                    resolvedResource = resolver.getHighestRecommendedResolvedResource(resolvedResources);
                    // TODO - Perfect place for metrics collection
                    location.replace(resolvedResource.accessUrl);
                }
            }, that.getInputCompactId(that.inputTextId));
            return false;
        });
        // TODO - Refactor this later
        document.getElementById(this.navBarBtnLuckyId).addEventListener("click", function (event) {
            event.preventDefault();
            // Resolve Compact ID
            getResolvedResources(function (resolvedResources) {
                if (resolvedResources) {
                    // Select Highest Scored Resolved Resource
                    resolvedResource = resolver.getHighestRecommendedResolvedResource(resolvedResources);
                    // TODO - Perfect place for metrics collection
                    location.replace(resolvedResource.accessUrl);
                }
            }, that.getInputCompactId(that.navBarInputTextId));
            return false;
        });
    };

    ResolutionRequestController.prototype.clickBtnResolveListenerSetup = function () {
        that = this;
        document.getElementById(this.btnResolveId).addEventListener("click", function (event) {
            event.preventDefault();
            resolutionResultsController.reset();
            // TODO - Sync this search box with the other one
            // TODO - Hide the main search box
            // TODO - Unhide the search box that is running in the navigation bar
            // Resolve Compact ID
            getResolvedResources(function (resolvedResources) {
                if (resolvedResources) {
                    if (resolvedResources.length == 1) {
                        // If there's only one Resolved Resource, redirect
                        // TODO - Perfect place for metrics collection
                        location.replace(resolvedResources[0].accessUrl);
                    }
                    // Tell the Resolved Resource display to show the options
                    resolutionResultsController.showResolutionDataSet(resolvedResources);
                }
            }, that.getInputCompactId(that.inputTextId));
            return false;
        });
        // TODO - Refactor this out later
        document.getElementById(this.navBarBtnResolveId).addEventListener("click", function (event) {
            event.preventDefault();
            resolutionResultsController.reset();
            // Resolve Compact ID
            getResolvedResources(function (resolvedResources) {
                if (resolvedResources) {
                    if (resolvedResources.length == 1) {
                        // If there's only one Resolved Resource, redirect
                        // TODO - Perfect place for metrics collection
                        location.replace(resolvedResources[0].accessUrl);
                    }
                    // Tell the Resolved Resource display to show the options
                    resolutionResultsController.showResolutionDataSet(resolvedResources);
                }
            }, that.getInputCompactId(that.navBarInputTextId));
            return false;
        });
    };

    ResolutionRequestController.prototype.formSubmitListenerSetup = function () {
        that = this;
        document.getElementById(this.resolutionFormId).addEventListener("submit", function (event) {
            event.preventDefault();
            // TODO - Change this to 'resolve' instead of redirection
            // Resolve Compact ID
            /*getResolvedResources(function (resolvedResources) {
                if (resolvedResources) {
                    // Select Highest Scored Resolved Resource
                    resolvedResource = resolver.getHighestRecommendedResolvedResource(resolvedResources);
                    // TODO - Perfect place for metrics collection
                    location.replace(resolvedResource.accessUrl);
                }
            }, that.getInputCompactId());
            return false;
        });*/
            getResolvedResources(function (resolvedResources) {
                if (resolvedResources) {
                    if (resolvedResources.length == 1) {
                        // If there's only one Resolved Resource, redirect
                        // TODO - Perfect place for metrics collection
                        location.replace(resolvedResources[0].accessUrl);
                    }
                    // Tell the Resolved Resource display to show the options
                    resolutionResultsController.showResolutionDataSet(resolvedResources);
                }
            }, that.getInputCompactId(that.inputTextId));
            return false;
        });
    };
    // END --- Resolution request controller

    ResolutionRequestController.prototype.getInputCompactId = function () {
        console.debug("Get the Compact ID entered");
        return document.getElementById(this.inputTextId).value;
    };

    // Resolution Results Controller
    function ResolutionResultsController(divId) {
        // TODO
        this.divId = divId;
    }

    ResolutionResultsController.prototype.showResolutionDataSet = function (resolvedResources) {
        // TODO
        console.debug("ResolutionResultsController - asked to show " + resolvedResources.length + " Resolved Resources");
        resultsDiv = document.getElementById(this.divId);
        // TODO - Perfect place for metrics collection by inserting extra code in the displayed URL links
        resolver.sortResolvedResourcesByRecommendationIndexAscending(resolvedResources);
        resolvedResources.reverse();
        resolvedResources.forEach(function (resolvedResource) {
            // Resource DIV
            resourceDiv = document.createElement('div');
            resourceDiv.setAttribute('id', resolvedResource.id);
            resourceDiv.setAttribute('class', "searchResultItem");
            // Resource AccessUrl
            accessUrlDiv = document.createElement('div');
            accessUrlDiv.setAttribute('id', resolvedResource.id + "_accessUrl");
            accessUrlDiv.setAttribute('class', 'searchResultAccessUrl');
            accessUrlLink = document.createElement('a');
            accessUrlLink.setAttribute('href', resolvedResource.accessUrl);
            accessUrlLink.innerText = resolvedResource.info;
            accessUrlDiv.appendChild(accessUrlLink);
            // Access URL plain text
            accessUrlPlainText = document.createElement('div');
            accessUrlPlainText.setAttribute('id', resolvedResource.id + "_accessUrlPlainText");
            accessUrlPlainText.setAttribute('class', 'searchResultAccessUrlText');
            accessUrlPlainText.innerText = resolvedResource.accessUrl;
            // Resource institution information
            institutionInfoDiv = document.createElement('div');
            institutionInfoDiv.setAttribute('id', resolvedResource.id + "_institution");
            institutionInfoDiv.setAttribute('class', 'searchResultInstitution');
            institutionInfoDiv.innerText = resolvedResource.institution;
            // Recommendation Score / Index
            recommendationIndexDiv = document.createElement('div');
            recommendationIndexDiv.setAttribute('id', resolvedResource.id + "_recommendationIndex");
            recommendationIndexDiv.setAttribute('class', 'searchResultRecommendationIndex');
            recommendationIndexDiv.innerText = "Score: " + resolvedResource.recommendation.recommendationIndex;
            // Location Information
            locationDiv = document.createElement('div');
            locationDiv.setAttribute('id', resolvedResource.id + "_location");
            locationDiv.setAttribute('class', 'searchResultLocation');
            locationDiv.innerText = resolvedResource.location;
            // Put everything together
            resourceDiv.appendChild(accessUrlDiv);
            resourceDiv.appendChild(accessUrlPlainText);
            resourceDiv.appendChild(institutionInfoDiv);
            resourceDiv.appendChild(recommendationIndexDiv);
            resourceDiv.appendChild(locationDiv);
            // Append to results
            resultsDiv.appendChild(resourceDiv);
        });

    };

    ResolutionResultsController.prototype.reset = function () {
        var resultsNode = document.getElementById(this.divId);
        while (resultsNode.firstChild) {
            resultsNode.removeChild(resultsNode.firstChild);
        }

    };
    // END --- Resolution Results Controller

    // Message Banner Controller
    function MessageBannerController(divId) {
        this.divId = divId
    }

    MessageBannerController.prototype.reset = function () {
        // TODO
    };

    MessageBannerController.prototype.error = function (errorMessage) {
        // TODO
    };

    MessageBannerController.prototype.warning = function (warningMessage) {
        // TODO
    };
    // END --- Message Banner Controller

    // Resolution Helper
    function getResolvedResources(callback, compactId, selector) {
        resolver.resolve(function (response) {
            // TODO
            if (response.httpStatus !== 200) {
                // TODO - Handle the error
                console.error("ERROR RESPONSE FROM THE RESOLVER, TODO HANDLER");
            }
            callback(response.payload.resolvedResources);
        }, compactId, selector);
    }

    // END --- Resolution Helper
    // Debug Helper
    function printResolvedResource(resolvedResource) {
        console.log("============= Resolved Resource ID " + resolvedResource.id + " =======================");
        console.log("\tResolved Resource Location '" + resolvedResource.location + "'");
        console.log("\tResolved Resource Prefix '" + resolvedResource.resourcePrefix + "'");
        console.log("\tInformation: " + resolvedResource.info);
        console.log("\tAccess URL: " + resolvedResource.accessUrl);
        console.log("\tRecommendation Score: " + resolvedResource.recommendation.recommendationIndex);
        console.log("=======================================================");
    }

    // END --- Debug Helper

    return {
        init: initPage
    };
})();

// Set up everything.
window.onload = function () {
    AppSearchHomePageGlue.init();
};