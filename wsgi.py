"""Application entry point."""
import os
import requests

from package.flaskapp import create_app, socketio, dbs
from package.flaskapp.extensions import migrate


env_config = os.getenv("APP_SETTINGS", "package.flaskapp.config.ProductionConfig")
# env_config = os.getenv("APP_SETTINGS", "package.flaskapp.config.PostgresProductionConfig")
# env_config = os.getenv("APP_SETTINGS", "package.flaskapp.config.PostgresDevelopmentConfig")

app = create_app(env_config)
migrate.init_app(app, dbs)

if __name__ == '__main__':
    if not app.config['DEBUG']:
        print("Running on http://127.0.0.1:5000/")
    socketio.run(app)


