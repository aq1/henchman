from django.contrib import admin
from mptt.admin import MPTTModelAdmin

from treasurer.models import *


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin):
    pass


@admin.register(Check)
class CheckAdmin(admin.ModelAdmin):
    pass


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    pass
