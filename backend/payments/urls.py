from django.urls import path
from payments import views
urlpatterns = [
    path('card-transaction', views.CardTransaction, name='checkout'),
    path('cod-payment', views.CODPurchasedItems, name='cod-payments' )
]