# Generated by Django 3.1.5 on 2021-02-01 07:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core_api', '0006_auto_20210201_0600'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume_content_section_positions',
            name='user_fk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.rb_user'),
            preserve_default=False,
        ),
    ]
