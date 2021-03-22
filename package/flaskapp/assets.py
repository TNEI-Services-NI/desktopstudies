"""Compile static assets."""
from flask import current_app as app
from flask_assets import Bundle


def compile_static_assets(assets):
    """Create stylesheet bundles."""
    # assets.auto_build = True
    # assets.debug = False
    bundles = {

        'test_js' : Bundle(
            'js/test.js',
            output='gen/test.js'
        ),
    # 'dashsim_js_bundle': Bundle(
    #     'src/js/*.js',
    #     'dash_simtool'
    #     filters='jsmin',
    #     output='dist/js/main.min.js'
    # )

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