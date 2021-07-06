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
import gc


@simtool_bp.route("/get_breakers/", methods=['POST'])
# @login_required
def get_breakers():
    data = request.form
    network = data['network']
    option = data['option']
    all_data = {}
    df_breakerstates = simtool_data.read_breaker_states(network, option).to_dict()
    all_data["breakers"] = df_breakerstates
    df_breakerstates = None
    del df_breakerstates
    gc.collect()
    return jsonify(all_data)


@simtool_bp.route("/get_breakers_db/", methods=['POST'])
# @login_required
def get_breakers_db():
    data = request.form
    network = data['network']
    option = data['option']
    all_data = {}
    #breakers
    breakers = simtool_data.read_breaker_states_db(network, option).to_dict()
    all_data["breakers"] = breakers
    breakers = None
    del breakers
    gc.collect()
    return jsonify(all_data)


@simtool_bp.route("/get_network_view/", methods=['POST'])
# @login_required
def get_network_view():
    data = request.form
    option = data['option']
    all_data = {}
    df_network_view = simtool_data.read_network_views(option).to_dict()
    # df_network_view = simtool_data.read_network_views_db(option)
    all_data["views"] = df_network_view
    df_network_view = None
    del df_network_view
    gc.collect()
    return jsonify(all_data)


@simtool_bp.route("/get_network_view_db/", methods=['POST'])
# @login_required
def get_network_view_db():
    data = request.form
    option = data['option']
    #views
    all_data = {}
    views = simtool_data.read_network_views_db(option).to_dict()
    all_data["views"] = views
    views = None
    del views
    gc.collect()
    return jsonify(all_data)


@simtool_bp.route("/get_actions/", methods=['POST'])
# @login_required
def get_actions():
    data = request.form
    option = data['option']
    all_data = {}
    df_action = simtool_data.read_actions(option).to_dict()
    all_data["actions"] = df_action
    df_action = None
    del df_action
    gc.collect()
    return jsonify(all_data)


@simtool_bp.route("/get_actions_db/", methods=['POST'])
# @login_required
def get_actions_db():
    data = request.form
    option = data['option']
    all_data = {}
    #actions
    actions = simtool_data.read_actions_db(option).to_dict()
    all_data["actions"] = actions

    actions = None
    del actions
    gc.collect()
    return jsonify(all_data)


@simtool_bp.route("/get_steps/", methods=['POST'])
# @login_required
def get_steps():
    data = request.form
    case_network = data["case_network"]
    network = data["network"]
    scenario = data["scenario"]
    option = data["option"]
    all_data = {}

    # restoration steps
    steps = {}
    stateDictionary = simtool_data.read_restoration_step(case_network, network, option, scenario, None)
    for i in range(-2, 35):
        dict_data = {k: v.loc[:, 'Step {}'.format(i)]
                     for k, v in stateDictionary.items()}

        dict_data['transformer_apparent_power'] = dict_data['transformers_loading'] * dict_data[
            'transformers_rating'].replace(999, 0).replace(-999, 0)

        dict_data = {k: v.to_json()
                     for k, v in dict_data.items()}
        steps[str(i)] = dict_data
    all_data["steps"] = steps

    stateDictionary = None
    del stateDictionary

    df_network_view = None
    del df_network_view
    steps = None
    del steps
    dict_data = None
    del dict_data
    df_action = None
    del df_action
    df_breakerstates = None
    del df_breakerstates

    gc.collect()
    return jsonify(all_data)


@simtool_bp.route("/get_steps_db/", methods=['POST'])
# @login_required
def get_steps_db():
    data = request.form
    case_network = data["case_network"]
    network = data["network"]
    scenario = data["scenario"]
    option = data["option"]

    all_data = {}

    # restoration steps
    steps = {}
    stateDictionary = simtool_data.read_restoration_step_db(case_network, network, option, scenario, None)
    for i in range(-2, 35):
        dict_data = {k: v.loc[:, 'Step {}'.format(i)]
                     for k, v in stateDictionary.items()}

        dict_data['transformer_apparent_power'] = dict_data['transformers_loading'] * dict_data[
            'transformers_rating'].replace(999, 0).replace(-999, 0)

        dict_data = {k: v.to_json()
                     for k, v in dict_data.items()}
        steps[str(i)] = dict_data

    all_data["steps"] = steps

    df_network_view = None
    del df_network_view
    steps = None
    del steps
    dict_data = None
    del dict_data
    df_action = None
    del df_action
    df_breakerstates = None
    del df_breakerstates

    gc.collect()

    return jsonify(all_data)


