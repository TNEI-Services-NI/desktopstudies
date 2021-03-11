"""Application entry point."""
from package.flaskapp import create_app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)


