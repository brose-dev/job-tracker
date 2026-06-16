from django.db import models

class Status(models.TextChoices):
    MONITORING = 'monitoring', 'Monitoring'
    APPLIED = 'applied', 'Applied'
    INTERVIEWING = 'interviewing', 'Interviewing'
    PASSED = 'passed', 'Passed'
    REJECTED = 'rejected', 'Rejected'

class RemoteType(models.TextChoices):
    REMOTE = 'remote', 'Remote'
    HYBRID = 'hybrid', 'Hybrid'
    ONSITE = 'onsite', 'Onsite'