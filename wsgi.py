"""Application entry point."""
from package.flaskapp import create_app, socketio, dbs
from package.flaskapp.extensions import migrate

if __name__ == "__main__":
    app = create_app()
    migrate.init_app(app, dbs)
    print("Running on http://127.0.0.1:5000/")
    # socketio.run(app)
    app.run()

