"""Routes for parent Flask app."""
import functools
from flask import (
    Blueprint, flash, render_template, request, session, url_for, g, redirect
)

from package.flaskapp.db import get_db
from package.flaskapp.auth.methods import check_cred

subapp_bp = Blueprint('subapp', __name__, url_prefix='/subapp', template_folder='templates', static_folder='static')


# a simple page that says hello
@subapp_bp.route('/subapplanding', methods=('GET', 'POST'))
def subapplanding():
    """Subapp landing page."""
    return render_template('subapplanding.html')


@subapp_bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('home'))

        return view(**kwargs)

    return wrapped_view
