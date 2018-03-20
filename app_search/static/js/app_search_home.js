/**
 * Project: cloud-web-frontend
 * Timestamp: 2018-03-20 12:19
 * @author Manuel Bernal Llinares <mbdebian@gmail.com>
 * ---
 *
 * Javascript glue for the resolution page.
 */
var AppSearchHomePageGlue = (function () {
    // TODO
    function initPage() {
        // This function hooks all the events to the webpage
        console.debug("Initialize page Javascript...")
        var resolutionRequestController = new ResolutionRequestController("resolution_form",
            "resolve_input_box",
            "btn_resolve",
            "btn_resolve_lucky")
    }

    // Resolution request controller
    function ResolutionRequestController(resolutionFormId, inputTextId, btnResolveId, btnLuckyId) {
        this.resolutionFormId = resolutionFormId;
        this.inputTextId = inputTextId;
        this.btnResolveId = btnResolveId;
        this.btnLuckyId = btnLuckyId;
        console.debug("Wiring the Resolution Request Controller");
        // Attach events
        document.getElementById(resolutionFormId).addEventListener("submit", this.formSubmit);
        document.getElementById(btnResolveId).addEventListener("click", this.clickBtnResolve);
        document.getElementById(btnLuckyId).addEventListener("click", this.clickBtnLucky);
    }

    ResolutionRequestController.prototype.clickBtnLucky = function (event) {
        event.preventDefault();
        // TODO
        console.debug("I'm gonna be lucky CLICKED");
        return false;
    };

    ResolutionRequestController.prototype.clickBtnResolve = function (event) {
        event.preventDefault();
        // TODO
        console.debug("Resolve Button CLICKED");
        return false;
    };

    ResolutionRequestController.prototype.formSubmit = function (event) {
        // TODO
        event.preventDefault();
        console.debug("Hit enter in resolution request form");
        return false;
    };
    // END --- Resolution request controller

    // Resolution Results Controller
    function ResolutionResultsController(divId) {
        // TODO
        this.divId = divId;
    }

    ResolutionResultsController.prototype.showResolutionDataSet = function(dataset) {
        // TODO
    };

    ResolutionResultsController.prototype.reset = function () {
        // TODO
    };
    // END --- Resolution Results Controller

    return {
        init: initPage
    };
})();

// Set up everything.
window.onload = function () {
    AppSearchHomePageGlue.init();
};