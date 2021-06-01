"""Application entry point."""
import os

from package.flaskapp import create_app, socketio, dbs
from package.flaskapp.extensions import migrate

DEBUG = False

env_config = os.getenv("APP_SETTINGS", "package.flaskapp.config.ProductionConfig")

app = create_app(env_config)
migrate.init_app(app, dbs)

if __name__ == '__main__':
    if DEBUG:
        app.run()
    else:
        print("Running on http://127.0.0.1:5000/")
        socketio.run(app)


