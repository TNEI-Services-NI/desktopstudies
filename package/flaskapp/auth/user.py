from sqlalchemy import Column, Integer, String
from package.flaskapp import dbs as db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
    entity = db.Column(db.String(10))
    logged_in = db.Column(db.Boolean(), default=False, nullable=False)

    def __repr__(self):
        return str(self.name)
