from django.http import HttpResponse, HttpResponseRedirect, HttpResponseServerError
from django.shortcuts import render
from .models import HomePage as HomePageModel
from .models import ResolutionModel
from .models import PrefixRegistrationHomePage as PrefixRegistrationModel
# Application imports
import config_manager

# Views logger
logger = config_manager.get_app_config_manager().get_logger_for(__name__)

# Create your views here.


# Search Home Page
def home_page(request):
    resolver_host, resolver_port = HomePageModel.get_resolver_host_and_port()
    return render(request, 'home.html', {"resolver_host": resolver_host, "resolver_port": resolver_port})


def resolve(request, compact_id):
    # TODO - Ignore favicon.ico request for now, but this needs to be changed later
    log_message = ""
    if (compact_id == 'favicon.ico'):
        logger.info("[Hack] Ignoring request on 'favicon.ico'")
        return HttpResponse(log_message)
    log_message = "Resolution request received for Compact ID {}".format(compact_id)
    logger.debug(log_message)
    model = ResolutionModel()
    server_response, selected_resolved_resource = model.resolve(compact_id)
    if server_response.http_status != 200:
        # TODO - We should redirect to an error page
        return HttpResponse(server_response.error_message, status=server_response.http_status)
    if selected_resolved_resource:
        return HttpResponseRedirect(selected_resolved_resource.access_url)
    # Handle error where no resource could be selected
    return HttpResponseServerError("Request for Compact ID '{}' could not be completed "
                                   "due to an error selecting a suitable provider".format(compact_id))


def resolve_with_selector(request, selector, compact_id):
    log_message = "Resolution request received for Compact ID {}, using selector {}".format(compact_id, selector)
    logger.debug(log_message)
    model = ResolutionModel()
    server_response, selected_resolved_resource = model.resolve_with_selector(compact_id, selector)
    if server_response.http_status != 200:
        # TODO - We should redirect to an error page
        return HttpResponse(server_response.error_message, status=server_response.http_status)
    if selected_resolved_resource:
        return HttpResponseRedirect(selected_resolved_resource.access_url)
    # Handle error where no resource could be selected
    return HttpResponseServerError("Request for Compact ID '{}' could not be completed "
                                   "due to an error selecting a suitable provider".format(compact_id))


# Prefix Registration Page
def prefix_registration(request):
    # Get the registry host and port
    registry_host, registry_port = PrefixRegistrationModel.get_registry_host_and_port()
    return render(request, 'prefix_registration.html', {'registry_host': registry_host, 'registry_port': registry_port})