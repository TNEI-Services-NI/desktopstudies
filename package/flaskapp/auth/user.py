from flask_login import UserMixin
from werkzeug.security import generate_password_hash

from package.flaskapp.extensions import dbs
import package.data as data
import pandas as pd


class User(dbs.Model, UserMixin):
    id = dbs.Column(dbs.Integer, primary_key=True)
    email = dbs.Column(dbs.String(100), unique=True)
    password = dbs.Column(dbs.String(100))
    name = dbs.Column(dbs.String(1000))
    entity = dbs.Column(dbs.String(20))
    logged_in = dbs.Column(dbs.Boolean(), default=False, nullable=False)

    def __repr__(self):
        return str(self.name)


def clear(dbs):
    User.query.delete()
    dbs.session.commit()

def register_admin(dbs):
    user = User.query.filter_by(
        email='admin@admin').first()  # if this returns a user, then the email already exists in database
    if not user:  # if a user is found, we want to redirect back to signup page so user can try again
        new_user = User(email='admin@admin', name='admin', password=generate_password_hash('admin', method='sha256'),
                        entity='admin')

        # add the new user to the database
        dbs.session.add(new_user)
        dbs.session.commit()

    user = User.query.filter_by(
        email='admin.local@admin.local').first()  # if this returns a user, then the email already exists in database
    if not user:  # if a user is found, we want to redirect back to signup page so user can try again
        new_user = User(email='admin.local@admin.local', name='admin.local', password=generate_password_hash('admin.local', method='sha256'),
                        entity='admin_local')

        # add the new user to the database
        dbs.session.add(new_user)
        dbs.session.commit()


def _register_user(email, name, entity, dbs):
    user = User.query.filter_by(
        email=email).first()  # if this returns a user, then the email already exists in database
    if not user:  # if a user is found, we want to redirect back to signup page so user can try again
        new_user = User(email=email, name=name, password=generate_password_hash("Desktop3", method='sha256'),
                        entity=entity)

        # add the new user to the database
        dbs.session.add(new_user)
        dbs.session.commit()


def register_required_users(dbs):
    required = pd.read_csv(data.dir_auth_data + '/req_users.csv')
    for req_user in required.iterrows():
        email = req_user[1]['email']
        email = email.lower()
        name = req_user[1]['name']
        entity = req_user[1]['entity']
        _register_user(email, name, entity, dbs)

