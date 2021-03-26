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
import package.flaskapp.dash_simtool.app.dashboard_callbacks as callbacks
import package.flaskapp.dash_simtool.app.dashboard_styling as styling

URL_BASE = '/simtool/'


def init_dashboard(server=""):
    """Create a Plotly Dash dashboard."""

    if server != '':
        # Define encapsulating dash app
        dash_app = dash.Dash(
            server=server,
            routes_pathname_prefix=URL_BASE,
            external_scripts=[
                'https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.0.5/svg.min.js',
                'https://cdn.jsdelivr.net/npm/@svgdotjs/svg.filter.js@3.0.1/dist/svg.filter.min.js',
                'https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js',
                'https://cdn.jsdelivr.net/npm/@svgdotjs/svg.filter.js@3.0.1/dist/svg.filter.min.js',
                {'src': "https://code.jquery.com/jquery-1.12.4.min.js",
                 'integrity': "sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ",
                 'crossorigin': "anonymous"}
            ],
            assets_url_path='/assets',
            update_title='Loading...',
            external_stylesheets=[dbc.themes.GRID,
                                  # can insert own css files here
                                  # '/static/dist/css/styles.css'
                                  dbc.themes.LUMEN],
        )
    else:
        # Define encapsulating dash app
        dash_app = dash.Dash(
            routes_pathname_prefix=URL_BASE,
            assets_url_path='/assets',
            update_title='Loading...',
            external_stylesheets=[dbc.themes.GRID,
                                  # can insert own css files here
                                  # '/static/dist/css/styles.css'
                                  dbc.themes.LUMEN],
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
    #
    # add sidebar
    _sidebar = html.Div(
        [
            html.Button('<',
                        id='toggle_button',
                        style={
                            'marginLeft': '9rem',
                            "backgroundColor": "#ebc700",
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

    # data = {'canvas': {}}
    # data['canvas']['x'] = 1200
    # with open(r'..\dash_simtool\data\json.txt', 'w') as outfile:
    #     json.dump(data, outfile)

    with open(dash_simtool.TEMPLATES_DIR + 'dash_sim_tool.html', "r") as dash_app_html_file:
        dash_app_html = dash_app_html_file.read()
        dash_app_html = dash_app_html.replace('{% marginLeft %}', styling.CONTENT_STYLE['marginLeft'])
        dash_app_html = dash_app_html.replace('{% marginTop %}', "0px")
        dash_app.index_string = dash_app_html

    # dash_app.layout = html.Div([_nav_bar])

    #
    # compile overall layout
    dash_app.layout = html.Center([dcc.Location(id="home"),
                                   dcc.Store(id='side_click'),
                                   _nav_bar,
                                   _sidebar,
                                   _body,
                                   ],
                                  )
    #
    # dash_app = callbacks.init_callbacks(dash_app)

    return dash_app if server == "" else dash_app.server
