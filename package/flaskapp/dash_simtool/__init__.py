from flask import Blueprint
import os

simtool_bp = Blueprint(
    'dash_simtool_app',
    __name__,
    url_prefix='/simtool',
    template_folder='templates',
    static_folder='static'
)

TEMPLATES_DIR = os.path.dirname(__file__)+r'\templates\\'