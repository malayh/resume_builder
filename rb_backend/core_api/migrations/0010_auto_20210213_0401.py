# Generated by Django 3.1.5 on 2021-02-13 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_api', '0009_contact_resume_map_education_resume_map_project_resume_map_project_summary_resume_map_resume_subsect'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact_resume_map',
            name='template_prop',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='education_resume_map',
            name='template_prop',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='project_resume_map',
            name='template_prop',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='project_summary_resume_map',
            name='template_prop',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='skill_resume_map',
            name='template_prop',
            field=models.TextField(null=True),
        ),
    ]