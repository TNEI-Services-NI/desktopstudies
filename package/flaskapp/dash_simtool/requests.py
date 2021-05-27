# -*- coding: utf-8 -*-
import json

from flask import request, jsonify, session
from flask_login import login_required
from flask_socketio import join_room, rooms

import package.data as simtool_data
import package.flaskapp.dash_simtool.db as simtool_db
from package.flaskapp import socketio
from package.flaskapp.extensions import dbs
from . import simtool_bp


@simtool_bp.route("/receive_breaker/", methods=['POST'])
@login_required
def receive_breaker():
    data = request.form
    print("breaker ID: " + data["breaker"])
    print("state: " + data["state"])
    return jsonify("message received securely")


@simtool_bp.route("/check_breakers/", methods=['POST'])
@login_required
def init_breakers():
    data = request.form
    network = data['network']
    option = data['option']
    df_breakerstates = simtool_data.read_breaker_states(network, option)
    # df_breakerstates = simtool_data.read_breaker_states_db(network, option)
    return jsonify(df_breakerstates.to_dict())


def server_get_network_view(entity, sim_step, option="5"):
    df_network_view = simtool_data.read_network_views(option)
    # df_network_view = simtool_data.read_network_views_db(option)
    entity = entity.split("_")[0]
    network = df_network_view.loc[entity, sim_step]
    return network


def server_get_actions(entity, sim_step, option="5"):
    df_actions = simtool_data.read_actions(option)
    # df_actions = simtool_data.read_actions_db(option)
    action = df_actions.loc[entity, sim_step]
    return action


@simtool_bp.route("/get_network_view/", methods=['POST'])
@login_required
def get_network_view():
    data = request.form
    option = data['option']
    df_network_view = simtool_data.read_network_views(option)
    # df_network_view = simtool_data.read_network_views_db(option)
    return jsonify(df_network_view.to_dict())


@simtool_bp.route("/get_action/", methods=['POST'])
@login_required
def get_action():
    data = request.form
    option = data['option']
    df_action = simtool_data.read_actions(option)
    # df_action = simtool_data.read_actions_db(option)
    return jsonify(df_action.to_dict())


@simtool_bp.route("/get_state/", methods=['POST'])
@login_required
def get_restoration_step():
    data = request.form
    case_network = data["case_network"]
    network = data["network"]
    stage = data["stage"]
    scenario = data["scenario"]
    option = data["option"]

    stateDictionary = simtool_data.read_restoration_step(case_network, network, option, scenario, stage)
    # stateDictionary = simtool_data.read_restoration_step_db(case_network, network, option, scenario, stage)
    return jsonify(stateDictionary)

@simtool_bp.route("/get_states/", methods=['POST'])
@login_required
def get_restoration_steps():
    data = request.form
    case_network = data["case_network"]
    network = data["network"]
    scenario = data["scenario"]
    option = data["option"]

    #restoration steps
    # #todo where is the number of stages saved/how to get it?
    steps = {}
    i=-2
    while i < 35:
        stateDictionary = simtool_data.read_restoration_step(case_network, network, option, scenario, i)
        steps[str(i)] = stateDictionary
        i+=1
    # stateDictionary = simtool_data.read_all_restoration_steps(case_network, network, option, scenario)

    return jsonify(steps)

@simtool_bp.route("/get_all_data/", methods=['POST'])
@login_required
def get_all_data():
    data = request.form
    case_network = data["case_network"]
    network = data["network"]
    scenario = data["scenario"]
    option = data["option"]


    #views
    views = simtool_data.read_network_views(option).to_dict()

    #restoration steps
    steps = {}
    i=-2
    while i < len(views)-3:
        stateDictionary = simtool_data.read_restoration_step(case_network, network, option, scenario, i)
        steps[str(i)] = stateDictionary
        i+=1

    #breakers
    breakers = simtool_data.read_breaker_states(network, option).to_dict()

    #actions
    actions = simtool_data.read_actions(option).to_dict()

    all_data = {}

    all_data["steps"] = steps
    all_data["views"] = views
    all_data["breakers"] = breakers
    all_data["actions"] = actions

    return jsonify(all_data)


@simtool_bp.route("/init_network/", methods=['POST'])
@login_required
def init_network():
    data = request.form
    df_activesim = simtool_data.read_active_network()
    # df_activesim = simtool_data.read_active_network_db()
    # print(df_activesim)
    df_activesim = df_activesim.fillna("Unknown")
    return jsonify(df_activesim.to_dict())
    # return df_activesim.to_json()


@socketio.on('connect')
def test_connect():
    session['sid'] = request.sid
    print("On connect: {}".format(session.get('sid')))


@socketio.on('check_join_draw')
def on_check_join_draw(data):
    username = data['username']

    if 'local' in data:
        if data['local']:
            data['room'] = 'room_{}'.format(username)

    rooms_ = rooms()
    sid_client = request.sid
    room = data['room']

    client_in_room = sid_client in rooms_ and room in rooms_

    if client_in_room:
        socketio.emit('draw', data, room=session['room'])
    else:
        session['sid'] = sid_client
        session['room'] = room
        socketio.emit('join_draw', data)

    return data


@socketio.on('join_room')
def on_join(data):
    join_room(data['room'])
    return data


@socketio.on('check_redraw')
def redraw(data):
    network = server_get_network_view(data['entity'], data['sim_step'], option="5")
    socketio.emit('redraw', {
        'sim_step': data['sim_step'],
        'network': network,
    }, room=session['room'])


@socketio.on('sync_sim_step')
def connection(data):
    """This will emit a message to all users when this is called.
    This would be useful for simulation synchronisation"""
    progress = data['progress']

    if progress:
        next_network = server_get_network_view(data['entity'], data['sim_step'], option="5")
    else:
        next_network = data['network']

    session['sim_step'] = data['sim_step']

    broadcast = data['broadcast'] if 'broadcast' in data else False

    switch_network = data['network'] != next_network

    data['switch_network'] = switch_network
    data['broadcast'] = broadcast

    if broadcast:
        simtool_db.replace_simstatus(dbs, data['sim_step'])
        data['network'] = next_network
        socketio.emit('check_redraw', data)
    else:
        data['network'] = next_network
        socketio.emit('check_redraw', data, room=data['room'])

    return data
