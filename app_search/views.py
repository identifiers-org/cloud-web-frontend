from django.shortcuts import render


# Create your views here.


# Search Home Page
def home_page(request):
    return render(request, 'home.html')


def resolve(request, compact_id):
    return "Resolution request received for Compact ID {}".format(compact_id)


def resolve_with_selector(request, selector, compact_id):
    return "Resolution request received for Compact ID {}, using selector {}".format(compact_id, selector)

