"""Initialize Flask app."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment
import os
from flask_login import LoginManager

db = SQLAlchemy()


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

    # from . import db
    # db.init_app(app)

    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SECRET_KEY'] = 'dev'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')  # 'sqlite:///db.sqlite'
    app.config['SQLALCHEMY_TRACK_MODIFIICATIONS'] = False

    db.init_app(app)


    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))



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

        from .auth_2 import auth
        app.register_blueprint(auth.auth_2)

        from .auth_2 import main
        app.register_blueprint(main.main)

        db.create_all()





        # Compile static assets
        compile_static_assets(assets)  # Execute logic

    return app