# -*- coding: utf-8 -*-
import os
import warnings
import pandas as pd

import package.flaskapp.config as flask_cf
import package.data.simtool.migrate as db_access

dir_data = os.path.dirname(__file__)

dir_simtool_data = '/'.join([dir_data, 'simtool'])

dir_raw_simtool_data = '/'.join([dir_simtool_data, 'raw'])
dir_breaker_states = '/'.join([dir_simtool_data, 'breakerstates'])
dir_network_views = '/'.join([dir_simtool_data, 'networkviews'])
dir_actions = '/'.join([dir_simtool_data, 'actions'])
dir_active_simulation = '/'.join([dir_simtool_data, 'activesimulation'])

dir_restoration_steps = '/'.join([dir_simtool_data, 'restorationsteps'])

dir_auth_data = '/'.join([dir_data, 'auth'])


def _fetch_files(directory: str, file_type: str = '.csv'):
    list_files = os.listdir(directory)
    dict_files = {k.split(file_type)[0]: k for k in list_files}
    return dict_files


def read_LF_file(network="chapelcross", voltage="33kv", option="Opt5", rev='16'):
    raw_data_files = _fetch_files(dir_raw_simtool_data, file_type='.xlsx')
    # filename = raw_data_files[network + voltage + option]
    print(raw_data_files)
    filename = raw_data_files[network + option + '_R{}'.format(rev)]

    dict_data = {'generators': {}, 'busbars': {}, 'lines': {}, 'transformers': {}}

    dict_data['generators']['active_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                            , sheet_name='Generators - Active Power')
    dict_data['generators']['reactive_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                              , sheet_name='Generators - Reactive Power')
    dict_data['generators']['rating'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                              , sheet_name='Generators - Rating')


    dict_data['busbars']['voltage'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                    , sheet_name='Busbars - Voltage(pu)')


    dict_data['transformers']['loading'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                         , sheet_name='Transformers - Loading')
    dict_data['transformers']['rating'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                         , sheet_name='Transformers - Rating')
    dict_data['transformers']['taps'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                      , sheet_name='Transformers - Taps')
    dict_data['transformers']['current'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                      , sheet_name='Transformers - Amps')
    dict_data['transformers']['active_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                      , sheet_name='Transformers - MW')
    dict_data['transformers']['apparent_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                      , sheet_name='Transformers - MVA')
    dict_data['transformers']['reactive_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                      , sheet_name='Transformers - MVar')



    dict_data['lines']['loading'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                  , sheet_name='Lines - Loading')
    dict_data['lines']['active_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                       , sheet_name='Lines - Active Power')
    dict_data['lines']['reactive_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                         , sheet_name='Lines - Reactive Power')
    dict_data['lines']['current'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                         , sheet_name='Lines - Current')

    for component, dict_comp_data in dict_data.items():
        for param, comp_data in dict_comp_data.items():
            comp_data_ = _filter_format_data(comp_data)
            comp_data_columns_idx, comp_data_columns_name = get_data_cols(comp_data_)
            dict_data[component][param] = {'data': comp_data_,
                                           'fields_idx': comp_data_columns_idx,
                                           'fields_name': comp_data_columns_name}

    return dict_data


def read_breaker_states(network: str, option: str):
    states_by_option = _fetch_files(dir_breaker_states)
    option_folder = states_by_option['Opt' + option]
    dir_option = '/'.join([dir_breaker_states, option_folder])
    breaker_state_files = _fetch_files(dir_option)
    # filename = breaker_state_files[network]

    # df_breakerstates = pd.read_csv('/'.join([dir_option, filename]))
    df_breakerstates = pd.read_csv('/'.join([dir_option, "allbreakers.csv"]))

    # df_breakerstates = db_access.read_data("breakerstates",
    #                                        os.environ.get('DATABASE_URL', flask_cf.Config.SQLALCHEMY_DATABASE_URI))

    # format data
    df_breakerstates = df_breakerstates.convert_dtypes(convert_string=True)
    df_breakerstates = df_breakerstates.set_index('breaker')
    return df_breakerstates


def read_breaker_states_db(network: str, option: str):
    states_by_option = _fetch_files(dir_breaker_states)
    option_folder = states_by_option['Opt' + option]
    dir_option = '/'.join([dir_breaker_states, option_folder])
    breaker_state_files = _fetch_files(dir_option)
    # filename = breaker_state_files[network]

    # df_breakerstates = pd.read_csv('/'.join([dir_option, filename]))
    # df_breakerstates = pd.read_csv('/'.join([dir_option, "allbreakers.csv"]))
    e = db_access.generate_engine(local=False)
    df_breakerstates = db_access.read_data("breakerstates", e)

    steps = len(list(filter(lambda x: 'step' in x, df_breakerstates.columns)))
    df_breakerstates = df_breakerstates.rename(columns={'step_{}'.format(col): "{}".format(col-2) for col in range(0, steps)})

    # format data
    df_breakerstates = df_breakerstates.applymap(str)
    df_breakerstates = df_breakerstates.set_index('breaker')
    df_breakerstates = df_breakerstates.loc[df_breakerstates['option']==option]
    print(df_breakerstates.head())
    return df_breakerstates


def read_network_views(option: str):
    networks_by_option = _fetch_files(dir_network_views)
    option_folder = networks_by_option['Opt' + option]
    dir_option = '/'.join([dir_network_views, option_folder])
    network_views = _fetch_files(dir_option)

    df_views = pd.read_csv('/'.join([dir_option, "views.csv"]))

    # format data
    df_views = df_views.convert_dtypes(convert_string=True)
    df_views = df_views.set_index('entity')
    df_views.columns = list(map(int, df_views.columns))
    return df_views


def read_network_views_db(option: str):
    networks_by_option = _fetch_files(dir_network_views)
    option_folder = networks_by_option['Opt' + option]
    dir_option = '/'.join([dir_network_views, option_folder])
    network_views = _fetch_files(dir_option)

    # df_views = pd.read_csv('/'.join([dir_option, "views.csv"]))
    e = db_access.generate_engine(local=False)
    df_views = db_access.read_data("networkviews", e)
    df_views = df_views.loc[df_views['option']==option]
    # format data
    df_views = df_views.applymap(str)
    df_views = df_views.set_index('entity')

    df_views = df_views.loc[:, list(filter(lambda x: 'step' in x, df_views.columns))]
    df_views.columns = list(map(lambda x: int(x.split("_")[1])-2, df_views.columns))

    return df_views


def read_actions(option: str):
    actions_by_option = _fetch_files(dir_actions)
    option_folder = actions_by_option['Opt' + option]
    dir_option = '/'.join([dir_actions, option_folder])
    actions = _fetch_files(dir_option)

    df_actions = pd.read_csv('/'.join([dir_option, "actions.csv"]))

    # format data
    df_actions = df_actions.fillna('')
    df_actions = df_actions.convert_dtypes(convert_string=True)
    df_actions = df_actions.set_index('entity')
    df_actions.columns = list(map(int, df_actions.columns))
    return df_actions


def read_actions_db(option: str):
    actions_by_option = _fetch_files(dir_actions)
    option_folder = actions_by_option['Opt' + option]
    dir_option = '/'.join([dir_actions, option_folder])
    actions = _fetch_files(dir_option)

    e = db_access.generate_engine(local=False)
    df_actions = db_access.read_data("actions", e)

    steps = len(list(filter(lambda x: 'step' in x, df_actions.columns)))
    df_actions = df_actions.rename(
        columns={'step_{}'.format(col): "{}".format(col - 2) for col in range(0, steps)})

    # format data
    df_actions = df_actions.fillna('')
    df_actions = df_actions.convert_dtypes(convert_string=True)
    df_actions = df_actions.set_index('entity')
    df_actions.columns = list(map(int, df_actions.columns))
    return df_actions


def read_restoration_step(case_network: str, network: str, option: str, scenario: str, stage: int):

    dir_opt_scen = '/'.join([dir_restoration_steps, 'Opt' + option, case_network])
    # dict_filenames = _fetch_files(dir_opt_scen)
    # dict_data = {k: pd.read_csv('/'.join([dir_opt_scen, v]),
    #                              dtype={'Name': str})
    #                     .set_index("Name")
    #              for k, v in dict_filenames.items()}
    df_data = pd.read_csv('/'.join([dir_opt_scen, 'alldata.csv']), index_col=0)

    dict_data = {k: df_data.loc[df_data['component']==k, :] for k in df_data['component'].unique()}

    del df_data

    if stage is not None:
        dict_data = {k: v.loc[:, 'Step {}'.format(stage)]
                     for k, v in dict_data.items()}

        dict_data['transformer_apparent_power'] = dict_data['transformers_loading'] * dict_data['transformers_rating'].replace(999,0).replace(-999,0)

        dict_data = {k: v.to_json()
                     for k, v in dict_data.items()}

    return dict_data


def read_restoration_step_db(case_network: str, network: str, option: str, scenario: str, stage: int):

    dir_opt_scen = '/'.join([dir_restoration_steps, 'Opt' + option, case_network])
    # dict_filenames = _fetch_files(dir_opt_scen)
    # dict_data = {k: pd.read_csv('/'.join([dir_opt_scen, v]),
    #                              dtype={'Name': str})
    #                     .set_index("Name")
    #              for k, v in dict_filenames.items()}
    # df_data = pd.read_csv('/'.join([dir_opt_scen, 'alldata.csv']), index_col=0)
    e = db_access.generate_engine(local=False)
    df_data = db_access.read_data("restorationsteps", e)

    steps = len(list(filter(lambda x: 'step' in x, df_data.columns)))
    df_data = df_data.rename(columns={'step_{}'.format(col): "Step {}".format(col-2) for col in range(0, steps)})

    dict_data = {k: df_data.loc[df_data['component']==k, :] for k in df_data['component'].unique()}

    del df_data

    if stage is not None:
        dict_data = {k: v.loc[:, 'Step {}'.format(stage)]
                     for k, v in dict_data.items()}

        dict_data['transformer_apparent_power'] = dict_data['transformers_loading'] * dict_data['transformers_rating'].replace(999,0).replace(-999,0)

        dict_data = {k: v.to_json()
                     for k, v in dict_data.items()}

    return dict_data

def read_active_network():
    active_sims = _fetch_files(dir_active_simulation)
    filename = active_sims['activesimulation']
    df_activesim = pd.read_csv('/'.join([dir_active_simulation, filename]))
    return df_activesim


def read_active_network_db():
    active_sims = _fetch_files(dir_active_simulation)
    filename = active_sims['activesimulation']
    df_activesim = pd.read_csv('/'.join([dir_active_simulation, filename]))
    return df_activesim


def _filter_format_data(comp_data_):
    comp_data_ = comp_data_.copy()
    from_col = comp_data_.columns[(comp_data_ == 'Name').any() == True].values
    from_row = comp_data_.index[(comp_data_ == 'Name').any(axis=1) == True].values

    table = comp_data_.columns[0]

    from_col = from_col[0] if len(from_col) == 1 else print("Name found more than once in {}".format(table))
    from_row = from_row[0] if len(from_row) == 1 else None

    from_col = comp_data_.columns.tolist().index(from_col)

    from_row = comp_data_.index.tolist().index(from_row)

    comp_data_ = comp_data_.iloc[:, from_col:]
    comp_data_.columns = comp_data_.iloc[from_row, :]

    name_col_vals = comp_data_['Name'].tolist()

    if 'Vlookup' not in name_col_vals:
        print('Vlookup not found in {}'.format(table))
        exit(-1)

    to_row = name_col_vals.index('Vlookup')

    last_step = [x for x in comp_data_.columns if 'Step' in str(x)][-1]
    to_col = comp_data_.columns.tolist().index(last_step)

    comp_data_ = comp_data_.iloc[from_row+1:to_row, :to_col+1]

    comp_data_ = comp_data_.loc[~comp_data_.loc[:, 'Name'].isna(), :]

    comp_data_columns = list(filter(lambda x: type(x) == str, comp_data_.columns))
    comp_data_ = comp_data_.loc[:, comp_data_columns]

    if (comp_data_['Name'].value_counts() > 1).any():
        msg = "\nWARNING: Names \n{}\n found more than once in\n{}".format(comp_data_['Name'].value_counts()[comp_data_['Name'].value_counts() > 1].index.tolist(), table)
        comp_data_ = comp_data_.drop_duplicates(subset='Name')
        warnings.warn(msg)

    comp_data_ = comp_data_.rename(columns={
        'Stage - Post Blackout': "Step -2",
        "Stage - Pre Restoration": "Step -1",
    })

    return comp_data_


def get_data_cols(comp_data_):
    comp_cols_ = comp_data_.columns.tolist()

    name_col = comp_cols_.index('Name')
    post_blackout_col = comp_cols_.index('Step -2')
    limit_cols = [x for x in range(name_col + 1, post_blackout_col)]
    stage_cols = [x for x in range(post_blackout_col + 1, len(comp_data_.columns))]
    return {'name': [name_col], 'limits': limit_cols,
            'post_blackout': [post_blackout_col], 'stages': stage_cols}, \
           {'name': ['Name'], 'limits': [comp_cols_[x] for x in limit_cols],
            'post_blackout': ["Step -2"], 'stages': [comp_cols_[x] for x in stage_cols]}


if __name__ == '__main__':
    dict_data = read_LF_file("chapelcross", "Opt5")
    # read_breaker_states_db("chapelcross33kv", "Opt5")