# INT IMPORTS
import pandas as pd
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
        df_gens = dict_data['generators_active_power'].filter(like='Step')
        df_gens = df_gens.rename(columns={'Step -2':"Post blackout",
                                  "Step -1": "Pre-restoration"}).T
        df_gens = df_gens.loc[:, ["STCR5-_1", "EWEHILL_1", "EWEHILL_2", "MINS0G_1"]]
        df_gens = df_gens.rename(columns={'STCR5-_1':"Stevens Croft",
                                  "EWEHILL_1": "Ewe Hill 1 WF",
                                  "EWEHILL_2": "Ewe Hill 2 WF",
                                 "MINS0G_1": "Minsca WF", })

        df_gens.index.name = "Generator"
        fig1 = px.bar(df_gens,
                     # x="Simulation Step", y="Active Power (MW)",
                     )
        fig1.update_layout(
            title='Generator Active Power',
            titlefont_size=22,
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
            bargroupgap=0.1,  # gap between bars of the same location coordinate.
            legend_title_text = df_gens.index.name
        )


        df_data = dict_data['transformers_active_power'].filter(like='Step')
        df_data = df_data.rename(columns={'Step -2': "Post blackout",
                                  "Step -1": "Pre-restoration"}).T
        txs = {"ANANT1_ANAN10_T1": "Annan T1",
         "ANANT2_ANAN20_T2": "Annan T2",
         "MIBIT1_MIBI10_T1": "Middlebie",
         ("LAHOT1_LAHO10_T1", "LAHOT2_LAHO20_T2"): "Langholm T1 and T2",
         ("GRNAT1_GRNA10_T1", "GRNAT2_GRNA20_T2"): "Gretna T1 and Gretna T2",
         "NEWCT1_NEWC10_T1": "Newcastleton",
         "LOBIT1_LOBI10_T1": "Lockerbie T1",
         "LOBIT2_LOBI20_T2": "Lockerbie T2",
         ("KIBAT1_KIBA10_T1", "MOFTT1_MOFT10_T1"): "Kirkbank T1 and Moffat T1",
         "MOFTT2_MOFT20_T2": "Moffat T2"}
        load_banks = {"STCR_LOADBANK": 'Stevens Croft Loadbank'}
        df_gens_loadbank = dict_data['generators_active_power'].filter(like='Step')
        df_gens_loadbank = df_gens_loadbank.rename(columns={'Step -2': "Post blackout",
                                  "Step -1": "Pre-restoration"}).T

        df_gens_loadbank = df_gens_loadbank.loc[:, [k for k in load_banks.keys()]]
        df_gens_loadbank = df_gens_loadbank.rename(columns=load_banks)

        tx_names = sum([list(x) if type(x) == tuple else [x] for x in txs.keys()], [])

        df_data = df_data.loc[:, tx_names]
        df_data_new = pd.DataFrame()

        for txs_, name in txs.items():
            if type(txs_) == tuple:
                df_data_new.loc[:, name] = df_data.loc[:, list(txs_)].sum(axis=1)
            else:
                df_data_new.loc[:, name] = df_data.loc[:, txs_]

        df_data_new.index = df_data.index
        df_data_new.index.name = "Load"
        df_data_new = df_data_new.merge(df_gens_loadbank, left_index=True, right_index=True, how='left')
        df_data_new.loc[:, 'Losses'] = df_gens.sum(axis=1) - df_data_new.sum(axis=1)

        fig2 = px.bar(df_data_new,
                     # x="Simulation Step", y="Active Power (MW)",
                     )
        fig2.update_layout(
            title='Demand Active Power',
            titlefont_size=22,
            xaxis_tickfont_size=14,
            yaxis=dict(
                title='(MW)',
                titlefont_size=14,
                tickfont_size=12,
            ),
            xaxis=dict(
                title='Simulation Step',
                titlefont_size=14,
                tickfont_size=12,
            ),
            legend_title_text=df_data_new.index.name,
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
