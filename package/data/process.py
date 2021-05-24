import os
import package.data as data
import sqlite3
import package as root
import pandas as pd


def process_LF_data(network="chapelcross", voltage="33kv", option="Opt5", rev=8):
    # net_opt_dir = '\\'.join([data.dir_restoration_steps, option, network+voltage])
    net_opt_dir = '\\'.join([data.dir_restoration_steps, option, network])

    if not os.path.exists(net_opt_dir):
        os.makedirs(net_opt_dir)

    dict_data = data.read_LF_file(network, voltage, option, rev)
    for component in dict_data:
        for parameter in dict_data[component]:
            dir_data = '\\'.join([net_opt_dir, '{}_{}.csv'.format(component, parameter)])
            df_data = dict_data[component][parameter]['data'].fillna(-9999)
            df_data.to_csv(dir_data, index=False)
    combine_LF_data()


def process_breakers_data(network="chapelcross", voltage="33kv", option="Opt5", rev=14):
    net_breaker_dir = '\\'.join([data.dir_breaker_states, option])

    filename = 'AllBreakers_R{}.xlsx'.format(rev)

    df_data = pd.read_excel('/'.join([net_breaker_dir, filename]),
                            sheet_name='allbreakers')

    from_col = df_data.columns[(df_data=='breaker').any()]
    from_row = df_data.index[(df_data=='breaker').any(axis=1)]

    from_col = from_col[0] if len(from_col) == 1 else None
    from_row = from_row[0] if len(from_row) == 1 else None

    from_col = df_data.columns.tolist().index(from_col)
    from_row = df_data.index.tolist().index(from_row)

    df_data.columns = df_data.iloc[from_row, :]

    df_data = df_data.iloc[from_row+1:, from_col:]

    df_data = df_data.loc[~df_data.loc[:, 'breaker'].isna(), :]

    df_data = df_data.drop_duplicates()

    repeated_breakers = df_data['breaker'].value_counts()[df_data['breaker'].value_counts() > 1].index.tolist()

    repeated_breakers_data = df_data.loc[df_data['breaker'].isin(repeated_breakers)].sort_values(by='breaker')

    if len(repeated_breakers) > 0:
        print("WARNING: Breaker state mismatch for [{}]".format(repeated_breakers))

    df_data.to_csv('\\'.join([data.dir_breaker_states, option, 'allbreakers.csv']), index=False)



def migrate_csvs(folder_path):
    full_folder_path = '/'.join([root.BASE_DIR, folder_path])
    folder_contents = os.listdir(full_folder_path)
    csvs = list(filter(lambda x: '.csv' in x, folder_contents))
    for csv_file in csvs:
        csv_path = '/'.join([folder_path, csv_file])
        csv_to_sqlite(csv_path)


def csv_to_sqlite(csv_path):
    db_dir = os.path.join(root.BASE_DIR, 'instance', 'db.sqlite')
    con = sqlite3.connect(db_dir) # change to 'sqlite:///your_filename.db'
    df_data = pd.read_csv('/'.join([root.BASE_DIR, csv_path]))
    table_name = csv_path.split("/")[-1].split(".")[0]
    df_data.to_sql(table_name, con, if_exists='replace')
    con.commit()
    con.close()


def get_tables():
    db_dir = os.path.join(root.BASE_DIR, 'instance', 'db.sqlite')
    con = sqlite3.connect(db_dir) # change to 'sqlite:///your_filename.db'
    cur = con.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
    response = cur.fetchall()
    print(response)
    con.close()


def combine_LF_data(network="chapelcross", voltage="33kv", option="Opt5"):
    # net_opt_dir = '\\'.join([data.dir_restoration_steps, option, network+voltage])
    net_opt_dir = '\\'.join([data.dir_restoration_steps, option, network])
    csvs = list(filter(lambda x: ('.csv' in x)&('alldata' not in x), os.listdir(net_opt_dir)))
    list_data = [pd.read_csv('/'.join([net_opt_dir, csv])).set_index('Name').filter(like='Step').assign(component=csv.split('.csv')[0]) for csv in csvs]
    data_concat = pd.concat(list_data)
    data_concat.to_csv('/'.join([net_opt_dir, 'alldata.csv']))


if __name__ == '__main__':
    process_LF_data(rev=16)
    process_breakers_data(rev=3)
    # migrate_csvs("package/data/simtool/breakerstates/Opt5")
    # migrate_csvs("package/data/simtool/networkviews/Opt5")
    # migrate_csvs("package/data/simtool/restorationsteps/Opt5/chapelcross")
    # get_tables()
    pass
