import copy
from datetime import datetime

import dash
from dash.dependencies import Output, Input, State

from flask import session
from package.flaskapp import socketio

# INT IMPORTS
from package.flaskapp.dash_simtool.app.dashboard_components import init_calendar, init_line, init_graph_layout
# from package.flaskapp.dash_simtool.app.dataprocessing import format_dfs, calc_success
from package.flaskapp.auth.routes import login_required
import dash_html_components as html
import dash_core_components as dcc
import dash_bootstrap_components as dbc
import package.flaskapp.dash_simtool._config as cf
import package.flaskapp.dash_simtool.app.dashboard_styling as styling
import package.flaskapp.dash_simtool.db as simtool_db
import package.flaskapp.dash_simtool.app.dashboard_callbacks as shared_clbks


def _add_network_redraw(dash_app):
    @dash_app.callback([Output("network_menu", "label")],
                       [
                           Input("chapelcross33kv", "n_clicks"),
                           Input("chapelcross132kv", "n_clicks"),
                           Input("gretna132kv", "n_clicks"),
                           Input("gretna400kv", "n_clicks"),
                           Input("chapelcrossgretna1", "n_clicks"),
                           Input("chapelcrossgretna2", "n_clicks"),
                           Input("ewehillgretna", "n_clicks"),
                           Input("stevenscroft33kv", "n_clicks"),
                           Input("minsca33kv", "n_clicks"),
                           Input("ewehillwindfarm1", "n_clicks"),
                           Input("ewehillwindfarm2", "n_clicks"),
                       ],
                       )
    def _draw_network(chx33, chx132, grt132, grt400,chapgret1,chapgret2,ewehillgretna,stev33kV,minsca33kV,ewe1,ewe2):
        ctx = dash.callback_context
        triggered_object = ctx.triggered[0]
        if triggered_object['value'] is None and 'network' not in session:
            network = "chapelcross33kv"
        elif triggered_object['value'] is None and 'network' in session:
            network = session['network']
        else:
            network = triggered_object['prop_id'].split('.')[0]
        session['network'] = network
        # sim_step = session['sim_step'] if 'sim_step' in session else cf.start_sim_step
        sim_step = simtool_db.get_simstatus()
        session['sim_step'] = sim_step
        socketio.emit('draw', {'network': network, 'sim_step': sim_step})
        return [network]

    return dash_app


def _add_reset_button(dash_app):
    @dash_app.callback([Output("reset_click", "data")],
                       [
                           Input("reset_sim_button", "n_clicks"),
                       ],
                       )
    def _reset_simulation(reset_button_nclicks):

        return [reset_button_nclicks]

    return dash_app


def _add_sim_progress_buttons(dash_app):
    @dash_app.callback([Output("sim_state", "data"),
                        Output("sim_status_div", "children")],
                       [
                           Input("back_button", "n_clicks"),
                           Input("next_button", "n_clicks"),
                       ],
                       [Input("sim_state", "data")]
                       )
    def _progress_sim(back_button_nclicks, next_button_nclicks, sim_status):

        return [sim_status, "Simulation status: {}".format(sim_status)]

    return dash_app


def _add_sidebar_buttons(dash_app):
    dash_app = _add_reset_button(dash_app)
    dash_app = _add_sim_progress_buttons(dash_app)
    return dash_app


def init_callbacks(dash_app, app_prefix):
    dash_app = shared_clbks.filter_navlinks(dash_app)

    return dash_app
