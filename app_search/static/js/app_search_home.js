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
    }

    // Resolution request controller
    function ResolutionRequestController(inputTextId, btnResolveId, btnLuckyId) {
        // TODO
        this.inputTextId = inputTextId;
        this.btnResolveId = btnResolveId;
        this.btnLuckyId = btnLuckyId;
    }

    ResolutionRequestController.prototype.clickBtnLucky = function () {
        // TODO
    };

    ResolutionRequestController.prototype.clickBtnResolve = function () {
        // TODO
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