"""Compile static assets."""
from flask import current_app as app
from flask_assets import Bundle


def compile_static_assets(assets):
    """Create stylesheet bundles."""
    assets.auto_build = True
    assets.debug = False
    bundles = {
    'common_css' : Bundle(
        'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/litera/bootstrap.css',
        filters='cssmin',
        output='static/css/common.css'
    ),
    'landing_css' : Bundle(
            'css/landing.css',
            filters='cssmin',
            output='dist/css/landing.css',
            extra={'rel': 'stylesheet/less'}
    ),
        'test_js' : Bundle(
            ''
        )

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
    #     for bundle in bundles.values():
    #         bundle.build()
    return assets