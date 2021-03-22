from . import simtool_bp
from flask import render_template
from flask_login import login_required
import package.flaskapp.dash_simtool.app as dash_app


@simtool_bp.route('/blueprint_url')
@login_required
def app1_template():
    return render_template('app1.html', dash_url=dash_app.URL_BASE)
