# -*- coding: utf-8 -*-
import os
import pandas as pd
import numpy as np

SIDEBAR_HIDE_OVERLAP = 2

CONTENT_STYLE_SIDEBAR_HIDDEN = {
    "margin-left": "2rem",
    "margin-right": "2rem",
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
    "background-color": "#ffe600",
}

SIDEBAR_STYLE_HIDDEN = {
    "position": "fixed",
    "top": NAVBAR_STYLE['height'],
    "left": "-"+str(int(SIDEBAR_STYLE['width'].split('rem')[0])-SIDEBAR_HIDE_OVERLAP)+'rem',
    "bottom": 0,
    "width": "12rem",
    "padding": "2rem 1rem",
    "background-color": "#ffe600",
}

CONTENT_STYLE = {
    "margin-left": str(int(SIDEBAR_STYLE['width'].split('rem')[0])+SIDEBAR_HIDE_OVERLAP)+'rem',
    "margin-right": "2rem",
    "padding": "2rem 1rem",
}

TOGGLE_BUTTON = {
    'margin-left': '9rem',
    "background-color": "#ebc700",
}