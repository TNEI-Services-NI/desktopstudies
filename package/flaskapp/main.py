"""Initialize Flask app."""
from flask import Flask

# from app.flaskapp import routes
from baseliningtool.flaskapp.dashapp import dashboard


def init_app():
    """Construct core Flask application with embedded Dash app."""
    server = Flask(__name__, instance_relative_config=False)
    # server.config.from_object('app.flaskapp.config.Config')
    # assets_object = Environment()
    # assets_object.init_app(server)

    # todo(MM) - add when we need images/customised graphics
    # No need to do this right now, we're not loading
    # any javascript or css
    # with app.app_context():
    #
    #     app = dashboard.init_dashboard()
    #
    #     # Compile static assets
    #     assets.compile_static_assets(assets_object)

    return server

if __name__ == '__main__':
    server = init_app()
    app = dashboard.init_dashboard()
