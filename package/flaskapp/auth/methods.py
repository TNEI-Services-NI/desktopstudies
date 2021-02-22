# -*- coding: utf-8 -*-
from package.flaskapp.db import get_db
from werkzeug.security import check_password_hash


def check_cred(request, method):
    username = request.form['username']
    password = request.form['password']
    if method == 'register':
        password_check = request.form['passwordcheck']
    else:
        password_check = password

    error = None
    db = get_db()
    user = db.execute(
        'SELECT * FROM user WHERE username = ?', (username,)
    ).fetchone()

    if password != password_check:
        error = "Passwords don't match."
    else:
        if method == 'register':
            if user is not None:
                error = 'User {} is already registered.'.format(username)
        elif method == 'login':
            if user is None:
                error = 'Incorrect username.'
            elif not check_password_hash(user['password'], password):
                error = 'Incorrect password.'

    return db, user, username, password, error


if __name__ == "__main__":
    pass
