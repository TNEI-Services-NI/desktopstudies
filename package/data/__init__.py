# -*- coding: utf-8 -*-
import os
import pandas as pd

dir_data = os.path.dirname(__file__)

dir_simtool_data = '\\'.join([dir_data, 'simtool'])

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
