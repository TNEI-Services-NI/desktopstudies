# -*- coding: utf-8 -*-
import dash
import dash_html_components as html
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import os
import json
from package.flaskapp import socketio

# INT IMPORTS
import package.flaskapp.dash_simtool as dash_simtool
import package.flaskapp.dash_simtool.app.dashboard_components as components
import package.flaskapp.dash_simtool.app.graph.dashboard_callbacks as callbacks
import package.flaskapp.dash_simtool.app.dashboard_styling as styling

URL_PAGE = dash_simtool.app.URL_GRAPH
def init_dashboard(server=""):
    """Create a Plotly Dash dashboard."""
    # Define encapsulating dash app
    dash_app = dash.Dash(
        title="Black Start DeskSims",
        server=server,
        url_base_pathname=URL_PAGE,
        external_scripts=dash_simtool.app.external_scripts,
        assets_url_path=dash_simtool.app.assets_path,
        update_title=dash_simtool.app.loading_message,
        external_stylesheets=dash_simtool.app.external_stylesheets,
    )

    # nav bar
    _nav_bar = components.navbar(URL_PAGE)

    # compile body
    _body = components.compile_body(styling.CONTENT_STYLE)

    # graphical output
    _graph_display = components.graph_display()

    # with open(dash_simtool.TEMPLATES_DIR + '/dash_sim_tool.html', "r") as dash_app_html_file:
    #     dash_app_html = dash_app_html_file.read()
    #     dash_app_html = dash_app_html.replace('{% marginLeft %}', styling.CONTENT_STYLE['marginLeft'])
    #     dash_app_html = dash_app_html.replace('{% marginTop %}', "0px")
    #     dash_app.index_string = dash_app_html


    # compile overall layout
    dash_app.layout = html.Center([dcc.Location(id="home"),
                                   dcc.Store(id='network_select'),
                                   dcc.Store(id='side_click'),
                                   dcc.Store(id='reset_click'),
                                   dcc.Store(id='sim_state'),
                                   _nav_bar,
                                   _body,
                                    _graph_display
                                   ],
                                  )

    dash_app = callbacks.init_callbacks(dash_app, URL_PAGE)

    return dash_app if server == "" else dash_app.server
