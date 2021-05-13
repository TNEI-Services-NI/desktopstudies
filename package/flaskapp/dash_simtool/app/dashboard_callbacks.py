# -*- coding: utf-8 -*-
import dash
from dash.dependencies import Output, Input
from flask import session

# INT IMPORTS
import package.flaskapp.dash_simtool._config as cf
import package.flaskapp.dash_simtool.app.dashboard_styling as styling
import package.flaskapp.dash_simtool.db as simtool_db
from package.flaskapp import socketio
from package.flaskapp.auth.routes import login_required
from package.flaskapp.extensions import dbs
import package.flaskapp.dash_simtool as dashboard


def login_required_(dash_app, app_prefix):
    for view_func in dash_app.server.view_functions:
        if view_func.startswith(app_prefix):
            dash_app.server.view_functions[view_func] = login_required(dash_app.server.view_functions[view_func])


def add_legend_button(dash_app):
    @dash_app.callback(
        [
            Output("legend", "style"),
        ],

        [Input("legend_button", "n_clicks")],
        [

        ]
    )
    def toggle_legend(n):
        if(n!=None):
            if(n%2 == 1):
                return [styling.LEGEND]
            else:
                return [styling.LEGEND_HIDDEN]
        else:
            return [styling.LEGEND_HIDDEN]

    return dash_app


def _add_toggle_sidebar(dash_app):
    @dash_app.callback(
        [
            Output("toggle_button", "children"),
            Output("sidebar", "style"),
            Output("page_content", "style"),
            Output("side_click", "data"),
        ],

        [Input("toggle_button", "n_clicks")],
        [
        ]
    )
    def toggle_sidebar(n, nclick):
        if n:
            if nclick == "SHOW":
                toggle_arrow = '>'
                sidebar_style = styling.SIDEBAR_STYLE_HIDDEN
                content_style = styling.CONTENT_STYLE_SIDEBAR_HIDDEN
                cur_nclick = "HIDDEN"
            else:
                toggle_arrow = '<'
                sidebar_style = styling.SIDEBAR_STYLE
                content_style = styling.CONTENT_STYLE
                cur_nclick = "SHOW"
        else:
            toggle_arrow = '<'
            sidebar_style = styling.SIDEBAR_STYLE
            content_style = styling.CONTENT_STYLE
            cur_nclick = 'SHOW'

        return toggle_arrow, sidebar_style, content_style, cur_nclick

    return dash_app


def add_sim_progress_buttons(dash_app, URL_PAGE):
    @dash_app.callback([
        Output("sim_status_div", "children"),
        Output("entity_view", "children"),
    ],
                       [
                           Input("back_button", "n_clicks"),
                           Input("next_button", "n_clicks"),
                           Input("debug_button", "n_clicks"),
                           Input("reset_sim_button", "n_clicks"),
                       ],
                       [
                           Input("sim_status_div", "children"),
                       ]
                       )
    def _progress_sim(back_button_nclicks, next_button_nclicks, debug_button_nclicks,
                      reset_sim_button_nclicks, sim_status):

        ctx = dash.callback_context
        triggered_object = ctx.triggered[0]['prop_id'].split('.')[0]
        sim_status = simtool_db.get_room_simstatus(session['username'])

        redraw_data = {'sim_step': sim_status,
                              'username': session.get('username')}

        if ('room' not in session) or ('room' not in session['room']):
            session['room'] = 'room_{}'.format(session.get('username'))

        if triggered_object == 'next_button':  # increment sim_step
            redraw_data['sim_step'] += 1
            # redraw_data['network'] = requests.server_get_network_view(session['entity'], redraw_data['sim_step'])
            socketio.emit('redraw', redraw_data, room=session['room'])
            simtool_db.replace_room_simstatus(dbs, redraw_data['sim_step'], session['username'])

        elif triggered_object == 'back_button':  # decrement sim_step
            redraw_data['sim_step'] -= 1 if sim_status > cf.start_sim_step else 0
            # redraw_data['network'] = requests.server_get_network_view(session['entity'], redraw_data['sim_step'])
            socketio.emit('redraw', redraw_data, room=session['room'])
            simtool_db.replace_room_simstatus(dbs, redraw_data['sim_step'], session['username'])

        elif triggered_object == 'debug_button':
            socketio.emit('debug', {}, room=session['room'])
            pass

        elif triggered_object == 'reset_sim_button':  # reset sim_step
            redraw_data['sim_step'] = simtool_db.get_simstatus()
            # redraw_data['network'] = requests.server_get_network_view(session['entity'], redraw_data['sim_step'])
            socketio.emit('redraw', redraw_data, room=session['room'])
            simtool_db.replace_room_simstatus(dbs, redraw_data['sim_step'], session['username'])

        else:
            redraw_data['sim_step'] = simtool_db.get_simstatus()

        session['sim_step'] = redraw_data['sim_step']

        return [
            "Simulation status: {}".format(redraw_data['sim_step']),
            "View: {}".format(session.get('entity')),
        ]

    return dash_app

