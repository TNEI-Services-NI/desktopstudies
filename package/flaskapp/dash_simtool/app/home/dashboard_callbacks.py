from dash.dependencies import Output, Input

from dash.dependencies import Output, Input
from flask import session
import package.flaskapp.dash_simtool.app.dashboard_styling as styling

# INT IMPORTS
import package.flaskapp.dash_simtool._config as cf
from package.flaskapp import socketio


def _add_network_redraw(dash_app):
    @dash_app.callback([Output("network_select", "data")],
                       [Input("hidden_div00", "children")],
                       )
    def _draw_network(state):
        network = cf.entity_network_map[session['entity'] if 'entity' in session else 'Other']
        session['room'] = session['entity']
        session['network'] = network
        sim_step = session['sim_step'] if 'sim_step' in session else cf.start_sim_step
        session['sim_step'] = sim_step
        socketio.emit('check_join_draw', {
            'network': network,
            'sim_step': sim_step,
            'room': session['room']
        })
        return [network]

    return dash_app


def _add_sidebar_buttons(dash_app):
    return dash_app

def _add_legend_button(dash_app):
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

def init_callbacks(dash_app):
    dash_app = _add_network_redraw(dash_app)
    dash_app = _add_sidebar_buttons(dash_app)
    dash_app = _add_legend_button(dash_app)

    return dash_app