@simtool_bp.route("/get_all_data/", methods=['POST'])
# @login_required
def get_all_data():
    data = request.form
    case_network = data["case_network"]
    network = data["network"]
    scenario = data["scenario"]
    option = data["option"]

    all_data = {}

    df_network_view = simtool_data.read_network_views(option).to_dict()
    # df_network_view = simtool_data.read_network_views_db(option)
    all_data["views"] = df_network_view

    steps = {}
    stateDictionary = simtool_data.read_restoration_step(case_network, network, option, scenario, None)
    for i in range(-2, 35):
        dict_data = {k: v.loc[:, 'Step {}'.format(i)]
                     for k, v in stateDictionary.items()}

        dict_data['transformer_apparent_power'] = dict_data['transformers_loading'] * dict_data[
            'transformers_rating'].replace(999, 0).replace(-999, 0)

        dict_data = {k: v.to_json()
                     for k, v in dict_data.items()}
        steps[str(i)] = dict_data
    all_data["steps"] = steps

    df_action = simtool_data.read_actions(option).to_dict()
    all_data["actions"] = df_action

    df_breakerstates = simtool_data.read_breaker_states(network, option).to_dict()
    all_data["breakers"] = df_breakerstates

    df_network_view = None
    del df_network_view
    steps = None
    del steps
    dict_data = None
    del dict_data
    df_action = None
    del df_action
    df_breakerstates = None
    del df_breakerstates

    gc.collect()

    return jsonify(all_data)

@simtool_bp.route("/get_all_data_db/", methods=['POST'])
# @login_required
def get_all_data_db():
    data = request.form
    case_network = data["case_network"]
    network = data["network"]
    scenario = data["scenario"]
    option = data["option"]

    all_data = {}

    #views
    views = simtool_data.read_network_views_db(option).to_dict()
    all_data["views"] = views

    #restoration steps
    steps = {}
    stateDictionary = simtool_data.read_restoration_step_db(case_network, network, option, scenario, None)
    for i in range(-2, 35):
        dict_data = {k: v.loc[:, 'Step {}'.format(i)]
                     for k, v in stateDictionary.items()}

        dict_data['transformer_apparent_power'] = dict_data['transformers_loading'] * dict_data['transformers_rating'].replace(999,0).replace(-999,0)

        dict_data = {k: v.to_json()
                     for k, v in dict_data.items()}
        steps[str(i)] = dict_data
    all_data["steps"] = steps

    #breakers
    breakers = simtool_data.read_breaker_states_db(network, option).to_dict()
    all_data["breakers"] = breakers

    #actions
    actions = simtool_data.read_actions_db(option).to_dict()
    all_data["actions"] = actions

    del views
    del stateDictionary
    del steps
    del dict_data
    del breakers
    del actions

    gc.collect()

    return jsonify(all_data)


@simtool_bp.route("/ping/", methods=['POST'])
def ping():
    return {'response': 'pong'}

# @simtool_bp.route("/init_network/", methods=['POST'])
# # @login_required
# def init_network():
#     data = request.form
#     df_activesim = simtool_data.read_active_network()
#     df_activesim = df_activesim.fillna("Unknown")
#     return jsonify(df_activesim.to_dict())


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
    print(rooms)
    print(data['room'])
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
    socketio.emit('redraw', {
        'sim_step': data['sim_step'],
        'view_step': data['view_step'],
        'network': data['network'],
    }, room=session['room'])


@socketio.on('sync_sim_step')
def connection(data):
    """This will emit a message to all users when this is called.
    This would be useful for simulation synchronisation"""
    progress = data['progress']
    view = data['view']
    view_step = data['view_step']

    if progress:
        next_network = server_get_network_view(data['entity'], data['sim_step'], option="5")
    else:
        next_network = data['network']

    if not view:
        session['sim_step'] = data['sim_step']
    else:
        next_network = server_get_network_view(data['entity'], view_step, option="5")

    broadcast = (data['broadcast'] and not view) if 'broadcast' in data else False

    switch_network = data['network'] != next_network

    data['switch_network'] = switch_network
    data['broadcast'] = broadcast

    if (switch_network and view) or (not view):
        if broadcast:
            simtool_db.replace_simstatus(dbs, data['sim_step'])
            data['network'] = next_network
            socketio.emit('check_redraw', data)
        else:
            data['network'] = next_network
            socketio.emit('check_redraw', data, room=data['room'])
    else:
        socketio.emit('check_redraw', data, room=data['room'])


    return data


def server_get_network_view(entity, sim_step, option="5"):
    df_network_view = simtool_data.read_network_views(option)
    # df_network_view = simtool_data.read_network_views_db(option)
    entity = entity.split("_")[0]
    network = df_network_view.loc[entity, sim_step]
    return network
