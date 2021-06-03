from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

import package as root
from package.flaskapp.extensions import dbs


class Simstatus(dbs.Model):
    id = dbs.Column(dbs.Integer, primary_key=True)
    status = dbs.Column(dbs.Integer)
    entity = dbs.Column(dbs.String)

    def __repr__(self):
        return str(self.name)


# class Simdata(dbs.Model):
#     def __init__(self):
#         self.Base = automap_base()
#
#         # engine, suppose it has two tables 'user' and 'address' set up
#         self.engine = create_engine('sqlite:///' + root.DB_DIR)
#
#         self.allbreakers = None
#         self.views = None
#         self.busbars_voltage = None
#         self.generators_active_power = None
#         self.generators_rating = None
#         self.generators_reactive_power = None
#         self.lines_active_power = None
#         self.lines_current = None
#         self.lines_loading = None
#         self.lines_reactive_power = None
#         self.transformers_loading = None
#         self.transformers_taps = None
#
#         self.update_tables()
#
#
#     def update_tables(self):
#         # reflect the tables
#         self.Base.prepare(self.engine, reflect=True)
#
#         # mapped classes are now created with names by default
#         # matching that of the table name.
#         self.allbreakers = self.Base.classes.allbreakers
#         self.views = self.Base.classes.views
#         self.busbars_voltage = self.Base.classes.busbars_voltage
#         self.generators_active_power = self.Base.classes.generators_active_power
#         self.generators_rating = self.Base.classes.generators_rating
#         self.generators_reactive_power = self.Base.classes.generators_reactive_power
#         self.lines_active_power = self.Base.classes.lines_active_power
#         self.lines_current = self.Base.classes.lines_current
#         self.lines_loading = self.Base.classes.lines_loading
#         self.lines_reactive_power = self.Base.classes.lines_reactive_power
#         self.transformers_loading = self.Base.classes.transformers_loading
#         self.transformers_taps = self.Base.classes.transformers_taps


def delete_simstatus(dbs):
    simstatus = Simstatus.query.filter(Simstatus.entity == 'all').all()

    if simstatus:  # if a user is found, we want to redirect back to signup page so user can try again
        for simstatus_ in simstatus:
            dbs.session.delete(simstatus_)
            dbs.session.commit()


def delete_room_simstatus(dbs, entity):
    simstatus = Simstatus.query.filter(Simstatus.entity == entity).all()

    if simstatus:  # if a user is found, we want to redirect back to signup page so user can try again
        for simstatus_ in simstatus:
            dbs.session.delete(simstatus_)
            dbs.session.commit()


def add_simstatus(dbs, simstatus_value, entity='all'):
    updated_simstatus = Simstatus(status=simstatus_value, entity=entity)
    # print("updated_simstatus created")

    # add the new user to the database
    dbs.session.add(updated_simstatus)
    dbs.session.commit()
    # print("updated_simstatus committed")


def print_simstatus():
    simstatus = Simstatus.query.filter(Simstatus.entity == 'all').all()
    for simstatus_ in simstatus:
        print(simstatus_.id)
        print(simstatus_.status)
        print(simstatus_.entity)


def print_room_simstatus(entity):
    simstatus = Simstatus.query.filter(Simstatus.entity == entity).all()
    for simstatus_ in simstatus:
        print(simstatus_.id)
        print(simstatus_.status)
        print(simstatus_.entity)


def print_last_simstatus():
    simstatus = Simstatus.query.filter(Simstatus.entity == 'all').order_by(Simstatus.id.desc()).first()
    print(simstatus.id)
    print(simstatus.status)
    print(simstatus.entity)


def get_simstatus():
    simstatus = Simstatus.query.filter(Simstatus.entity == 'all').order_by(Simstatus.id.desc()).first()
    return simstatus.status


def get_room_simstatus(entity):
    simstatus = Simstatus.query.filter(Simstatus.entity == entity).order_by(Simstatus.id.desc()).first()
    if simstatus is None:
        return get_simstatus()
    return simstatus.status


def get_breaker_states(network, option):
    simstatus = Simstatus.query.filter(Simstatus.entity == entity).order_by(Simstatus.id.desc()).first()
    if simstatus is None:
        return get_simstatus()
    return simstatus.status


def replace_simstatus(dbs, simstatus_value):
    delete_simstatus(dbs)
    add_simstatus(dbs, simstatus_value)


def replace_room_simstatus(dbs, simstatus_value, entity):
    delete_room_simstatus(dbs, entity)
    add_simstatus(dbs, simstatus_value, entity)


def replace_room_simstatus_all(dbs, simstatus_value):
    replace_room_simstatus(dbs, simstatus_value, "ESO")
    replace_room_simstatus(dbs, simstatus_value, "DNO")
    replace_room_simstatus(dbs, simstatus_value, "DER")
    replace_room_simstatus(dbs, simstatus_value, "TO")
    replace_room_simstatus(dbs, simstatus_value, "admin")
    replace_room_simstatus(dbs, simstatus_value, "Observer")


if __name__ == '__main__':
    oSimData = Simdata()
