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

    function resultsMediator(divId) {
        // TODO
        this.divId = divId;
    }

    return {
        init: initPage
    };
})();

// Set up everything.
window.onload = function () {
    AppSearchHomePageGlue.init();
};