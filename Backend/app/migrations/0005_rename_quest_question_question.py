# Generated by Django 4.2.2 on 2023-07-01 07:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_rename_question_question_quest'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='quest',
            new_name='question',
        ),
    ]
