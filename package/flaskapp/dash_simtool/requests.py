# -*- coding: utf-8 -*-
from . import simtool_bp
from flask import request, jsonify, session
from flask_socketio import join_room, rooms
from flask_login import login_required
import package.data as simtool_data
from package.flaskapp import socketio


@simtool_bp.route("/receive_breaker/", methods=['POST'])
@login_required
def receive_breaker():
    data = request.form
    print("breaker ID: "+ data["breaker"])
    print("state: "+ data["state"])
    return jsonify("message received securely")


@simtool_bp.route("/check_breakers/", methods=['POST'])
@login_required
def init_breakers():
    data = request.form
    network = data['network']
    option = data['option']
    df_breakerstates = simtool_data.read_breaker_states(network, option)
    return jsonify(df_breakerstates.to_dict())


@simtool_bp.route("/get_state/", methods=['POST'])
@login_required
def get_restoration_step():
    data = request.form
    network = data["network"]
    stage = data["stage"]
    scenario = data["scenario"]
    option = data["option"]

    stateDictionary = simtool_data.read_restoration_step(network, option, scenario, stage)
    return jsonify(stateDictionary)


@simtool_bp.route("/init_network/", methods=['POST'])
@login_required
def init_network():
    print("init_network")
    data = request.form
    df_activesim = simtool_data.read_active_network()
    # print(df_activesim)
    df_activesim = df_activesim.fillna("Unknown")
    return jsonify(df_activesim.to_dict())
    # return df_activesim.to_json()


@socketio.on('list_rooms')
def on_list_rooms(data):
    print(data)
    if 'local' in data:
        if data['local']:
            data['room'] = 'room_{}'.format(str(request.sid))

    rooms_ = rooms()
    sid_client = request.sid
    sid_triggered_client = data['sid']
    room = data['room']
    local = data['local']
    network = data['network']
    sim_step = data['sim_step']

    print("sid_client: {}".format(sid_client))
    print("sid_triggered_client: {}".format(sid_triggered_client))
    print("room: {}".format(room))
    print("rooms_: {}".format(rooms_))

    triggered_client_response = sid_client == sid_triggered_client
    client_in_room = sid_client in rooms_ and room in rooms_

    if triggered_client_response and client_in_room:
        socketio.emit('draw', {
            'network': network,
            'sim_step': sim_step,
        }, room=session['room'])
    elif len(rooms_) == 1:
        session['room'] = room
        socketio.emit('join_draw', {
            'network': network,
            'sim_step': sim_step,
            'local': local,
            'room': session['room']
        })

    return data


@socketio.on('join_room')
def on_join(data):
    join_room(data['room'])

    rooms_ = rooms()
    sid = request.sid
    room = data['room']

    print(sid)
    print(room)
    print(rooms_)
    return data


@socketio.on('shout_server')
def shout_server(data):
    print("Server: ahhhhh")


@socketio.on('redraw')
def redraw(data):
    print("redraw server")
    socketio.emit('redraw', {'sim_step': data['sim_step']}, room=session['room'])


@socketio.on('ping_server')
def ping_server(data):
    print('pong')
    return {'response': 'pong'}


@socketio.on('sync_sim_step')
def connection(data):
    """This will emit a message to all users when this is called.
    This would be useful for simulation synchronisation"""
    session['sim_step'] = data['sim_step']

