"""Initialize Flask app."""
from flask import Flask
from flask_assets import Environment
import os


def create_app(test_config=None):
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

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    assets = Environment()  # Create an assets environment
    assets.init_app(app)  # Initialize Flask-Assets

    from . import db
    db.init_app(app)

    with app.app_context():
        # Import parts of our core Flask app
        from . import routes
        from .auth import routes as auth_routes
        from .assets import compile_static_assets

        app.register_blueprint(auth_routes.auth_bp)

        # ---------------------------------------------
        # add project specific routes/dashapps here
        # for example,
        from .subapp import routes as subapp_routes
        app.register_blueprint(subapp_routes.subapp_bp)
        # ---------------------------------------------

        # Compile static assets
        compile_static_assets(assets)  # Execute logic

    return app