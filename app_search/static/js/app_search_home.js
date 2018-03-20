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

    function ResultsMediator(divId) {
        // TODO
        this.divId = divId;
    }

    ResultsMediator.prototype.showResolutionDataSet = function(dataset) {
        // TODO
    };

    ResultsMediator.prototype.reset = function () {
        // TODO
    };

    return {
        init: initPage
    };
})();

// Set up everything.
window.onload = function () {
    AppSearchHomePageGlue.init();
};