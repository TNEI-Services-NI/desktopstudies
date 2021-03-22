"""Compile static assets."""
from flask import current_app as app
from flask_assets import Bundle


def compile_static_assets(assets):
    """Create stylesheet bundles."""
    # assets.auto_build = True
    # assets.debug = False
    bundles = {

        'dash_js' : Bundle(
            # 'dash_simtool_app/js/test.js',
            # 'dash_simtool_app/js/ext/svg.js',
            # 'dash_simtool_app/js/ext/jquery.csv.js',
            # 'dash_simtool_app/js/ext/jquery.min.js',
            # 'dash_simtool_app/js/ext/plotly-latest.min.js',
            # 'dash_simtool_app/js/1_sldcomponents.js',
            # 'dash_simtool_app/js/2_events.js',
            # 'dash_simtool_app/js/3_chapelcross_ESO.js',
            output='gen/dash_app.js'
        ),
    }
    # auth_css_bundle = Bundle(
    #     'auth/css/auth.css',
    #     filters='cssmin',
    #     output='dist/css/home.css',
    #     extra={'rel': 'stylesheet/less'}
    # )
    # main_js_bundle = Bundle(
    #     'dash_simtool/static/src/js/test.js',
    #     filters='jsmin',
    #     output='dash_simtool/static/dist/js/test.min.js'
    # )

    assets.register(bundles)
    # if app.config['FLASK_ENV'] == 'development':
    for bundle in bundles.values():
        bundle.build()
    return assets