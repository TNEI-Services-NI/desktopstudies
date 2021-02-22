"""Routes for parent Flask app."""
import functools
from flask import (
    Blueprint, flash, render_template, request, session, url_for, g, redirect
)

from .

from package.flaskapp.db import get_db
from package.flaskapp.auth.methods import check_cred

desksim_bp = Blueprint('desksim', __name__, url_prefix='/desksim', template_folder='templates', static_folder='static')


# a simple page that says hello
@desksim_bp.route('/restoration', methods=('GET', 'POST'))
def restoration():
    """desksim_bp restoration page."""
    return render_template('subapplanding.html')


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('home'))

        return view(**kwargs)

    return wrapped_view
