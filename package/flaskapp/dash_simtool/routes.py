from . import simtool_bp
from flask import render_template, request, jsonify
from flask_login import login_required
import package.flaskapp.dash_simtool.app as dash_app
import package.data as simtool_data


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


@simtool_bp.route("/init_breakers/", methods=['POST'])
@login_required
def init_breakers():
    data = request.form
    df_breakerstates = simtool_data.read_breaker_states(data['network'], data['voltage'])
    return jsonify(df_breakerstates.to_dict())
