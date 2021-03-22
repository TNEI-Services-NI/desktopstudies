"""Initialize Flask app."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment
import os
from flask import url_for
from flask_migrate import Migrate

from flask_socketio import SocketIO, send
import eventlet
from flask_jsglue import JSGlue

import package as root
# from package.flaskapp.auth_2.user import User
import package.flaskapp.auth_2.login_manager as login_manager

eventlet.monkey_patch()
socketio = SocketIO()
jsglue = JSGlue()

dbs = SQLAlchemy()
migrate = Migrate()


def _configure_app(test_config):
    # create and configure the app
    app = Flask(__name__,
                template_folder='templates',
                instance_relative_config=True)

    db_dir = os.path.join(root.BASE_DIR, 'instance', 'db.sqlite')
    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config.from_mapping(
        SECRET_KEY='dev',  # used by Flask and extensions to keep data safe.
        # It’s set to 'dev' to provide a convenient value during development,
        # but it should be overridden with a random value when deploying
        DATABASE=db_dir,
        # DATABASE=os.path.join(app.instance_path, 'flaskapp.sqlite'),
    )

    app.config['SECRET_KEY'] = 'dev'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_dir
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    return app


def _init_assets(app):
    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    _assets = Environment()  # Create an assets environment
    _assets.init_app(app)  # Initialize Flask-Assets

    return app, _assets


def _load_auth_views(app, _login_manager):
    # # load authorisation views
    # from .auth import routes as auth_routes
    # app.register_blueprint(auth_routes.auth_bp)
    from .auth_2 import routes as auth_routes_new
    app.register_blueprint(auth_routes_new.auth_bp) #, url_prefix='/auth_2')

    _login_manager.login_view = 'auth_2.login'

    return app, _login_manager


def _load_raw_sim_tool(app):
    # load simulation tool views
    from .simulatortool import routes as simtool_routes
    app.register_blueprint(simtool_routes.desksim_bp)
    return app


def _load_dash_sim_tool(app):
    from .dash_simtool import init_dashboard
    app = init_dashboard(app)
    return app


def _compile_assets(_assets):
    # compile static assets - CSS
    from .assets import compile_static_assets
    compile_static_assets(_assets)  # Execute logic
    return _assets


def create_app(test_config=None):

    # configure root app
    app = _configure_app(test_config)

    # initialise assets
    app, _assets = _init_assets(app)

    # # initialise user database
    # from . import db
    # db.init_app(app)

    dbs.init_app(app)
    migrate.init_app(app, dbs)

    app, _login_manager = login_manager.init_manager(app)

    # Configure  socketio
    socketio.init_app(app, cors_allowed_origins='*')

    # Configure JSGlue : For using url_for in javascript
    jsglue.init_app(app)

    # manage application level data
    with app.app_context():
        # load core views
        from . import routes

        # load raw simulation tool
        app = _load_dash_sim_tool(app)

        # load auth views
        app, _login_manager = _load_auth_views(app, _login_manager)

        # # load raw simulation tool
        # app = _load_raw_sim_tool(app)


        # Create database
        dbs.create_all()

        # compile assets
        _assets = _compile_assets(_assets)

    return app
