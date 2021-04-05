"""Application entry point."""
from package.flaskapp import create_app, socketio, dbs
from package.flaskapp.extensions import migrate

DEBUG = True

if __name__ == "__main__":
    app = create_app()
    migrate.init_app(app, dbs)
    if DEBUG:
        app.run()
    else:
        print("Running on http://127.0.0.1:5000/")
        socketio.run(app)


