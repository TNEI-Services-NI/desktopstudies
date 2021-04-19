# -*- coding: utf-8 -*-
import os
import pandas as pd

dir_data = os.path.dirname(__file__)

dir_simtool_data = '\\'.join([dir_data, 'simtool'])

dir_raw_simtool_data = '\\'.join([dir_simtool_data, 'raw'])
dir_breaker_states = '\\'.join([dir_simtool_data, 'breakerstates'])
dir_active_simulation = '\\'.join([dir_simtool_data, 'activesimulation'])

dir_restoration_steps = '\\'.join([dir_simtool_data, 'restorationsteps'])

dir_auth_data = '\\'.join([dir_data, 'auth'])


def _fetch_files(directory: str, file_type: str = '.csv'):
    list_files = os.listdir(directory)
    dict_files = {k.split(file_type)[0]: k for k in list_files}
    return dict_files


def read_breaker_states(network: str, option: str):
    states_by_option = _fetch_files(dir_breaker_states)
    option_folder = states_by_option['Opt' + option]
    dir_option = '/'.join([dir_breaker_states, option_folder])
    breaker_state_files = _fetch_files(dir_option)
    filename = breaker_state_files[network]

    df_breakerstates = pd.read_csv('/'.join([dir_option, filename]))
    df_breakerstates = pd.read_csv('/'.join([dir_option, "allbreakers.csv"]))

    # format data
    df_breakerstates = df_breakerstates.convert_dtypes(convert_string=True)
    df_breakerstates = df_breakerstates.set_index('breaker')
    return df_breakerstates


def read_restoration_step(network: str, option: str, scenario: str, stage: int):
    dir_opt_scen = '/'.join([dir_restoration_steps, 'Opt' + option, network])
    dict_filenames = _fetch_files(dir_opt_scen)
    dict_data = {k: pd.read_csv('/'.join([dir_opt_scen, v]),
                                 dtype={'Name': str})
                        .set_index("Name")
                        .round(3)
                        .loc[:, 'Stage {}'.format(stage)]
                        .to_json()
                 for k, v in dict_filenames.items()}
    # df_restoration = df_restoration.set_index("component")
    # df_restoration = df_restoration.loc[:, stage]
    return dict_data


def read_active_network():
    active_sims = _fetch_files(dir_active_simulation)
    filename = active_sims['activesimulation']
    df_activesim = pd.read_csv('/'.join([dir_active_simulation, filename]))
    return df_activesim


def _filter_format_data(comp_data_):
    comp_data_ = comp_data_.copy()
    comp_data_ = comp_data_.iloc[:, 4:]
    comp_data_.columns = comp_data_.iloc[6, :]
    comp_data_ = comp_data_.iloc[7:, :]
    comp_data_ = comp_data_.loc[~comp_data_.iloc[:, 0].isna(), :]

    comp_data_columns = list(filter(lambda x: type(x) == str, comp_data_.columns))
    comp_data_ = comp_data_.loc[:, comp_data_columns]

    comp_data_ = comp_data_.rename(columns={
        'Stage - Post Blackout': "Stage -1",
    })

    return comp_data_


def get_data_cols(comp_data_):
    comp_cols_ = comp_data_.columns.tolist()
    name_col = comp_cols_.index('Name')
    post_blackout_col = comp_cols_.index('Stage -1')
    limit_cols = [x for x in range(name_col + 1, post_blackout_col)]
    stage_cols = [x for x in range(post_blackout_col + 1, len(comp_data_.columns))]
    return {'name': [name_col], 'limits': limit_cols,
            'post_blackout': [post_blackout_col], 'stages': stage_cols}, \
           {'name': ['Name'], 'limits': [comp_cols_[x] for x in limit_cols],
            'post_blackout': ["Stage -1"], 'stages': [comp_cols_[x] for x in stage_cols]}


def read_LF_file(network="chapelcross33kv", option="Opt5"):
    raw_data_files = _fetch_files(dir_raw_simtool_data, file_type='.xlsx')
    filename = raw_data_files[network + option]

    dict_data = {'generators': {}, 'busbars': {}, 'lines': {}, 'transformers': {}}

    dict_data['generators']['active_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                            , sheet_name='Generators - Active Power')
    dict_data['generators']['reactive_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                              , sheet_name='Generators - Reactive Power')
    dict_data['busbars']['voltage'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                    , sheet_name='Busbars - Voltage(pu)')
    dict_data['transformers']['loading'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                         , sheet_name='Transformers - Loading')
    dict_data['transformers']['taps'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                      , sheet_name='Transformers - Taps')
    dict_data['lines']['loading'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                  , sheet_name='Lines - Loading')
    dict_data['lines']['active_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                       , sheet_name='Lines - Active Power')
    dict_data['lines']['reactive_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename])
                                                         , sheet_name='Lines - Reactive Power')

    for component, dict_comp_data in dict_data.items():
        for param, comp_data in dict_comp_data.items():
            comp_data_ = _filter_format_data(comp_data)
            comp_data_columns_idx, comp_data_columns_name = get_data_cols(comp_data_)
            dict_data[component][param] = {'data': comp_data_,
                                           'fields_idx': comp_data_columns_idx,
                                           'fields_name': comp_data_columns_name}

    return dict_data


if __name__ == '__main__':
    dict_data = read_LF_file("chapelcross33kv", "Opt5")
