from django.shortcuts import render


# Create your views here.


# Search Home Page
def home_page(request):
    return render(request, 'home.html')


def resolve(request, compact_id):
    pass


def resolve_with_selector(request, selector, compact_id):
    pass
