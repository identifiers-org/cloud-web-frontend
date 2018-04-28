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
    // Suffixes
    var suffixValidFeedback = 'valid-feedback';
    var suffixInvalidFeedback = 'invalid-feedback';
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
        if (validateFlag) {
            validationMap[formFieldId](function processResponse(validationResponse) {
                // TODO
                if (validationResponse.httpStatus !== 200) {
                    formFieldValidationHandlerError(formFieldId, validationResponse.errorMessage);
                } else {
                    formFieldValidationHandlerSuccess(formFieldId);
                }
            }, prefixRegistrationFormToPayload());
        } else {
            console.warn("Validation is DISABLED");
        }
    }

    function formFieldValidationHandlerSuccess(formFieldId) {
        console.debug("Successful validation of form field ID '" + formFieldId + "'");
        formFieldValidationStatusReset(formFieldId);
        var classes = new Set(document.getElementById(formFieldId).getAttribute('class').split(' '));
        classes.add('is-valid');
        document.getElementById(formFieldId).setAttribute('class', Array.from(classes).join(' '));
    }

    function formFieldValidationHandlerError(formFieldId, errorMessage) {
        console.error("FAILED to validate form field ID '" + formFieldId + "', cause --- '" + errorMessage + "'");
        formFieldValidationStatusReset(formFieldId);
        var classes = new Set(document.getElementById(formFieldId).getAttribute('class').split(' '));
        classes.add('is-invalid');
        document.getElementById(formFieldId).setAttribute('class', Array.from(classes).join(' '));
        var invalidFeedback = document.createElement('div');
        invalidFeedback.setAttribute('id', formFieldId + "-" + suffixInvalidFeedback);
        invalidFeedback.setAttribute('class', "invalid-feedback");
        invalidFeedback.innerText = errorMessage;
        document.getElementById(formFieldId).appendChild(invalidFeedback);
    }

    function formFieldValidationStatusReset(formFieldId) {
        console.debug("Reset styling for form field ID '" + formFieldId + "'");
        // Reset style class
        var classes = new Set(document.getElementById(formFieldId).getAttribute('class').split(' '));
        classes.delete('is-valid');
        classes.delete('is-invalid');
        document.getElementById(formFieldId).setAttribute('class', Array.from(classes).join(' '));
        // TODO - Remove possible failure sibling
    }

    function validateRequester() {
        // TODO
    }

    function validateAllFields() {
        // TODO
    }

    function prefixRegistrationFormToPayload() {
        var payload = new IdentifiersJS.PrefixRegistrationPayload();
        payload.name = document.getElementById(prefixRegistrationFormItemName).value;
        payload.description = document.getElementById(prefixRegistrationFormItemDescription).value;
        payload.homePage = document.getElementById(prefixRegistrationFormItemHomePage).value;
        payload.organization = document.getElementById(prefixRegistrationFormItemOrganization).value;
        payload.preferredPrefix = document.getElementById(prefixRegistrationFormItemPreferredPrefix).value;
        payload.resourceAccessRule = document.getElementById(prefixRegistrationFormItemResourceAccessRule).value;
        payload.exampleIdentifier = document.getElementById(prefixRegistrationFormItemExampleIdentifier).value;
        payload.regexPattern = document.getElementById(prefixRegistrationFormItemRegexPattern).value;
        payload.references = document.getElementById(prefixRegistrationFormItemPublication).value.split(',');
        payload.additionalInformation = document.getElementById(prefixRegistrationFormItemAdditionalInformation).value;
        payload.requester.name = document.getElementById(prefixRegistrationFormItemRequesterName).value;
        payload.requester.email = document.getElementById(prefixRegistrationFormItemRequesterEmail).value;
        return payload;
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
        validationMap[prefixRegistrationFormItemName] = function(callback, payload) {registryService.requestValidationName(callback, payload);};
        validationMap[prefixRegistrationFormItemDescription] = function(callback, payload) {registryService.requestValidationDescription(callback,payload);};
        validationMap[prefixRegistrationFormItemHomePage] = function(callback, payload) {registryService.requestValidationHomePage(callback, payload);};
        validationMap[prefixRegistrationFormItemOrganization] = function(callback, payload) {registryService.requestValidationOrganization(callback, payload);};
        validationMap[prefixRegistrationFormItemPreferredPrefix] = function(callback, payload) {registryService.requestValidationPreferredPrefix(callback, payload);};
        validationMap[prefixRegistrationFormItemResourceAccessRule] = function(callback, payload) {registryService.requestValidationResourceAccessRule(callback, payload);};
        validationMap[prefixRegistrationFormItemExampleIdentifier] = function(callback, payload) {registryService.requestValidationExampleIdentifier(callback, payload);};
        validationMap[prefixRegistrationFormItemRegexPattern] = function(callback, payload) {registryService.requestValidationRegexPattern(callback, payload);};
        validationMap[prefixRegistrationFormItemPublication] = function(callback, payload) {registryService.requestValidationReferences(callback, payload);};
        validationMap[prefixRegistrationFormItemAdditionalInformation] = function(callback, payload) {registryService.requestValidationAdditionalInformation(callback, payload);};
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