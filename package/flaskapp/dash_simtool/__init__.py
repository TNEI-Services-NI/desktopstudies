from flask import Blueprint
import os

URL_BASE_BP = '/simtool_bp'

simtool_bp = Blueprint(
    'simtool_bp',
    __name__,
    url_prefix=URL_BASE_BP,
    template_folder='templates',
    static_folder='static'
)

TEMPLATES_DIR = os.path.dirname(__file__)+r'/templates'
