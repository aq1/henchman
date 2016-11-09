import os
import json

from django.conf import settings
from django.apps import AppConfig, apps
from django.db import models


class UtilsConfig(AppConfig):

    name = 'utils'

    @staticmethod
    def _model_structure_to_json(model):
        data = {
            'name': model._meta.label,
            'fields': [],
        }
        for f in model._meta.fields:
            field = {
                'name': f.name,
                'type': type(f).__name__,
                'required': not f.blank,
            }
            if isinstance(f, models.ForeignKey):
                field['config'] = {
                    'model': f.related_model._meta.label
                }

            data['fields'].append(field)

        return data

    def _get_models_structure(self, app):
        models_to_export = []
        for model in app.get_models():
            models_to_export.append(self._model_structure_to_json(model))
            with open(os.path.join(settings.BASE_DIR, app.name, 'static', app.name, 'models.js'), 'w') as f:
                f.write(json.dumps(models_to_export, ensure_ascii=False, indent=4))

    def ready(self):
        super().ready()
        for n, a in apps.app_configs.items():
            if a.name not in settings.UTILS_APPS_TO_WATCH:
                continue
            self._get_models_structure(a)
