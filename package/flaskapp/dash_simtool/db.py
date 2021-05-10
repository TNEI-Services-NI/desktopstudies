from package.flaskapp.extensions import dbs as db


class Simstatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Integer)

    def __repr__(self):
        return str(self.name)


def delete_simstatus(dbs):
    simstatus = Simstatus.query.all()

    if simstatus:  # if a user is found, we want to redirect back to signup page so user can try again
        for simstatus_ in simstatus:
            dbs.session.delete(simstatus_)
            dbs.session.commit()
        print("all records deleted")


def add_simstatus(dbs, simstatus_value):
    updated_simstatus = Simstatus(status=simstatus_value)
    print("updated_simstatus created")

    # add the new user to the database
    dbs.session.add(updated_simstatus)
    dbs.session.commit()
    print("updated_simstatus committed")


def print_simstatus():
    simstatus = Simstatus.query.all()
    for simstatus_ in simstatus:
        print(simstatus_.id)
        print(simstatus_.status)


def print_last_simstatus():
    simstatus = Simstatus.query.order_by(Simstatus.id.desc()).first()
    print(simstatus.id)
    print(simstatus.status)


def get_simstatus():
    simstatus = Simstatus.query.order_by(Simstatus.id.desc()).first()
    return simstatus.status


def replace_simstatus(dbs, simstatus_value):
    delete_simstatus(dbs)
    add_simstatus(dbs, simstatus_value)



