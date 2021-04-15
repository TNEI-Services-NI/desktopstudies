from . import simtool_bp
from flask import url_for, redirect
from flask_login import login_required
import package.flaskapp.dash_simtool.app as dash_app


# These routes are prefixed by the blueprint URL prefix
@simtool_bp.route('/')
@login_required
def index():
    return redirect(url_for(dash_app.URL_HOME))

