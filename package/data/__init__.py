# -*- coding: utf-8 -*-
import os
import pandas as pd

dir_data = os.path.dirname(__file__)
dir_simtool_data = '/'.join([dir_data, 'simtool'])
dir_breaker_states = '/'.join([dir_simtool_data, 'breakerstates'])


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
