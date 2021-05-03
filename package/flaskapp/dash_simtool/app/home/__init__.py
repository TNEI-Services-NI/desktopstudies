# -*- coding: utf-8 -*-
import dash
import dash_html_components as html
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import os
import json
from flask import session
from package.flaskapp import socketio

# INT IMPORTS
import package.flaskapp.dash_simtool as dash_simtool
import package.flaskapp.dash_simtool.app.dashboard_components as components
import package.flaskapp.dash_simtool.app.home.dashboard_callbacks as callbacks
import package.flaskapp.dash_simtool.app.dashboard_styling as styling
import package.flaskapp.dash_simtool._config as cf

URL_PAGE = dash_simtool.app.URL_HOME
STYLING_SIDEBAR = styling.CONTENT_STYLE_SIDEBAR_HIDDEN

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
    #
    # add sidebar
    _sidebar = html.Div(
        [
            html.H3("Options"),
            html.Hr(),
            dbc.DropdownMenu(
                label="Chapelcross 33kv",
                children=[
                    dbc.DropdownMenuItem("Chapelcross 33kv", id="chapelcross33kv"),
                    dbc.DropdownMenuItem("Chapelcross 132kv", id="chapelcross132kv"),
                    dbc.DropdownMenuItem("Gretna 132kv", id="gretna132kv"),
                    dbc.DropdownMenuItem("Gretna 400kv", id="gretna400kv"),
                    dbc.DropdownMenuItem("chapelcrossgretna1", id="chapelcrossgretna1"),
                    dbc.DropdownMenuItem("chapelcrossgretna2", id="chapelcrossgretna2"),
                    dbc.DropdownMenuItem("ewehillgretna", id="ewehillgretna"),
                    dbc.DropdownMenuItem("stevenscroft33kv", id="stevenscroft33kv"),
                    dbc.DropdownMenuItem("minsca33kv", id="minsca33kv"),
                    dbc.DropdownMenuItem("ewehillwindfarm1", id="ewehillwindfarm1"),
                    dbc.DropdownMenuItem("ewehillwindfarm2", id="ewehillwindfarm2"),
                ],
                id='network_menu'
            ),
            html.Hr(),
            dbc.Button("Reset simulation", id="reset_sim_button"),
            dbc.Button("Back", id="back_button", style={"margin-top": "15px"}),
            dbc.Button("Next", id="next_button", style={"margin-top": "15px", "margin-left": "15px"}),
            html.Hr(),
            html.Div(id='sim_status_div', children="Siulation status: -1")
        ],
        style=styling.SIDEBAR_STYLE,
        id='sidebar'
    )

    image_filename ="\static\imgs\legend1.jpg"
    _legend = html.Div(
        [html.Img(src=image_filename, style=styling.LEGEND_IMAGE)],
        style=styling.LEGEND_HIDDEN,
        id='legend'
    )

    # compile body
    _body = components.compile_body(STYLING_SIDEBAR)

    # graphical output
    _data_upload_output = dbc.Row([dbc.Col([html.Div(id='output-data-upload')], width=2)])

    with open(dash_simtool.TEMPLATES_DIR + '/dash_sim_tool.html', "r") as dash_app_html_file:
        dash_app_html = dash_app_html_file.read()
        # dash_app_html = dash_app_html.replace('{% marginLeft %}', STYLING_SIDEBAR['marginLeft'])
        # dash_app_html = dash_app_html.replace('{% marginTop %}', "0rem")
        dash_app.index_string = dash_app_html


    # compile overall layout
    dash_app.layout = html.Center([dcc.Location(id="home"),
                                   dcc.Store(id='network_select'),
                                   dcc.Store(id='side_click'),
                                   dcc.Store(id='reset_click'),
                                   dcc.Store(id='sim_state'),
                                   html.Div(id='hidden_div00'),
                                   _nav_bar,
                                   _legend,
                                   _body,
                                   ],
                                  )

    dash_app = callbacks.init_callbacks(dash_app)

    return dash_app if server == "" else dash_app.server
