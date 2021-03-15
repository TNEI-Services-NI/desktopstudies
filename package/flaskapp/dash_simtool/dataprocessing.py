import pandas as pd
import numpy as np
import base64
import io
from datetime import datetime, timedelta

from flask import session

from baseliningtool.models.main import baseline_calculation
from baseliningtool.data import load_bank_holidays


def _create_dataframe(decoded):
    """Create Pandas DataFrame from local CSV."""

    mydateparser = lambda x: datetime.strptime(x, "%d/%m/%Y %H:%M")

    df = pd.read_csv(io.StringIO(decoded.decode('utf-8')))

    for datetime_column in list(filter(lambda col: 'date' in col or 'time' in col, df.columns)):
        df[datetime_column] = df[datetime_column].apply(mydateparser)

    return df


def getDF(contents, filename):
    content_type, content_string = contents.split(',')

    decoded = base64.b64decode(content_string)
    try:
        if 'csv' in filename:
            # Assume that the user uploaded a CSV file
            df = _create_dataframe(decoded)
        elif 'xls' in filename:
            # Assume that the user uploaded an excel file
            df = pd.read_excel(io.BytesIO(decoded))
    except Exception as e:
        print(e)

    return df


def calc_success(dfs_datetimes, dfs_contents, d_cap, country='england-and-wales'):

    bank_holidays = load_bank_holidays(country)

    if d_cap is None:
        d_cap = dfs_contents[0]['power'].max() * 0.1

    z = np.array([])
    z_ser = pd.DataFrame({'date': [], 'energy_delivered': [], 'success': []})

    for idr, row in dfs_datetimes[0].iloc[0:, :].iterrows():

        df_datesbefore = dfs_datetimes[0].copy()
        df_datesbefore['date'] = df_datesbefore['from_time'].dt.date

        list_datesbefore = df_datesbefore.loc[(df_datesbefore['date']
                                               < row['from_time'].date()),
                                              'from_time'].unique().tolist()

        energy_delivered, success, df_profile = baseline_calculation(session.get('method', None), dfs_contents[0], d_cap,
                                                                     row['from_time'],
                                                                     row['to_time'],
                                                                     bank_holidays=bank_holidays,
                                                                     previous_dsr_days=list_datesbefore,
                                                                     )
        z_ser = z_ser.append({'date': row['from_time'].date(),
                              'from_datetime': row['from_time'],
                              'to_datetime': row['to_time'],
                              'energy_delivered': energy_delivered,
                              'success': 1 if success else 2}, ignore_index=True)

    d1 = dfs_contents[0].index[0].date()
    d2 = dfs_contents[0].index[-1].date()
    delta = d2 - d1

    df_z = pd.DataFrame({'date': [d1 + timedelta(i) for i in range(delta.days + 1)]})
    df_z['success'] = 0
    df_z['energy_delivered'] = 0

    df_z = df_z.merge(z_ser, how='left', on='date', suffixes=['', '_calc']).fillna(-1)

    df_z.loc[:, 'success'] = df_z.loc[:, ['success', 'success_calc']].max(axis=1)

    z = np.array(df_z['success'])

    return d1, d2, z, df_z


def format_dfs(list_of_contents, list_of_datetimes, list_of_names):
    power = [
        getDF(c, n) for c, n in
        zip(list_of_contents, list_of_names)]

    datetimes = [
        getDF(c, n) for c, n in
        zip(list_of_datetimes, list_of_names)]

    for iddf, df in enumerate(power):
        df = df.sort_values(by='local_time')
        df = df.set_index('local_time')

        if 'kW' in df.columns:
            df.loc[:, 'power'] = df.loc[:, 'kW']
        elif 'MW' in df.columns:
            df.loc[:, 'power'] = df.loc[:, 'MW']*1000
        else:
            print("ERROR: input data not in required format")
            raise Exception

        df = df[['power']].copy()

        power[iddf] = df

    return power, datetimes