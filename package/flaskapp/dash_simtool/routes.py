from . import simtool_bp
from flask import render_template, request, jsonify
from flask_login import login_required
import package.flaskapp.dash_simtool.app as dash_app


@simtool_bp.route('/home')
@login_required
def home():
    return render_template('dash_wrapper.html', dash_url=dash_app.URL_BASE)


@simtool_bp.route("/receive_breaker/", methods=['POST'])
@login_required
def receive_breaker():
    data = request.form
    print("breaker ID: "+ data["breaker"])
    print("state: "+ data["state"])
    return jsonify("message received securely")


@simtool_bp.route("/init_breaker/", methods=['POST'])
@login_required
def init_breaker():
    data = request.form
    print("breaker ID: "+ data["breaker"])
    print("state: "+ data["state"])
    return jsonify("message received securely")
