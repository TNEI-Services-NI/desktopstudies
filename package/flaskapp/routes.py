"""Routes for parent Flask app."""
from flask import current_app as app
from flask import (
    flash, redirect, render_template, request, session, url_for
)
from package.flaskapp.auth.methods import check_cred


# a simple page that says hello
@app.route('/', methods=('GET', 'POST'))
def home():
    """Landing page."""
    if request.method == 'POST':
        db, user, username, password, error = check_cred(request, 'login')

        if username == 'admin' and password == 'admin':
            return redirect(url_for('auth.register'))
        else:
            if error is None:
                session.clear()
                session['user_id'] = user['id']
                session['username'] = user['username']
                return redirect(url_for('desksim.restoration'))

        flash(error)

    return render_template(
        'landing.html'
    )
