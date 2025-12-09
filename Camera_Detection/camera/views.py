from django.shortcuts import render

# Create your views here.
def homePage(request):
    return render(request, 'home.html')

def loginPage(request):
  return render(request, 'login.html')

def supportPage(request):
  return render(request, 'support.html')

def settingsPage(request):
  return render(request, 'settings.html')

def myCameraPage(request):
  return render(request, 'myCamera.html')

def dashboardPage(request):
  return render(request, 'dashboard.html')

def addCameraPage(request):
  return render(request, 'addCamera.html')

def customizationPage(request):
  return render(request, 'customization.html')


