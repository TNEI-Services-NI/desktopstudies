from dash.dependencies import Output, Input
from flask import session

# INT IMPORTS
import package.flaskapp.dash_simtool._config as cf
import package.flaskapp.dash_simtool.app.dashboard_callbacks as shared_clbks
from package.flaskapp import socketio
from package.flaskapp.dash_simtool.app import URL_HOME
import package.flaskapp.dash_simtool.requests as requests
from package.flaskapp.extensions import dbs
import package.flaskapp.dash_simtool.db as simtool_db


def _add_network_redraw(dash_app):
    @dash_app.callback([Output("network_select", "data")],
                       [Input("hidden_div00", "children")],
                       )
    def _draw_network(state):
        # store network, sim_step
        # sim_step = session['sim_step'] if \
        #     'sim_step' in session and \
        #     session['sim_step'] is not None \
        #     else cf.start_sim_step

        sim_step = simtool_db.get_simstatus()

        # network = cf.entity_network_map[session['entity'] if 'entity' in session else 'Observer']
        network = requests.server_get_network_view(session['entity'], sim_step)

        session['room'] = session['entity']
        session['network_main'] = network
        session['sim_step'] = sim_step
        socketio.emit('check_join_draw', {
            'network': network,
            'sim_step': sim_step,
            'local': True,
            'username': session.get('username'),
            'room': session.get('room'),
            'entity': session['entity']
        })
        return [network]

    return dash_app


def init_callbacks(dash_app):
    dash_app = _add_network_redraw(dash_app)
    dash_app = shared_clbks.add_sim_progress_buttons(dash_app, URL_HOME)
    dash_app = shared_clbks.add_legend_button(dash_app)
    return dash_app



