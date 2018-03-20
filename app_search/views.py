from django.http import HttpResponse
from django.shortcuts import render
from .models import HomePage as HomePageModel

# Create your views here.


# Search Home Page
def home_page(request):
    resolver_host, resolver_port = HomePageModel.get_resolver_host_and_port()
    return render(request, 'home.html', {"resolver_host": resolver_host, "resolver_port": resolver_port})


def resolve(request, compact_id):
    return HttpResponse("Resolution request received for Compact ID {}".format(compact_id))


def resolve_with_selector(request, selector, compact_id):
    return HttpResponse("Resolution request received for Compact ID {}, using selector {}".format(compact_id, selector))

