import dash
from dash.dependencies import Output, Input
from flask import session

# INT IMPORTS
import package.flaskapp.dash_simtool.app.dashboard_callbacks as shared_clbks
import package.flaskapp.dash_simtool.db as simtool_db
from package.flaskapp import socketio
from package.flaskapp.dash_simtool.app import URL_SLDS
from package.flaskapp.extensions import dbs


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
    def _draw_network(chx33, chx132, grt132, grt400, chapgret1, chapgret2, ewehillgretna, stev33kV, minsca33kV, ewe1,
                      ewe2):

        # Determine network for drawing
        ctx = dash.callback_context
        triggered_object = ctx.triggered[0]
        if triggered_object['value'] is None:
            session['room'] = session['entity']
            sim_step = simtool_db.get_simstatus()
            simtool_db.replace_room_simstatus(dbs, sim_step, session['username'])
            if 'network_explore' not in session:
                network = "chapelcross33kv"
            else:
                network = session['network_explore']
        else:
            network = triggered_object['prop_id'].split('.')[0]
            sim_step = simtool_db.get_room_simstatus(session['username'])

        # store network, sim_step
        session['network_explore'] = network
        print(session['entity'])

        session['sim_step'] = sim_step

        socketio.emit('check_join_draw', {
            'network': network,
            'sim_step': sim_step,
            'local': True,
            'page': "SLDs",
            'username': session.get('username'),
            'room': session.get('room'),
            'entity': session['entity']
        })

        return [network]

    return dash_app


def init_callbacks(dash_app, app_prefix):
    shared_clbks.login_required_(dash_app, app_prefix)
    dash_app = _add_network_redraw(dash_app)
    dash_app = shared_clbks.add_sim_progress_buttons(dash_app, URL_SLDS)
    dash_app = shared_clbks.add_legend_button(dash_app)

    return dash_app
