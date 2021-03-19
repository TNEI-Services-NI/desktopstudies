"""Application entry point."""
from package.flaskapp import create_app, socketio

if __name__ == "__main__":
    app = create_app()
    print("Running on http://127.0.0.1:5000/")
    socketio.run(app)
    # app.run(debug=True)


