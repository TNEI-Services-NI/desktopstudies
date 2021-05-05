from dash.dependencies import Output, Input
from flask import session

# INT IMPORTS
import package.flaskapp.dash_simtool._config as cf
import package.flaskapp.dash_simtool.app.dashboard_callbacks as shared_clbks
from package.flaskapp import socketio


def _add_network_redraw(dash_app):
    @dash_app.callback([Output("network_select", "data")],
                       [Input("hidden_div00", "children")],
                       )
    def _draw_network(state):
        # store network, sim_step
        sim_step = session['sim_step'] if \
            'sim_step' in session and \
            session['sim_step'] is not None \
            else cf.start_sim_step

        network = cf.entity_network_map[session['entity'] if 'entity' in session else 'Other']

        session['room'] = session['entity']
        session['network'] = network
        session['sim_step'] = sim_step

        socketio.emit('check_join_draw', {
            'network': network,
            'sim_step': sim_step,
            'local': True,
            'username': session.get('username'),
            'room': session.get('room')
        })
        return [network]

    return dash_app


def init_callbacks(dash_app):
    dash_app = _add_network_redraw(dash_app)
    dash_app = shared_clbks.add_legend_button(dash_app)

    return dash_app



