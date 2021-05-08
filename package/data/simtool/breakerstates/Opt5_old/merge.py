import os
import pandas as pd
import numpy as np

if __name__ == '__main__':
    files = os.listdir(os.getcwd())
    csvs = list(filter(lambda x: ('.csv' in x)&('chapelcross33kv'!=x)&('allbreakers.csv'!=x), files))
    list_dfs = [pd.read_csv(os.getcwd() + "/chapelcross33kv.csv").assign(network="chapelcross33kv.csv")]
    [list_dfs.append(pd.read_csv(os.getcwd() + "/" + x).iloc[:, :17].assign(network=x)) for x in csvs]
    df_concat = pd.concat(list_dfs)
    bool_df = df_concat.replace('open', False).replace('closed', True)
    vals = np.array([bool_df.loc[bool_df['breaker'] == x, [str(y) for y in range(-1, 15)]].sum() > 0 for x in
              bool_df['breaker'].unique()])
    vals_ = np.concatenate((np.array([[x for x in bool_df['breaker'].unique()]]).T, vals), axis=1)

    df_vals = pd.DataFrame(vals_)
    df_vals.columns = bool_df.iloc[:, :17].columns
    df_vals = df_vals.replace('True', 'closed').replace('False', 'open')

    df_concat.drop_duplicates(subset='breaker', keep='first').to_csv(os.getcwd() + '/allbreakers.csv', index=False)
    df_vals.to_csv(os.getcwd() + '/allbreakers.csv', index=False)

