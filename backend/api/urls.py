from django.urls import path
from .views import register, login, FavoriteListCreate, FavoriteDelete

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('favorites/', FavoriteListCreate.as_view()),
    path('favorites/<int:id>/', FavoriteDelete.as_view()),
]
