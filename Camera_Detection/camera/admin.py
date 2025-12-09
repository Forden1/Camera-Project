from django.contrib import admin
from .models import Customer, Camera, Feature, CameraFeatures, DetectionRecord


class CustomerAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "is_active")
    search_fields = ("username", "email")

class CameraAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "location", "customer_id", "locked", "created_at")
    list_filter = ("locked",)


class FeatureAdmin(admin.ModelAdmin):
    list_display = ("id", "code", "description")


class CameraFeatureAdmin(admin.ModelAdmin):
    list_display = ("camera_id", "feature_id", "is_enabled", "created_at", "config")

class DetectionAdmin(admin.ModelAdmin):
  list_display = ("id", "camera_id", "customer_id", "feature_id", "detected_at")


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Camera, CameraAdmin)
admin.site.register(Feature, FeatureAdmin)
admin.site.register(CameraFeatures, CameraFeatureAdmin)
admin.site.register(DetectionRecord, DetectionAdmin)
