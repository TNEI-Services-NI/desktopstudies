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
        dbc.CardHeader(
            html.H4("Distributed ReStart")),
        dbc.CardBody([
            html.P('The project is exploring how distributed energy resources (DER) can be used to restore power in '
                   'the highly unlikely '
                   'event of a total or partial shutdown of the National Electricity Transmission System as part of '
                   'a Black Start procedure. '
                   'Past and current approaches rely on large power stations but as the UK moves to cleaner, '
                   'greener and more '
                   'decentralised energy, new options must be developed. The enormous growth in DERs presents an '
                   'opportunity to '
                   'develop a radically different approach to system restoration. Greater diversity in Black Start '
                   'provision will improve '
                   'resilience and increase competition leading to reductions in both cost and carbon emissions. '
                   'However, there are '
                   'significant technical, organisational and commercial challenges to address.'
                   ),
            html.P('The project seeks to tackle these challenges throughout a three-year programme '
                   '(Jan 2019 – Mar 2022) that aims to develop and demonstrate new approaches, with initial '
                   'implementations of Black Start service from DERs from mid-2022 if deemed '
                   'feasible and cost effective. Case studies on the SP Distribution (SPD) and SP Manweb (SPM) '
                   'networks have been used '
                   'to explore options then design and test solutions through a combination of desktop studies, '
                   'detailed off-line analysis, stakeholder engagement and industry consultation and real-life trials'
                   ' of the re-energisation process.'
                   ),

        ], style={"text-align": "left"})
    ],
        style={"width": "95%", "margin-top": "30%"},
    )

    desktop_studies = dbc.Card([
        dbc.CardHeader(
            html.H4("Desktop Studies")),
        dbc.CardBody([
            # html.P('Through communication between the DNO, ESO, TO, and DER, The process of re-energising the network by '
            #        'closing breakers in the prescribed order will be organised'),
            html.P('The desktop exercises aim to test Distributed ReStart processes in terms of the roles for each'
                    'Black Start participant, and the timing of the process.'),
            html.P('These will also allow us to increase stakeholder participation in Distributed ReStart to gain valuable feedback'
                    'for process refinement, work through a range of scenarios, and gain information for development of high-level'
                    'training plans.'),
            html.P('We will test the process maps through use of desktop exercises and potential simulation of an event. This coupled'
                    'with the learnings from live power engineering trials will provide confidence in the efficacy of Distributed ReStart'
                    'should a Black Start event occur and provide the model for training and assurance of the ongoing service.'),
            html.P('We anticipate that significant value will be unlocked from exercises with cross industry participation that focus on'
                    'communication and decision-making processes. These exercises may be repeated multiple times and will look to'
                    'test the various scenarios that may lead to a Black Start procedure being enacted to ensure fit for purpose processes'
                    'that can adapt to different possible needs cases.')

        ], style={"text-align": "left"})
    ],
        style={"width": "95%", "margin-top": "30%"},
    )

    how_to_card = dbc.Card([
        dbc.CardHeader(
            html.H4("How To Use This Tool")),
        dbc.CardBody([
            # html.P('Through communication between the DNO, ESO, TO, and DER, The process of re-energising the network by '
            #        'closing breakers in the prescribed order will be organised'),
            html.P('The stages of the re-energising simulation are navigated by altering the states of components as '
                   'prescribed by the restoration script. '
                   ),
            html.H4("Navigating"),
            html.P("The top navigation bar allows you to navigate the tools pages."),
            html.P("The Home Page shows the view relevant to your role"),
            html.P("SLDs allows access to to view all parts of the network"),
            html.P("Finally the Script page displays a copy of the restoration script."),

            html.H4("Viewing Data"),
            html.P(
                "Data regarding the current state of the network is immediately available in the form of panels which"
                "show generator information, available Power, or specific data from busbars and lines. Alternatively, "
                "By Hovering over components with the mouse pointer, a modal window will show all "
                "data available for the given component"),

            html.H4("Interaction"),
            html.P(
                "Circuit breakers can change state between being closed and opened by clicking them. "
                "You may only interact with breakers which are under your roles authority. "
                "When all relevant breakers are in the correct state the simulation will progress to the next step")

        ])
    ],
        style={"width": "95%", "margin-top": "30%"},
    )

    legend = dbc.Card(
        [
            dbc.CardHeader(
                html.H4("Legend")),

            dbc.CardImg(src="/static/imgs/legend1.jpg", top=True),
        ],
        style={"width": "95%", "margin-top": "3%", "margin-bottom": "3%"},
    )

    about_cards = html.Div([
        dbc.Row([
            dbc.Col([intro_card]),
            dbc.Col([desktop_studies]),
            # dbc.Col([how_to_card]),
        ])
    ], style={'width': '95%'})

    # background_image = html.Div(, children=[html.Div(style={
    #         'background-size': "100vw 100vh",
    # })])
    # compile overall layout
    dash_app.layout = html.Center([dcc.Location(id="home"),
                                   dcc.Store(id='network_select'),
                                   dcc.Store(id='side_click'),
                                   dcc.Store(id='reset_click'),
                                   dcc.Store(id='sim_state'),
                                   # background_image,
                                   _nav_bar,
                                   _body,
                                   about_cards,
                                   ],
                                  )

    # dash_app = callbacks.init_callbacks(dash_app, URL_PAGE)

    return dash_app if server == "" else dash_app.server
