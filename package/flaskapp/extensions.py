from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_socketio import SocketIO
from flask_migrate import Migrate
from flask_jsglue import JSGlue

dbs = SQLAlchemy()
login_manager = LoginManager()
socketio = SocketIO(
    logger=True, engineio_logger=False
)
jsglue = JSGlue()
migrate = Migrate()

