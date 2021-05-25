# INT IMPORTS
from dash.dependencies import Output, Input, State
import package.data as simtool_data
import plotly.express as px


def _add_bar_chart(dash_app):
    @dash_app.callback(
        [
            Output("bar-chart-1", "figure"),
            Output("bar-chart-1", "style"),
            Output("bar-chart-2", "figure"),
            Output("bar-chart-2", "style"),
        ],
        [Input("reset_click", "data")])
    def update_bar_chart(data):
        dict_data = simtool_data.read_restoration_step("chapelcross", "", "5", "", None)
        df_data = dict_data['generators_active_power'].filter(like='Step')
        df_data = df_data.rename(columns={'Step -2':"Post blackout",
                                  "Step -1": "Pre-restoration"}).T
        df_data = df_data.loc[:, ["STCR5-_1", "EWEHILL_1", "EWEHILL_2", "MINS0G_1"]]
        df_data = df_data.rename(columns={'STCR5-_1':"Stevens Croft",
                                  "EWEHILL_1": "Ewe Hill 1 WF",
                                  "EWEHILL_2": "Ewe Hill 2 WF",
                                 "MINS0G_1": "Minsca WF", })
        fig1 = px.bar(df_data,
                     # x="Simulation Step", y="Active Power (MW)",
                     )
        fig1.update_layout(
            title='Generator Active Power',
            titlefont_size=18,
            xaxis_tickfont_size=14,
            yaxis=dict(
                title='Active Power (MW)',
                titlefont_size=14,
                tickfont_size=12,
            ),
            xaxis=dict(
                title='Simulation Step',
                titlefont_size=14,
                tickfont_size=12,
            ),
            bargap=0.15,  # gap between bars of adjacent location coordinates.
            bargroupgap=0.1  # gap between bars of the same location coordinate.
        )

        df_data = dict_data['generators_reactive_power'].filter(like='Step')
        df_data = df_data.rename(columns={'Step -2':"Post blackout",
                                  "Step -1": "Pre-restoration"}).T
        df_data = df_data.loc[:, ["STCR5-_1", "EWEHILL_1",
                                  "EWEHILL_2", "MINS0G_1"]]
        df_data = df_data.rename(columns={'STCR5-_1':"Stevens Croft",
                                  "EWEHILL_1": "Ewe Hill 1 WF",
                                  "EWEHILL_2": "Ewe Hill 2 WF",
                                 "MINS0G_1": "Minsca WF"})
        fig2 = px.bar(df_data,
                     # x="Simulation Step", y="Active Power (MW)",
                     )
        fig2.update_layout(
            title='Generator Reactive Power',
            titlefont_size=18,
            xaxis_tickfont_size=14,
            yaxis=dict(
                title='Reactive Power (MVAr)',
                titlefont_size=14,
                tickfont_size=12,
            ),
            xaxis=dict(
                title='Simulation Step',
                titlefont_size=14,
                tickfont_size=12,
            ),
            bargap=0.15,  # gap between bars of adjacent location coordinates.
            bargroupgap=0.1  # gap between bars of the same location coordinate.
        )
        return [fig1, {'visibility': 'visible'},
                fig2, {'visibility': 'visible'},
                ]
    return dash_app


def init_callbacks(dash_app, app_prefix):
    dash_app = _add_bar_chart(dash_app)
    return dash_app
