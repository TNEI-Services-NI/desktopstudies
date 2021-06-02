import os

import pandas as pd
import psycopg2
import psycopg2.extras
from sqlalchemy import Table, Column, Integer, Unicode, MetaData, create_engine
from sqlalchemy.orm import create_session

import package.data as data
import package.flaskapp.config as cf
import package as root
from sqlalchemy.orm import mapper


class restorationsteps(object):
    def __getitem__(self, item):
        return getattr(self, item)
    def __setitem__(self, item, value):
        return setattr(self, item, value)


class networkviews(object):
    def __getitem__(self, item):
        return getattr(self, item)
    def __setitem__(self, item, value):
        return setattr(self, item, value)


class breakerstates(object):
    def __getitem__(self, item):
        return getattr(self, item)
    def __setitem__(self, item, value):
        return setattr(self, item, value)


class actions(object):
    def __getitem__(self, item):
        return getattr(self, item)
    def __setitem__(self, item, value):
        return setattr(self, item, value)


def add_open_close_session(func):
    def wrapper(*args, **kwargs):
        session = create_session(bind=args[1], autocommit=False, autoflush=True)
        row = func(*args, **kwargs)
        session.add(row)
        session.commit()
        session.close()
    return wrapper


def open_close_session(func):
    def wrapper(*args, **kwargs):
        session = create_session(bind=args[1], autocommit=False, autoflush=True)
        func(*args, **kwargs)
        session.commit()
        session.close()
    return wrapper


def generate_engine(local=True, echo=False):
    if local:
        e = create_engine("sqlite:///"+os.path.join(root.BASE_DIR, 'instance', 'test_db.sqlite'), echo=echo)
    else:
        e = create_engine(os.environ.get('DATABASE_URL', cf.POSTGRES_URI), echo=echo)
    return e


def drop_table(table_name, e):
    try:
        conn = e.pool._creator()
        crsr = conn.cursor()
        crsr.execute("DROP TABLE {}".format(table_name))
        conn.commit()
        conn.close()
    except Exception as e:
        print(e)


def generate_table(table_name, columns, e, local=True):
    metadata = MetaData(bind=e)

    t = Table(table_name, metadata, Column('id', Integer, primary_key=True),
              *(Column(column_name, Unicode(50)) for column_name in columns))
    metadata.create_all()

    exec("mapper({}, t)".format(table_name))


def add_data(table_name, df_data : pd.DataFrame, e):
    conn = e.pool._creator()

    df_columns = list(df_data)
    # create (col1,col2,...)
    columns = ",".join(df_columns)

    # create VALUES('%s', '%s",...) one '%s' per column
    values = "VALUES({})".format(",".join(["%s" for _ in df_columns]))

    #create INSERT INTO table (columns) VALUES('%s',...)
    insert_stmt = """INSERT INTO {} ({}) {}""".format(table_name, columns, values)

    cur = conn.cursor()
    psycopg2.extras.execute_batch(cur, insert_stmt, df_data.values.tolist())
    conn.commit()
    cur.close()
    conn.close()


def read_data(table_name, e):
    conn = e.pool._creator()
    df_data = pd.read_sql("SELECT * from {}".format(table_name), con=e)
    print(df_data)
    conn.commit()
    conn.close()
    return df_data


def delete_data(table_name, e):
    conn = e.pool._creator()
    crsr = conn.cursor()
    crsr.execute("DELETE FROM {} WHERE id >= 0".format(table_name))
    conn.commit()
    conn.close()


def update_data(table_name, df_data, e):
    delete_data(table_name, e)
    add_data(table_name, df_data, e)


def read_columns(table_name, e):
    conn = e.pool._creator()
    df_data = pd.read_sql("""SELECT COLUMNS FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'{}'""".format(table_name), con=e)
    print(df_data)
    conn.close()


def prepare_restoration_data(option, case_network):
    dir_opt_scen = '/'.join([data.dir_restoration_steps, 'Opt' + option, case_network])
    df_data = pd.read_csv('/'.join([dir_opt_scen, 'alldata.csv']))
    df_data = df_data.set_index('Name')
    df_data.columns = list(map(lambda x: "step_"+str(int(x.split('Step ')[1])+2) if 'Step' in x else x, df_data.columns))
    df_data = df_data.reset_index()
    df_data = df_data.rename(columns={'Name': 'name'})
    df_data.loc[:, 'option'] = option
    df_data.loc[:, 'case_network'] = case_network
    return df_data


def prepare_networkviews_data(option, case_network):
    df_data = pd.read_csv('/'.join([data.dir_network_views, "Opt"+option, 'views.csv']))
    df_data = df_data.set_index('entity')
    df_data.columns = list(map(lambda x: "step_"+str(int(x)+2), df_data.columns))
    df_data = df_data.reset_index()
    df_data.loc[:, 'option'] = option
    df_data.loc[:, 'case_network'] = case_network
    return df_data


def prepare_breakerstates_data(option, case_network):
    df_data = pd.read_csv('/'.join([data.dir_breaker_states, "Opt"+option, 'allbreakers.csv']))
    df_data = df_data.set_index('breaker')
    df_data.columns = list(map(lambda x: "step_"+str(int(x)+2), df_data.columns))
    df_data = df_data.reset_index()
    df_data.loc[:, 'option'] = option
    df_data.loc[:, 'case_network'] = case_network
    return df_data


def prepare_actions_data(option, case_network):
    df_data = pd.read_csv('/'.join([data.dir_actions, "Opt"+option, 'actions.csv']))
    df_data = df_data.set_index('entity')
    df_data.columns = list(map(lambda x: "step_"+str(int(x)+2), df_data.columns))
    df_data = df_data.reset_index()
    df_data.loc[:, 'option'] = option
    df_data.loc[:, 'case_network'] = case_network
    return df_data


def migrate_table(df_data, table_name, e):
    drop_table(table_name, e)
    generate_table(table_name, df_data.columns, e)
    update_data(table_name, df_data, e)
    read_data(table_name, e)

def migrate_data():
    e = generate_engine(local=False)

    df_restoration_data = prepare_restoration_data("5", "chapelcross")
    migrate_table(df_restoration_data, "restorationsteps", e)

    df_view_data = prepare_networkviews_data("5", "chapelcross")
    migrate_table(df_view_data, "networkviews", e)

    df_breaker_data = prepare_breakerstates_data("5", "chapelcross")
    migrate_table(df_breaker_data, "breakerstates", e)

    df_actions_data = prepare_actions_data("5", "chapelcross")
    migrate_table(df_actions_data, "actions", e)


if __name__ == '__main__':
    migrate_data()

