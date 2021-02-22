"""Compile static assets."""
from flask import current_app as app
from flask_assets import Bundle


def compile_static_assets(assets):
    """Create stylesheet bundles."""
    assets.auto_build = True
    assets.debug = False
    common_css = Bundle(
        'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/litera/bootstrap.css',
        filters='cssmin',
        output='public/css/common.css'
    )
    auth_css_bundle = Bundle(
        'auth_bp/static/css/auth.css',
        filters='cssmin',
        output='dist/css/home.css',
        extra={'rel': 'stylesheet/less'}
    )

    assets.register('common_css_bundle', common_css)
    assets.register('auth_css_bundle', auth_css_bundle)
    return assets