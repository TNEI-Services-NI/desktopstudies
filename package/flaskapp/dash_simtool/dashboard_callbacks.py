import copy
from datetime import datetime

import dash
from dash.dependencies import Output, Input, State

from flask import session

# INT IMPORTS
from baseliningtool.config import COUNTRY
from baseliningtool.flaskapp.dashapp.dashboard_components import init_calendar, init_line, init_graph_layout
from baseliningtool.flaskapp.dashapp.dataprocessing import format_dfs, calc_success
from baseliningtool.data import load_bank_holidays
from baseliningtool.models.main import baseline_calculation
from ..auth.routes import login_required
import dash_html_components as html
import dash_core_components as dcc
import dash_bootstrap_components as dbc


def init_callbacks(dash_app):
    for view_func in dash_app.server.view_functions:
        if view_func.startswith('/baselining_app/'):
            dash_app.server.view_functions[view_func] = login_required(dash_app.server.view_functions[view_func])

    @dash_app.callback(
        [Output('user_auth', 'children'),
         Output('logout_button', 'children')],
        [Input('div1', 'children')])
    def update_intervalCurrentTime(children):
        return ["Logged in: {}".format(session.get('username', None)),
                html.Button(children=['Logout'], type='submit', id='logout_button')]

    # @dash_app.callback(
    #     Output('div0', 'children'),
    #     [Input('method-radio', 'value')])
    # def update_method(method_value):
    #     session['method'] = method_value
    #     print(session.get('method', None))
    #     return ""

    @dash_app.callback(Output("hidden_div_for_redirect_callback", "children"),
                  [Input("logout_button", "n_clicks")])
    def logout_user_(n_clicks):
        if n_clicks is None:
            pass
        else:
            if n_clicks>0:
                session.clear()
                return dcc.Location(pathname="/auth/login", id="login")


    @dash_app.callback(
        [Output('individual_graph', 'figure'),
         Output('collapse', 'is_open'),
         ],
        [
            Input('method-radio', 'value'),
            Input('heatmap-cal-graph', 'clickData'),
            Input('upload-data', 'contents'),
            Input('upload-datetime-data', 'contents'),
            Input('d_cap', 'value'),
        ],
        [State('upload-data', 'filename'),
         ])
    def _display_clickdata(method_value, clickData, list_of_contents, list_of_datetimes, d_cap, list_of_names):
        session['method'] = method_value
        print(session.get('method', None))
        if list_of_contents is not None and list_of_datetimes is not None:
            dfs_contents, dfs_datetimes = format_dfs(list_of_contents, list_of_datetimes, list_of_names)

            bank_holidays = load_bank_holidays(COUNTRY)

            if d_cap is None:
                d_cap = dfs_contents[0]['power'].max() * 0.1

            d1, d2, z, df_z = calc_success(dfs_datetimes, dfs_contents, d_cap)
            print("Executing:")
            print(session.get('method', None))
            if clickData is None:
                for idr, row in dfs_datetimes[0].iloc[0:1, :].iterrows():
                    df_datesbefore = dfs_datetimes[0].copy()
                    df_datesbefore['date'] = df_datesbefore['from_time'].dt.date
                    list_datesbefore = df_datesbefore.loc[(df_datesbefore['date']
                                                           < row['from_time'].date()),
                                                          'from_time'].unique().tolist()
                    energy_delivered, success, df_profile = baseline_calculation(session.get('method', None), dfs_contents[0], d_cap,
                                                                                 row['from_time'],
                                                                                 row['to_time'],
                                                                                 previous_dsr_days=list_datesbefore,
                                                                                 bank_holidays=bank_holidays)
            else:
                clickData = datetime.strptime(clickData['points'][0]['text'], "%Y-%m-%d")
                df_datesbefore = dfs_datetimes[0].copy()
                df_datesbefore['date'] = df_datesbefore['from_time'].dt.date
                start_time = df_z.loc[df_z['date'] == clickData.date(), 'from_datetime'].values[0]
                fin_time = df_z.loc[df_z['date'] == clickData.date(), 'to_datetime'].values[0]
                list_datesbefore = df_datesbefore.loc[(df_datesbefore['date'] < clickData.date()),
                                                      'from_time'].unique().tolist()
                energy_delivered, success, df_profile = baseline_calculation(session.get('method', None), dfs_contents[0], d_cap,
                                                                             start_time,
                                                                             fin_time,
                                                                             previous_dsr_days=list_datesbefore,
                                                                                 bank_holidays=bank_holidays)

            df_profile = df_profile.set_index(['time'])

            max_min = [df_profile.max().max(), 0]

            capacity = df_profile[['response']].rename(columns={'response': 'capacity'})
            capacity.loc[~capacity['capacity'].isna(), 'capacity'] = d_cap
            capacity.loc[:, 'capacity'] = capacity.loc[:, 'capacity'].fillna(0)
            capacity.loc[:, 'capacity_max'] = capacity.loc[:, 'capacity']
            capacity.loc[:, 'capacity_min'] = capacity.loc[:, 'capacity'] * 0.9

            layout_individual = copy.deepcopy(init_graph_layout())

            data = [
                init_line(df_profile['measured'], 'Measured [kW]', '#a9bb95'),

                init_line(df_profile['baseline'], 'Baseline [kW]', '#737373'),

                init_line(df_profile[['baseline_max', 'baseline_min']], 'Baseline [kW]', '#a6a6a6', 'region'),

                init_line(df_profile['response'].fillna(0), 'Response [kW]', '#92d8d8'),

                init_line(df_profile.loc[~df_profile['response'].isna(), 'response'], 'Baseline [kW]', '#92d8d8',
                           'window', max_min),

                # _init_line(capacity['capacity_min'], 'Contracted Cap (-10%) [kW]', '#fac1b7', 'line', width=1,
                #            mode='lines', dash='dash'),

                init_line(capacity['capacity'], 'Contracted Cap [kW]', '#fac1b7'),
            ]
            layout_individual['title'] = "Successful: {}, Energy Delivered: {} kW, Contracted Cap: {} kW".format(
                success, round(energy_delivered, 3), round(d_cap, 3))

            figure = dict(data=data, layout=layout_individual)
            return figure, True
        else:
            return dash.no_update, False

    @dash_app.callback([Output('heatmap-cal-graph', 'figure'),
                        Output('heatmap-cal-div', 'style')],
                       [
                           Input('upload-data', 'contents'),
                           Input('upload-datetime-data', 'contents'),
                           Input('d_cap', 'value'),
                       ],
                       [State('upload-data', 'filename'),
                        ])
    def make_main_figure(list_of_contents, list_of_datetimes, d_cap, list_of_names):
        if list_of_contents is not None and list_of_datetimes is not None:

            dfs_contents, dfs_datetimes = format_dfs(list_of_contents, list_of_datetimes, list_of_names)

            # TODO (MM) - plumb in country dropdown
            d1, d2, z, df_z = calc_success(dfs_datetimes, dfs_contents, d_cap, COUNTRY)

            _div, dict_cal = init_calendar(d1, d2, z)

            return dict_cal, {'display': 'inline-block', 'width': '50%'}
        else:
            return dash.no_update, {'display': 'block', 'width': '50%'}

    return dash_app