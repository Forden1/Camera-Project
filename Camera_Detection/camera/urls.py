from tkinter.font import names
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views, api

urlpatterns = [
  path('', views.homePage, name='index'),
  path('add', views.addCameraPage, name='addCamera'),
  path('edits', views.customizationPage, name='customization'),
  path('dashboard', views.dashboardPage, name='dashboard'),
  path('camera', views.myCameraPage, name='myCameras'),
  path('settings', views.settingsPage, name='settings'),
  path('support', views.supportPage, name='support'),

  # API Routes
  path('api/register/', api.RegisterView.as_view(), name='register'),
  path('api/dashboard/', api.DashboardView.as_view(), name='dashboard_api'),
  path('api/settings/', api.SettingsView.as_view(), name='settings_api'),
  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
