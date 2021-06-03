"""Initialize Flask app."""
import os

import eventlet
from flask import Flask
from flask_assets import Environment

import package as root
import package.flaskapp.auth.user as user
import package.flaskapp.config as flask_cf
import package.flaskapp.dash_simtool.db as simtool_db
from .auth.login_manager import init_manager
import package.data.process as data_process
from .extensions import login_manager, dbs, socketio, jsglue
import package.flaskapp.dash_simtool._config as cf

eventlet.monkey_patch()


def _configure_app(config):
    # create and configure the app
    app = Flask(__name__,
                template_folder='templates',
                instance_relative_config=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = flask_cf.Config.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    if config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_object(config)

    secret_key = app.config.get("SECRET_KEY")
    print(f"The configured secret key is {secret_key}.")

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


def _register_extensions(app):
    dbs.init_app(app)
    init_manager(app, login_manager)
    socketio.init_app(app, cors_allowed_origins='*')
    jsglue.init_app(app)


def __load_auth_views(app):
    # # load authorisation views
    # from .auth import routes as auth_routes
    # app.register_blueprint(auth_routes.auth_bp)
    from .auth import routes as auth_routes
    app.register_blueprint(auth_routes.auth_bp)

    login_manager.login_view = 'auth.login'


def __load_dash_views(app):
    # load dash views
    from .dash_simtool import routes as dash_route
    app.register_blueprint(dash_route.simtool_bp)


def __load_dash_requests(app):
    # load dash requests
    from .dash_simtool import requests as dash_requests
    app.register_blueprint(dash_requests.simtool_bp)

def _load_blueprints(app):
    # load auth views
    __load_auth_views(app)

    # load dash simulation view
    __load_dash_views(app)

    # load dash simulation requests
    __load_dash_requests(app)


def _load_performance_requests(app):
    # load dash requests
    from .performance import requests as performance_requests
    app = performance_requests(app)
    return app



def _configure_database(app):
    @app.before_first_request
    def initialize_database():
        dbs.session.remove()
        dbs.create_all()

        simtool_db.replace_simstatus(dbs, cf.start_sim_step)
        simtool_db.replace_room_simstatus_all(dbs, cf.start_sim_step)

        user.clear(dbs)
        user.register_admin(dbs)
        user.register_required_users(dbs)

        # data_process.migrate_csvs("package/data/simtool/breakerstates/Opt5")
        # data_process.migrate_csvs("package/data/simtool/networkviews/Opt5")
        # data_process.migrate_csvs("package/data/simtool/restorationsteps/Opt5/chapelcross")

    @app.teardown_request
    def shutdown_session(exception=None):
        dbs.session.remove()


def __load_dash_sim_tool(app):
    from .dash_simtool.app.home import init_dashboard as init_home
    app = init_home(app)
    from .dash_simtool.app.SLDs import init_dashboard as init_slds
    app = init_slds(app)
    from .dash_simtool.app.scripts import init_dashboard as init_scripts
    app = init_scripts(app)
    from .dash_simtool.app.about import init_dashboard as init_about
    app = init_about(app)
    from .dash_simtool.app.graph import init_dashboard as init_graph
    app = init_graph(app)
    return app


def _load_dash_apps(app):
    # load dash simulation tool
    app = __load_dash_sim_tool(app)
    return app


def _compile_assets(_assets):
    # compile static assets - CSS
    from .assets import compile_static_assets
    compile_static_assets(_assets)  # Execute logic


def create_app(config=None):
    """Wrapper function - creates Flask application with embedded Dash app

    :param config:
    :return:
    """

    # configure root app
    app = _configure_app(config)

    # initialise assets
    app, _assets = _init_assets(app)

    # initialise user database
    _register_extensions(app)

    # manage application level data
    with app.app_context():
        # load core views
        # from . import routes

        _load_blueprints(app)

        app = _load_performance_requests(app)

        _configure_database(app)

        app = _load_dash_apps(app)

        _compile_assets(_assets)

    return app
