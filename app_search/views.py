from django.shortcuts import render

# Create your views here.


# Search Home Page
def home_page(request):
    return render(request, 'home.html')
