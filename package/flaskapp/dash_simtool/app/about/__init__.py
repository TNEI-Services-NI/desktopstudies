# -*- coding: utf-8 -*-
import dash
import dash_html_components as html
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import os
import json

# INT IMPORTS
import package.flaskapp.dash_simtool as dash_simtool
import package.flaskapp.dash_simtool.app.dashboard_components as components
import package.flaskapp.dash_simtool.app.home.dashboard_callbacks as callbacks
import package.flaskapp.dash_simtool.app.dashboard_styling as styling
import dash_bootstrap_components as dbc

URL_PAGE = dash_simtool.app.URL_ABOUT


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

    intro_card = dbc.Card([
        dbc.CardHeader("What is the Desktop communications tool?"),
        dbc.CardBody([
            html.P('This tool simulates the process of re-energising a power network through a blackstart process'
                   'with each person taking the role of DNO, ESO, TO, and DER'),
            html.P("The simulation data at each step is pre-calculated by the IPSA software"),
            html.P("Any changes made by the a user in the current lobby are synchronised between all users and "
                   "immediately viewable")

        ])
    ],
        style={"width": "75%", "margin-top": "5%"},
    )

    how_to_card = dbc.Card([
        dbc.CardHeader("How To Use This Tool"),
        dbc.CardBody([
            html.P('By communication between the DNO, ESO, TO, and DER, The process of Re-energising the network by '
                   'closing breakers in the correct order'),

            html.H3("Navigating"),
            html.P("The Top Navigation bar allows you to navigate the tools pages."),
            html.P("The Home Page shows the view relevant to your role"),
            html.P("SLDs allows access to to view all parts of the network [WHAT ELSE SHOULD BE AVAILABLE AND TO "
                   "WHO], [WHERE WILL state views be available]"),
            html.P("Finally the Script page displays a copy of the restoration script."),

            html.H3("Viewing Data"),
            html.P(
                "Data regarding the current state of the network is immediately available in the form of panels which"
                "show generator information, available Power, or specific data from busbars and lines."),
            html.P("Alternatively, By Hovering over components with the mouse pointer, a modal will show all data "
                   "available for the given component"),

            html.H3("Interaction"),
            html.P("Breakers can change state between being closed and opened by clicking them with the cursor. You "
                   "may only interact with breakers which are under your roles authority. "
                   "When all relevant breakers are in the correct state the simulation will progress to the next step")

        ])
    ],
        style={"width": "75%", "margin-top": "5%"},
    )

    # compile overall layout
    dash_app.layout = html.Center([dcc.Location(id="home"),
                                   dcc.Store(id='network_select'),
                                   dcc.Store(id='side_click'),
                                   dcc.Store(id='reset_click'),
                                   dcc.Store(id='sim_state'),
                                   _nav_bar,
                                   _body,
                                   intro_card,
                                   how_to_card,
                                   ],
                                  )

    dash_app = callbacks.init_callbacks(dash_app)

    return dash_app if server == "" else dash_app.server
