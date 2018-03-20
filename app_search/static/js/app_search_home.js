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
    function init_page() {
        console.debug("Initialize page Javascript...")
    }

    return {
        init: init_page
    };
})();

// Set up everything.
window.onload = function () {
    AppSearchHomePageGlue.init();
};