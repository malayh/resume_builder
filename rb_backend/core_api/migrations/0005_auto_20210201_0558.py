# Generated by Django 3.1.5 on 2021-02-01 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_api', '0004_auto_20210130_0612'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume_project_summary_map',
            name='position',
            field=models.IntegerField(default=0, unique=True),
        ),
        migrations.AlterField(
            model_name='resume_contact_detail_map',
            name='position',
            field=models.IntegerField(default=0, unique=True),
        ),
        migrations.AlterField(
            model_name='resume_education_project_summary_map',
            name='position',
            field=models.IntegerField(default=0, unique=True),
        ),
    ]
