"""Instantiate a Dash app."""
# EXT IMPORTS


if __name__ == "__main__":
    app = init_dashboard()
    app.run_server(debug=True)
