# -*- coding: utf-8 -*-
import os
import pandas as pd

dir_data = os.path.dirname(__file__)

dir_simtool_data = '\\'.join([dir_data, 'simtool'])

dir_raw_simtool_data = '\\'.join([dir_simtool_data, 'raw'])
dir_breaker_states = '\\'.join([dir_simtool_data, 'breakerstates'])
dir_restoration_steps = '\\'.join([dir_simtool_data, 'restorationsteps'])
dir_active_simulation = '\\'.join([dir_simtool_data, 'activesimulation'])

dir_auth_data = '\\'.join([dir_data, 'auth'])


def _fetch_files(directory: str, file_type: str = '.csv'):
    list_files = os.listdir(directory)
    dict_files = {k.split(file_type)[0]: k for k in list_files}
    return dict_files


def read_breaker_states(network: str, voltage: str):
    breaker_states = _fetch_files(dir_breaker_states)
    filename = breaker_states[network + voltage]
    df_breakerstates = pd.read_csv('/'.join([dir_breaker_states, filename]))
    df_breakerstates = df_breakerstates.convert_dtypes(convert_string=True)
    df_breakerstates = df_breakerstates.set_index('breaker')
    return df_breakerstates


def read_restoration_step(network: str, voltage: str, stage: int):
    restoration_steps = _fetch_files(dir_restoration_steps)
    filename = restoration_steps[network + voltage + "scenario1"]
    df_restoration = pd.read_csv('/'.join([dir_restoration_steps, filename]),
                                 dtype={'component': str})
    df_restoration = df_restoration.set_index("component")
    df_restoration = df_restoration.loc[:, stage]
    return df_restoration


def read_active_network():
    active_sims = _fetch_files(dir_active_simulation)
    filename = active_sims['activesimulation']
    df_activesim = pd.read_csv('/'.join([dir_active_simulation, filename]))
    return df_activesim


def _filter_format_data(comp_data_):
    comp_data_ = comp_data_.copy()
    comp_data_ = comp_data_.iloc[:, 4:]
    comp_data_ = comp_data_.iloc[7:, :]

    comp_data_ = comp_data_.copy()
    comp_data_.columns = comp_data_.iloc[6, :]

    comp_data_columns = list(filter(lambda x: type(x) == str, comp_data_.columns))
    comp_data_ = comp_data_.loc[:, comp_data_]

    return comp_data_


def read_LF_file(network, option):
    raw_data_files = _fetch_files(dir_raw_simtool_data, file_type='.xlsx')
    filename = raw_data_files[network+option]

    dict_data = {'generators': {}, 'busbars': {}, 'lines': {}, 'transformers': {}}

    dict_data['generators']['active_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Generators - Active Power')
    dict_data['generators']['reactive_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Generators - Reactive Power')
    dict_data['busbars']['voltage'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Busbars - Voltage(pu)')
    dict_data['transformers']['loading'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Transformers - Loading')
    dict_data['transformers']['taps'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Transformers - Taps')
    dict_data['lines']['loading'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Lines - Loading')
    dict_data['lines']['active_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Lines - Active Power')
    dict_data['lines']['reactive_power'] = pd.read_excel('/'.join([dir_raw_simtool_data, filename]), sheet_name='Lines - Reactive Power')

    for component, dict_comp_data in dict_data.items():
        for field, comp_data in dict_comp_data.items():
            comp_data_ = _filter_format_data(comp_data)

            dict_data[component][field] = comp_data

    print()

if __name__ == '__main__':
    read_LF_file("ChapelCross", "Opt5")