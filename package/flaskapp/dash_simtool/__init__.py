# -*- coding: utf-8 -*-
import dash
import dash_html_components as html
import dash_bootstrap_components as dbc
import dash_core_components as dcc

# INT IMPORTS
import package.flaskapp.dash_simtool.dashboard_components as components
import package.flaskapp.dash_simtool.dashboard_callbacks as callbacks
import package.flaskapp.dash_simtool.dashboard_styling as styling


def init_dashboard(server=""):
    """Create a Plotly Dash dashboard."""

    # Define encapsulating dash app
    dash_app = dash.Dash(
        server=server,
        routes_pathname_prefix='/dash_simtool/',
        assets_url_path='/assets',
        external_stylesheets=[dbc.themes.GRID,
                              # can insert own css files here
                              # '/static/dist/css/styles.css'
                              dbc.themes.LUMEN]
    )

    # nav bar
    _nav_bar = dbc.NavbarSimple(brand='Desktop Studies Communications Tool',
                                color='#80361e',
                                dark=True,
                                id='nav_bar',
                                children=components.navbar_controls(),
                                fixed="top",
                                style=styling.NAVBAR_STYLE
                                )

    # add sidebar
    _sidebar = html.Div(
        [
            html.Button('<',
                        id='toggle_button',
                        style={
                            'margin-left':'9rem',
                            "background-color": "#ebc700",
                        }),
            html.H3("Sidebar"),
            html.Hr(),
            html.P("option 1", className="lead"),
            html.P("option 2", className="lead"),
            html.P("option 3", className="lead"),
        ],
        style=styling.SIDEBAR_STYLE,
        id='sidebar'
    )

    # compile body
    _body = components.compile_body(styling.CONTENT_STYLE)

    # graphical output
    _data_upload_output = dbc.Row([dbc.Col([html.Div(id='output-data-upload')], width=2)])

    # compile overall layout
    dash_app.layout = html.Center([dcc.Location(id="home"),
                                   dcc.Store(id='side_click'),
                                    html.Br(),
                                   _nav_bar,
                                   _sidebar,
                                   html.Br(),
                                   _body,
                                   html.Br(),
                                   _data_upload_output,
                                   html.Br(),
                                   ],
                                  )


    dash_app = callbacks.init_callbacks(dash_app)

    return dash_app if server == "" else dash_app.server

