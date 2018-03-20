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
        console.debug("Initialize page Javascript...");
        resolver = IdentifiersJS.getResolver(resolverHost, resolverPort);
        resolutionRequestController = new ResolutionRequestController("resolution_form",
            "resolve_input_box",
            "btn_resolve",
            "btn_resolve_lucky");
        messageBannerController = new MessageBannerController('error_warning');
        resolutionResultsController = new ResolutionResultsController('resolution_results');
    }

    // Resolution request controller
    function ResolutionRequestController(resolutionFormId, inputTextId, btnResolveId, btnLuckyId) {
        this.resolutionFormId = resolutionFormId;
        this.inputTextId = inputTextId;
        this.btnResolveId = btnResolveId;
        this.btnLuckyId = btnLuckyId;
        console.debug("Wiring the Resolution Request Controller");
        // Attach events
        this.clickBtnLuckyListenerSetup()
        document.getElementById(resolutionFormId).addEventListener("submit", this.formSubmit);
        document.getElementById(btnResolveId).addEventListener("click", this.clickBtnResolve);

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
                    console.debug("Redirecting to Resolved Resource");
                    printResolvedResource(resolvedResource);
                    // TODO - Redirect
                }
            }, that.getInputCompactId());
            console.debug("I'm gonna be lucky CLICKED");
            return false;
        });
    };

    ResolutionRequestController.prototype.clickBtnResolve = function (event) {
        event.preventDefault();
        // TODO
        // TODO - Resolve Compact ID
        // TODO - If there's only one Resolved Resource, redirect
        // TODO - Tell the Resolved Resource diplay to show the options
        console.debug("Resolve Button CLICKED");
        return false;
    };

    ResolutionRequestController.prototype.formSubmit = function (event) {
        // TODO
        // TODO - Do the same as the "lucky" button
        event.preventDefault();
        console.debug("Hit enter in resolution request form");
        return false;
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

    ResolutionResultsController.prototype.showResolutionDataSet = function (dataset) {
        // TODO
    };

    ResolutionResultsController.prototype.reset = function () {
        // TODO
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