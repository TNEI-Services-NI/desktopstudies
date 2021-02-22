import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from werkzeug.security import generate_password_hash

from package.flaskapp.db import get_db
from package.flaskapp.auth.methods import check_cred

auth_bp = Blueprint('auth', __name__, url_prefix='/auth', template_folder='templates', static_folder='static')


@auth_bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        db, user, username, password, error = check_cred(request, 'register')

        if error is None:
            db.execute(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                (username, generate_password_hash(password))
            )
            db.commit()
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('register.html')


@auth_bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        db, user, username, password, error = check_cred(request, 'login')

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            session['username'] = user['username']
            return redirect(url_for('subapp.subapp'))

        flash(error)

    return redirect(url_for('home'))


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('home'))

        return view(**kwargs)

    return wrapped_view


@auth_bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()


@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
