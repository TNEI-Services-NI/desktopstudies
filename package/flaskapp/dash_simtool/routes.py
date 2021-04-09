import random as rand
from . import simtool_bp
from flask import render_template, request, jsonify, url_for, redirect
from flask_login import login_required
import package.flaskapp.dash_simtool.app as dash_app
import package.data as simtool_data


# These routes are prefixed by the blueprint URL prefix
@simtool_bp.route('/')
@login_required
def index():
    return redirect(url_for(dash_app.URL_HOME))


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
    print("init breakers")
    data = request.form
    df_breakerstates = simtool_data.read_breaker_states(data['network'], data['voltage'])
    return jsonify(df_breakerstates.to_dict())


@simtool_bp.route("/get_state/", methods=['POST'])
@login_required
def get_restoration_step():
    data = request.form
    network = data["network"]
    voltage = data["voltage"]
    stage = data["stage"]
    int(stage)

    # df_breakerstates = simtool_data.read_breaker_states(data['network'], data['voltage'])

    stateDictionary = simtool_data.read_restoration_step(network, voltage, stage)
    return stateDictionary.to_json()

    # stateDictionary = {"698 11": rand.random()}
    # return jsonify(stateDictionary.to_dict)


@simtool_bp.route("/init_network/", methods=['POST'])
@login_required
def init_network():
    print("init_network")
    data = request.form
    df_activesim = simtool_data.read_active_network()
    print(data['string'])
    print(df_activesim.to_dict())
    return jsonify(df_activesim.to_dict())

