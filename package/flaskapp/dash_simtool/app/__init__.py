# -*- coding: utf-8 -*-
import dash_bootstrap_components as dbc

URL_BASE = '/simulator/'
URL_HOME = URL_BASE + 'home/'
URL_SLDS = URL_BASE + 'SLDs/'
URL_SCRIPTS = URL_BASE + 'Scripts/'
URL_GRAPH = URL_BASE + 'Graph/'
URL_ABOUT = URL_BASE + 'About/'

external_scripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.0.5/svg.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/svg.pan-zoom.js/2.7.0/svg.pan-zoom.min.js',
            'https://cdn.jsdelivr.net/npm/@svgdotjs/svg.filter.js@3.0.1/dist/svg.filter.min.js',
            'https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js',
            'https://cdn.jsdelivr.net/npm/@svgdotjs/svg.filter.js@3.0.1/dist/svg.filter.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.min.js',
            {'src': "https://code.jquery.com/jquery-1.12.4.min.js",
             'integrity': "sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ",
             'crossorigin': "anonymous"}
        ]

assets_path = '/assets'

loading_message = 'Loading...'

external_stylesheets = [dbc.themes.GRID,
                              dbc.themes.LUMEN]