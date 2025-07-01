from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Dish
from .serializers import DishSerializer

class DishListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/dishes/       → lista sólo disponibles (is_taken=False)
    POST /api/dishes/       → crear (auth)
    """
    serializer_class   = DishSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Dish.objects.filter(is_taken=False).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def reserve_dish(request, pk):
    """
    POST /api/dishes/{pk}/reserve/ → reserva un plato (marca is_taken y reserved_by)
    """
    try:
        dish = Dish.objects.get(pk=pk, is_taken=False)
    except Dish.DoesNotExist:
        return Response({"detail": "No disponible"}, status=status.HTTP_404_NOT_FOUND)

    dish.is_taken    = True
    dish.reserved_by = request.user
    dish.reserved_at = timezone.now()
    dish.save()
    return Response(DishSerializer(dish).data, status=status.HTTP_200_OK)


class MyDishesListView(generics.ListAPIView):
    """
    GET /api/dishes/mine/ → platos creados por el usuario
    """
    serializer_class   = DishSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Dish.objects.filter(creator=self.request.user).order_by("-created_at")


class ReservedDishesListView(generics.ListAPIView):
    """
    GET /api/dishes/reserved/ → platos reservados por el usuario
    """
    serializer_class   = DishSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Dish.objects.filter(reserved_by=self.request.user).order_by("-reserved_at")
