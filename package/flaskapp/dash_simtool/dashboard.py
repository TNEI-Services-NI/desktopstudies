"""Instantiate a Dash app."""
# EXT IMPORTS
from package.flaskapp.dash_simtool import init_dashboard

if __name__ == "__main__":
    app = init_dashboard()
    app.run_server(debug=True)
