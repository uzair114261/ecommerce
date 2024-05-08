from django.urls import path
from users import views

urlpatterns = [
    path('api/create-customer/', views.create_customer, name='create_customer'),
    path('login/', views.LoginView.as_view(), name='login')
]
