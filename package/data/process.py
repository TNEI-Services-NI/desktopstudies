import os
import package.data as data
import sqlite3
import package as root
import pandas as pd


def process_LF_data(network="chapelcross", voltage="33kv", option="Opt5"):
    # net_opt_dir = '\\'.join([data.dir_restoration_steps, option, network+voltage])
    net_opt_dir = '\\'.join([data.dir_restoration_steps, option, network])

    if not os.path.exists(net_opt_dir):
        os.makedirs(net_opt_dir)

    dict_data = data.read_LF_file(network, voltage, option)
    for component in dict_data:
        for parameter in dict_data[component]:
            dir_data = '\\'.join([net_opt_dir, '{}_{}.csv'.format(component, parameter)])
            df_data = dict_data[component][parameter]['data'].fillna(-9999)
            df_data.to_csv(dir_data, index=False)
    combine_LF_data()


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
    csvs = list(filter(lambda x: '.csv' in x, os.listdir(net_opt_dir)))
    list_data = [pd.read_csv('/'.join([net_opt_dir, csv])).set_index('Name').filter(like='Step').assign(component=csv.split('.csv')[0]) for csv in csvs]
    data_concat = pd.concat(list_data)
    data_concat.to_csv('/'.join([net_opt_dir, 'alldata.csv']))


if __name__ == '__main__':
    # process_LF_data()
    # migrate_csvs("package/data/simtool/breakerstates/Opt5")
    # migrate_csvs("package/data/simtool/networkviews/Opt5")
    # migrate_csvs("package/data/simtool/restorationsteps/Opt5/chapelcross")
    # get_tables()
    pass
