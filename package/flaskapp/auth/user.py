from flask_login import UserMixin
from werkzeug.security import generate_password_hash

from package.flaskapp.extensions import dbs as db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
    entity = db.Column(db.String(10))
    logged_in = db.Column(db.Boolean(), default=False, nullable=False)

    def __repr__(self):
        return str(self.name)

def register_admin(dbs):
    user = User.query.filter_by(
        email='admin@admin').first()  # if this returns a user, then the email already exists in database
    if not user:  # if a user is found, we want to redirect back to signup page so user can try again
        new_user = User(email='admin@admin', name='admin', password=generate_password_hash('admin', method='sha256'),
                        entity='admin')

        # add the new user to the database
        dbs.session.add(new_user)
        dbs.session.commit()

