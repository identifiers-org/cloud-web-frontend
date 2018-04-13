from django.http import HttpResponse
from django.shortcuts import render
from .models import HomePage as HomePageModel
from .models import ResolutionModel
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
    return HttpResponse(log_message)


def resolve_with_selector(request, selector, compact_id):
    log_message = "Resolution request received for Compact ID {}, using selector {}".format(compact_id, selector)
    logger.debug(log_message)
    return HttpResponse(log_message)

