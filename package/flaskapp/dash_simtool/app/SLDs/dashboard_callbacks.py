import dash
from dash.dependencies import Output, Input
from flask import session

# INT IMPORTS
# from package.flaskapp.dash_simtool.app.dataprocessing import format_dfs, calc_success
import package.flaskapp.dash_simtool._config as cf
import package.flaskapp.dash_simtool.app.dashboard_styling as styling
from package.flaskapp import socketio
from flask_socketio import emit


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
            if 'network' not in session:
                network = "chapelcross33kv"
            else:
                network = session['network']
        else:
            network = triggered_object['prop_id'].split('.')[0]

        # store network, sim_step
        session['network'] = network
        sim_step = session['sim_step'] if 'sim_step' in session else cf.start_sim_step
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


def _add_sim_progress_buttons(dash_app):
    @dash_app.callback([Output("sim_state", "data"),
                        Output("sim_status_div", "children")],
                       [
                           Input("back_button", "n_clicks"),
                           Input("next_button", "n_clicks"),
                           Input("debug_button", "n_clicks"),
                           Input("reset_sim_button", "n_clicks"),
                       ],
                       [Input("sim_state", "data")]
                       )
    def _progress_sim(back_button_nclicks, next_button_nclicks, debug_button_nclicks,
                      reset_sim_button_nclicks, sim_status):

        ctx = dash.callback_context
        triggered_object = ctx.triggered[0]['prop_id'].split('.')[0]

        redraw_data = {'sim_step': sim_status,
                              'username': session.get('username')}

        if 'room' not in session['room']:
            session['room'] = 'room_{}'.format(session.get('username'))

        if triggered_object == 'next_button':  # increment sim_step
            redraw_data['sim_step'] += 1
            socketio.emit('redraw', redraw_data, room=session['room'])

        elif triggered_object == 'back_button':  # decrement sim_step
            redraw_data['sim_step'] -= 1 if sim_status > cf.start_sim_step else 0
            socketio.emit('redraw', redraw_data, room=session['room'])

        elif triggered_object == 'debug_button':
            pass

        elif triggered_object == 'reset_sim_button':  # reset sim_step
            redraw_data['sim_step'] = cf.start_sim_step
            socketio.emit('redraw', redraw_data, room=session['room'])

        else:
            redraw_data['sim_step'] = session['sim_step'] if 'sim_step' in session else cf.start_sim_step

        session['sim_step'] = redraw_data['sim_step']

        return [redraw_data['sim_step'], "Simulation status: {}".format(redraw_data['sim_step'])]

    return dash_app


def _add_sidebar_buttons(dash_app):
    dash_app = _add_sim_progress_buttons(dash_app)
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
