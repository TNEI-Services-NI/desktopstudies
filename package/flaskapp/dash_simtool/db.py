from package.flaskapp.extensions import dbs as db


class Simstatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Integer)
    entity = db.Column(db.String)

    def __repr__(self):
        return str(self.name)


def delete_simstatus(dbs):
    simstatus = Simstatus.query.filter(Simstatus.entity == 'all').all()

    if simstatus:  # if a user is found, we want to redirect back to signup page so user can try again
        for simstatus_ in simstatus:
            dbs.session.delete(simstatus_)
            dbs.session.commit()
        print("all records deleted")


def delete_room_simstatus(dbs, entity):
    simstatus = Simstatus.query.filter(Simstatus.entity == entity).all()

    if simstatus:  # if a user is found, we want to redirect back to signup page so user can try again
        for simstatus_ in simstatus:
            dbs.session.delete(simstatus_)
            dbs.session.commit()
        print("all room records deleted")


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
