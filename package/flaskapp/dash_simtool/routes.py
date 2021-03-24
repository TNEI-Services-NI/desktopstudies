from . import simtool_bp
from flask import render_template, request, jsonify
from flask_login import login_required
import package.flaskapp.dash_simtool.app as dash_app


@simtool_bp.route('/home')
@login_required
def home():
    return render_template('dash_wrapper.html', dash_url=dash_app.URL_BASE)


##testing javascript call
@simtool_bp.route("/receive_breaker/", methods=["GET",'POST'])
# @login_required
def receive_breaker():
    if request.method == 'POST':
        print("message received securely")
        return jsonify("message received securely")
    else:
        print("message received in-securely")
        return jsonify("message received in-securely")
