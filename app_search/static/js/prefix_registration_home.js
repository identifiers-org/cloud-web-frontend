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
    var validateFlag = true;
    // Prefix Registration form items
    var prefixRegistrationFormId = "prefix_registration_form_id";
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
    // Validation map
    var validationMap = {};

    // Validation function
    function validateFormFieldTriggerListener(event) {
        event.preventDefault();
        var elementId = this.getAttribute('id');
        console.debug("Validation triggered for form field ID '" + elementId + "'");
        validateFormField(elementId);
        return false;
    }

    function validateFormField(formFieldId) {
        // TODO
    }

    function formFieldValidationHandlerSuccess(formFieldId) {
        // TODO
    }

    function formFieldValidationHandlerError(formFieldId, error) {
        // TODO
    }

    function formFieldValidationStatusReset(formFieldId) {
        // TODO
    }

    function validateRequester() {
        // TODO
    }

    function validateAllFields() {
        // TODO
    }

    function attachValidationListeners() {
        for (const [formFieldId, validationFunction] of Object.entries(validationMap)) {
            console.debug("Attaching validation listener to form field ID '" + formFieldId + "'");
            document.getElementById(formFieldId).addEventListener('focusout', validateFormFieldTriggerListener);
        }
    }

    function initPage() {
        // TODO - Glue all the web page elements
        registryService = IdentifiersJS.getRegistry(prefixRegistrationWebServiceHost, prefixRegistrationWebServicePort);
        // Build the validation map
        validationMap[prefixRegistrationFormItemName] = registryService.requestValidationName;
        validationMap[prefixRegistrationFormItemDescription] = registryService.requestValidationDescription;
        validationMap[prefixRegistrationFormItemHomePage] = registryService.requestValidationHomePage;
        validationMap[prefixRegistrationFormItemOrganization] = registryService.requestValidationOrganization;
        validationMap[prefixRegistrationFormItemPreferredPrefix] = registryService.requestValidationPreferredPrefix;
        validationMap[prefixRegistrationFormItemResourceAccessRule] = registryService.requestValidationResourceAccessRule;
        validationMap[prefixRegistrationFormItemExampleIdentifier] = registryService.requestValidationExampleIdentifier;
        validationMap[prefixRegistrationFormItemRegexPattern] = registryService.requestValidationRegexPattern;
        validationMap[prefixRegistrationFormItemPublication] = registryService.requestValidationReferences;
        validationMap[prefixRegistrationFormItemAdditionalInformation] = registryService.requestValidationAdditionalInformation;
        validationMap[prefixRegistrationFormItemRequesterName] = validateRequester;
        validationMap[prefixRegistrationFormItemRequesterEmail] = validateRequester;
        // Attach the validation function to each form field
        attachValidationListeners();
    }

    return {
        init: initPage
    };
})();

// Set up everything.
window.onload = function () {
    PrefixRegistrationWebPageGlue.init();
};