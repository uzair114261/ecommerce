from django.contrib import admin
from users.models import Customers
# Register your models here.

class CustomersAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'phone_number']
    pass

admin.site.register(Customers, CustomersAdmin)
