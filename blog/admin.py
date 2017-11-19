from django.contrib import admin

from blog.models import *


@admin.register(Post)
class AccountAdmin(admin.ModelAdmin):
    pass


@admin.register(Comment)
class CategoryAdmin(admin.ModelAdmin):
    pass
