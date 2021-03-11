from flask import Blueprint, render_template
from flask_login import login_required, current_user
from package.flaskapp import db

main = Blueprint('main', __name__, static_folder='static', template_folder='templates', url_prefix='/auth_2')


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)
