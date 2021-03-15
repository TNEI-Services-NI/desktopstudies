# -*- coding: utf-8 -*-
import dash
import dash_html_components as html
import dash_bootstrap_components as dbc
import dash_core_components as dcc

# INT IMPORTS
from baseliningtool.flaskapp.dashapp.dashboard_components import hidden_divs, compile_body, navbar_controls
from baseliningtool.flaskapp.dashapp.dashboard_callbacks import init_callbacks
from baseliningtool.config import rolling_methods

def init_dashboard(server=""):
    """Create a Plotly Dash dashboard."""

    if server == "":
        # Define encapsulating dash app
        dash_app = dash.Dash(
            routes_pathname_prefix='/baselining_app/',
            external_stylesheets=[dbc.themes.GRID,
                                  # can insert own css files here
                                  # '/static/dist/css/styles.css'
                                  dbc.themes.LUMEN])
    else:
        # Define encapsulating dash app
        dash_app = dash.Dash(
            server=server,
            routes_pathname_prefix='/baselining_app/',
            external_stylesheets=[dbc.themes.GRID,
                                  # can insert own css files here
                                  # '/static/dist/css/styles.css'
                                  dbc.themes.LUMEN]
        )

    # nav bar
    _nav_bar = dbc.NavbarSimple(brand="Flexibility Baselining - Results", color="primary", dark=True,
                                id='nav_bar',
                                children=navbar_controls()
                                )

    _method_bar = dbc.NavbarSimple(brand="\tMethodology:",
                                   color='secondary', dark=False,
                                   children=[
                                       dbc.Row(
                                           [
                                               html.Div([
                                                   dcc.RadioItems(
                                                       options=[
                                                           {'label': label, 'value': value}
                                                           for value, label in rolling_methods.items()
                                                       ],
                                                       value=[x for x in rolling_methods.keys()][0],
                                                       id='method-radio',
                                                       labelStyle = {'cursor': 'pointer',
                                                                     'margin-left': '20px',},
                                                       inputStyle={"margin-right": "6px"}
                                                   )
                                               ],
                                                   id='method_drop',

                                               ),
                                           ]
                                       )
                                   ])

    _hidden_divs = hidden_divs()

    # compile body
    _body = compile_body()

    # graphical output
    _data_upload_output = dbc.Row([dbc.Col([html.Div(id='output-data-upload')], width=2)])

    # compile overall layout
    dash_app.layout = html.Center([_hidden_divs[0],
                                   _hidden_divs[1],
                                   _hidden_divs[2],
                                    html.Br(),
                                   _nav_bar,
                                   _method_bar,

                                   html.Br(),
                                   _body,
                                   html.Br(),
                                   _data_upload_output,
                                   html.Br(),
                                   ],
                                  style={'width': '95vw', 'height': '90vh', 'margin-left': '2.5vw'}
                                  )

    # dash_app.layout = html.Center([]
    #                               )

    dash_app = init_callbacks(dash_app)

    return dash_app if server == "" else dash_app.server

