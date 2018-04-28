/**
 * Project   : cloud-web-frontend
 * Timestamp : 19-04-2018 7:35
 * Author    : Manuel Bernal Llinares <mbdebian@gmail.com>
 * ---
 *
 * Javascript glue for prefix registration web page
 */
var PrefixRegistrationWebPageGlue = (function () {
    // This is the glue doing all the magic in the prefix registration request page.
    // Activate validation of data from form fields upon losing focus
    var validateFlag = false;
    // Prefix Registration form items
    var prefixRegistrationFormItemName = "prefixRegistrationName";
    var prefixRegistrationFormItemDescription = "prefixRegistrationDescription";
    var prefixRegistrationFormItemHomePage = "prefixRegistrationHomePage";
    var prefixRegistrationFormItemOrganization = "prefixRegistrationOrganization";
    var prefixRegistrationFormItemPreferredPrefix = "prefixRegistrationPreferredPrefix";
    var prefixRegistrationFormItemResourceAccessRule = "prefixRegistrationResourceAccessRule";
    var prefixRegistrationFormItemExampleIdentifier = "prefixRegistrationExampleIdentifier";
    var prefixRegistrationFormItemRegexPattern = "prefixRegistrationRegexPattern";
    var prefixRegistrationFormItemPublication = "prefixRegistrationPublication";
    var prefixRegistrationFormItemAdditionalInformation = "prefixRegistrationAdditionalInformation";
    var prefixRegistrationFormItemRequesterName = "prefixRegistrationRequesterName";
    var prefixRegistrationFormItemRequesterEmail = "prefixRegistrationRequesterEmail";
    // Registry Service
    var registryService;

    // Validation function
    function validateFormField(event) {
        // TODO
    }

    function initPage() {
        // TODO - Glue all the web page elements
        registryService = IdentifiersJS.getRegistry(prefixRegistrationWebServiceHost, prefixRegistrationWebServicePort);
    }

    return {
        init: initPage
    };
})();

// Set up everything.
window.onload = function () {
    PrefixRegistrationWebPageGlue.init();
};