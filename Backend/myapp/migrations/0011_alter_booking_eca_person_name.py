# Generated by Django 5.1.6 on 2025-02-20 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0010_timeslot'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='eca_person_name',
            field=models.CharField(max_length=50),
        ),
    ]
