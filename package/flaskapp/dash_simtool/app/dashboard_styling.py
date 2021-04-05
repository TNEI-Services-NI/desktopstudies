# -*- coding: utf-8 -*-
import os
import pandas as pd
import numpy as np

SIDEBAR_HIDE_OVERLAP = 0

CONTENT_STYLE_SIDEBAR_HIDDEN = {
    "marginLeft": "2rem",
    "marginRight": "2rem",
    "padding": "2rem 1rem",
}

NAVBAR_STYLE = {
    'height': '3rem'
}

SIDEBAR_STYLE = {
    "position": "fixed",
    "top": NAVBAR_STYLE['height'],
    "left": 0,
    "bottom": 0,
    "width": "12rem",
    "padding": "1rem 1rem",
    "backgroundColor": "#ffe600",
}

SIDEBAR_STYLE_HIDDEN = {
    "position": "fixed",
    "top": NAVBAR_STYLE['height'],
    "left": "-"+str(int(SIDEBAR_STYLE['width'].split('rem')[0])-SIDEBAR_HIDE_OVERLAP)+'rem',
    "bottom": 0,
    "width": "12rem",
    "padding": "2rem 1rem",
    "backgroundColor": "#ffe600",
}

CONTENT_STYLE = {
    "marginLeft": str(int(SIDEBAR_STYLE['width'].split('rem')[0])+SIDEBAR_HIDE_OVERLAP)+'rem',
    "marginRight": "2rem",
    "marginTop": NAVBAR_STYLE['height'],
}

TOGGLE_BUTTON = {
    'marginLeft': '9rem',
    "backgroundColor": "#ebc700",
}