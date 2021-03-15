"""Initialize Flask app."""
from flask import Flask
from flask_assets import Environment
import os


def _configure_app(test_config):
    # create and configure the app
    app = Flask(__name__,
                template_folder='templates',
                static_folder='static',
                instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',   # used by Flask and extensions to keep data safe.
                            # It’s set to 'dev' to provide a convenient value during development,
                            # but it should be overridden with a random value when deploying
        DATABASE=os.path.join(app.instance_path, 'flaskapp.sqlite'),
    )

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

    assets = Environment()  # Create an assets environment
    assets.init_app(app)  # Initialize Flask-Assets

    return app, assets


def _load_auth_views(app):
    # load authorisation views
    from .auth import routes as auth_routes
    app.register_blueprint(auth_routes.auth_bp)
    return app


def _load_raw_sim_tool(app):
    # load simulation tool views
    from .simulatortool import routes as simtool_routes
    app.register_blueprint(simtool_routes.desksim_bp)
    return app


def _load_dash_sim_tool(app):
    from .dashapp.dashboard import init_dashboard
    app = init_dashboard(app)
    return app


def _compile_assets(app):
    # compile static assets - CSS
    from .assets import compile_static_assets
    compile_static_assets(assets)  # Execute logic
    return app


def create_app(test_config=None):

    # configure root app
    app = _configure_app(test_config)

    # initialise assets
    app, assets = _init_assets(app)

    # initialise user database
    from . import db
    db.init_app(app)

    # manage application level data
    with app.app_context():
        # load core views
        from . import routes

        # load auth views
        app = _load_auth_views(app)

        # load raw simulation tool
        app = _load_raw_sim_tool(app)



        # compile assets
        app = _compile_assets(app)

    return app
