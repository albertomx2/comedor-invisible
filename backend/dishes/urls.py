from django.urls import path
from .views import (
    DishListCreateView,
    reserve_dish,
    MyDishesListView,
    ReservedDishesListView,
)

urlpatterns = [
    path("", DishListCreateView.as_view(),     name="dish-list"),
    path("<int:pk>/reserve/", reserve_dish,    name="dish-reserve"),
    path("mine/",    MyDishesListView.as_view(),     name="dish-mine"),
    path("reserved/", ReservedDishesListView.as_view(), name="dish-reserved"),
]
