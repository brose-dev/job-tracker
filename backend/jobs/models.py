from django.db import models
from .choices import Status, RemoteType

class Job(models.Model):
    company = models.CharField(verbose_name='Company', max_length=256)
    title = models.CharField(verbose_name='Job Title', max_length=256)
    location = models.CharField(verbose_name='Location', max_length=256, blank=True)
    remote_type = models.CharField(verbose_name='Remote Type', choices=RemoteType.choices, default=RemoteType.REMOTE, max_length=20)
    salary_min = models.IntegerField(verbose_name='Salary Min', null=True, blank=True)
    salary_max = models.IntegerField(verbose_name='Salary Max', null=True, blank=True)
    status = models.CharField(verbose_name='Status', choices=Status.choices, default=Status.MONITORING, max_length=20)
    fit_score = models.IntegerField(verbose_name='Fit Score', null=True, blank=True, help_text='0-100')
    source_url = models.URLField(verbose_name='URL', blank=True)
    date_added = models.DateField(verbose_name='Date Addedd', auto_now_add=True)
    date_applied = models.DateField(verbose_name='Date Applied', blank=True, null=True)
    notes = models.TextField(verbose_name='Notes', blank=True)

    class Meta:
        ordering = ['-date_added']

    def __str__(self):
        return f'{self.title} - {self.company}'
    