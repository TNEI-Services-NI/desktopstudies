from . import simtool_bp
from flask import render_template
from flask_login import login_required
import package.flaskapp.dash_simtool.app as dash_app


@simtool_bp.route('/home')
@login_required
def home():
    return render_template('dash_wrapper.html', dash_url=dash_app.URL_BASE)
