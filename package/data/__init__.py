# -*- coding: utf-8 -*-
import os
import pandas as pd

dir_data = os.path.dirname(__file__)

dir_simtool_data = '\\'.join([dir_data, 'simtool'])
dir_breaker_states = '\\'.join([dir_simtool_data, 'breakerstates'])

dir_restoration_steps = '\\'.join([dir_simtool_data, 'restorationsteps'])

dir_auth_data = '\\'.join([dir_data, 'auth'])

def _fetch_breaker_state_files():
    breaker_state_files = os.listdir(dir_breaker_states)
    breaker_states = {k.split('.csv')[0]: k for k in breaker_state_files}
    return breaker_states


def read_breaker_states(network, voltage):
    breaker_states = _fetch_breaker_state_files()
    filename = breaker_states[network + voltage]
    df_breakerstates = pd.read_csv('/'.join([dir_breaker_states, filename]))
    df_breakerstates = df_breakerstates.convert_dtypes(convert_string=True)
    df_breakerstates = df_breakerstates.set_index('breaker')
    return df_breakerstates

def _fetch_restoration_steps_files():
    restoration_step_files = os.listdir(dir_restoration_steps)
    restoration_steps = {k.split('.csv')[0]: k for k in restoration_step_files}
    return restoration_steps

def read_restoration_step(network, voltage, stage):
    restoration_steps = _fetch_restoration_steps_files()
    filename = restoration_steps[network + voltage+"scenario1"]
    df_restoration = pd.read_csv('/'.join([dir_restoration_steps, filename]))
    df_restoration = df_restoration.convert_dtypes(convert_string=True)
    df_restoration = df_restoration.set_index("step")
    df_restoration.head()
    df_restoration = df_restoration.loc[int(stage)]
    return df_restoration


