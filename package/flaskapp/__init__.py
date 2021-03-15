"""Initialize Flask app."""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment

from flask_migrate import Migrate

import package as root
from package.flaskapp.auth_2.user import User
import package.flaskapp.auth_2.login_manager as login_manager

dbs = SQLAlchemy()
migrate = Migrate()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__,
                template_folder='templates',
                static_folder='static',
                instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI='sqlite:///' + '{}/instance/db.sqlite'.format(root.BASE_DIR),
        SQLALCHEMY_TRACK_MODIFIICATIONS=False
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    _assets = Environment()  # Create an assets environment
    _assets.init_app(app)  # Initialize Flask-Assets

    dbs.init_app(app)
    migrate.init_app(app, dbs)

    app, _login_manager = login_manager.init_manager(app)

    with app.app_context():
        # Import parts of our core Flask app
        from . import routes
        from .auth import routes as auth_routes
        from .assets import compile_static_assets

        app.register_blueprint(auth_routes.auth_bp)

        # ---------------------------------------------
        # add project specific routes/dashapps here
        # for example,
        from .simulatortool import routes as simtool_routes
        app.register_blueprint(simtool_routes.desksim_bp)
        # ---------------------------------------------

        from .auth_2 import routes as auth_routes_new
        app.register_blueprint(auth_routes_new.auth_bp, url_prefix='/auth_2')

        login_manager.login_view = 'auth_2.login'


        # Compile static assets
        compile_static_assets(_assets)  # Execute logic

        dbs.create_all()

    return app
