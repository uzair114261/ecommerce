from django.contrib import admin
from product.models import *
# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display= ('name', 'price', 'category', 'stock_quantity')
    list_editable = ('price', 'stock_quantity')
    prepopulated_fields = {'slug': ('name',)}   

class CategoryAdmin(admin.ModelAdmin):
    pass


admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)