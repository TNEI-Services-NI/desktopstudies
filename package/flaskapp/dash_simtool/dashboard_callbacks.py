import copy
from datetime import datetime

import dash
from dash.dependencies import Output, Input, State

from flask import session

# INT IMPORTS
from package.flaskapp.dash_simtool.dashboard_components import init_calendar, init_line, init_graph_layout
# from package.flaskapp.dash_simtool.dataprocessing import format_dfs, calc_success
from ..auth.routes import login_required
import dash_html_components as html
import dash_core_components as dcc
import dash_bootstrap_components as dbc
import package.flaskapp.dash_simtool.dashboard_styling as styling


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
            State("side_click", "data"),
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


def _add_render_page_content(dash_app):
    @dash_app.callback(Output("page-content", "children"), [Input("url", "pathname")])
    def render_page_content(pathname):
        if pathname in ["/", "/page-1"]:
            return html.P("This is the content of page 1!")
        elif pathname == "/page-2":
            return html.P("This is the content of page 2. Yay!")
        elif pathname == "/page-3":
            return html.P("Oh cool, this is page 3!")
        # If the user tries to reach a different page, return a 404 message
        return dbc.Jumbotron(
            [
                html.H1("404: Not found", className="text-danger"),
                html.Hr(),
                html.P(f"The pathname {pathname} was not recognised..."),
            ]
        )

    return dash_app


def init_callbacks(dash_app):
    dash_app = _add_toggle_sidebar(dash_app)
    dash_app = _add_render_page_content(dash_app)

    return dash_app
