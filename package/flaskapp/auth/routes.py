from flask import Blueprint, render_template, redirect, url_for, request, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from package.flaskapp.auth.user import User
from package.flaskapp import dbs as db
from package.flaskapp import socketio
import time
import pandas as pd
import package.data as data
from flask_socketio import rooms

auth_bp = Blueprint('auth', __name__, static_folder='static', template_folder='templates')


@auth_bp.route('/')
def index():
    return render_template('login.html')


@auth_bp.route('/signup')
def signup():
    print("signup")
    return render_template('signup.html')


@auth_bp.route('/login')
def login():
    return render_template('login.html')


@auth_bp.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')
    entity = request.form.get('entity')

    user = User.query.filter_by(
        email=email).first()  # if this returns a user, then the email already exists in database

    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'),
                    entity=entity)

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login'))


@auth_bp.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login'))  # if the user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    session['entity'] = user.entity
    session['username'] = user.name
    session['namespace'] = '/'
    user.logged_in = 1
    db.session.commit()

    return redirect(url_for('auth.wait_room'))


@auth_bp.route('/logout')
@login_required
def logout():
    current_user.logged_in = 0
    db.session.commit()
    session.clear()
    logout_user()
    trigger_checks()
    return redirect(url_for('auth.index'))


@auth_bp.route('/profile')
@login_required
def profile():
    return redirect(request.url)


@auth_bp.route('/wait_room')
@login_required
def wait_room():
    return render_template('wait_room.html', name=current_user.name)


@socketio.on('disconnect')
def new_disconnect():
    pass


@socketio.on('trigger')
def trigger_checks(trig_data=None):

    required = pd.read_csv(data.dir_auth_data+'/req_users.csv')

    active_users = User.query.filter_by(logged_in=1).all()
    logged_in = pd.DataFrame({'user': [user.name for user in active_users],
                              'email': [user.email for user in active_users],
                              'entity': [user.entity for user in active_users],
                              'status': [1 for user in active_users]})

    required.loc[required['email'].isin(logged_in['email']), 'status'] = True

    required_entities = set(required.loc[required['required'], 'entity'].values.tolist())

    entities_active_list = list(logged_in['entity'].values.tolist())
    entities_active = set(entities_active_list)

    print(f'Logged-in users are: {entities_active}')

    users_active = logged_in["user"].values.tolist()
    logged_in_users = list(zip(users_active,entities_active_list))
    socketio.emit('update_logged_users', logged_in_users)
    socketio.emit('update_waiting_on', required.loc[~required['status'], 'name'].values.tolist())

    if len(required_entities-entities_active) == 0:
        socketio.emit('users_complete', logged_in['user'].values.tolist())
        time.sleep(2)
        socketio.emit('redirect', 'simtool_bp.index') # This url is dummy data for now - not used in front end
