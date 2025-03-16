from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsersViewSet

router = DefaultRouter()
router.register(r"users", UsersViewSet, basename="users")

urlpatterns = [
    path("", include(router.urls)),
]