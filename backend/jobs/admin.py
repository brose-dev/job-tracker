from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'status', 'fit_score', 'remote_type', 'date_added')
    list_filter = ('status', 'remote_type')
    search_fields = ('company', 'title')
    