from dash.dependencies import Output, Input

from dash.dependencies import Output, Input
from flask import session

# INT IMPORTS
import package.flaskapp.dash_simtool._config as cf
from package.flaskapp import socketio


def _add_network_redraw(dash_app):
    @dash_app.callback([Output("network_select", "data")],
                       [Input("hidden_div00", "children")],
                       )
    def _draw_network(state):
        network = cf.entity_network_map[session['entity'] if 'entity' in session else 'Other']
        session['network'] = network
        sim_step = session['sim_step'] if 'sim_step' in session else cf.start_sim_step
        session['sim_step'] = sim_step
        socketio.emit('draw', {'network': network, 'sim_step': sim_step}, broadcast=False)
        return [network]

    return dash_app


def _add_sidebar_buttons(dash_app):
    return dash_app


def init_callbacks(dash_app):
    dash_app = _add_network_redraw(dash_app)
    dash_app = _add_sidebar_buttons(dash_app)

    return dash_app
