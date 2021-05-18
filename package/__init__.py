# -*- coding: utf-8 -*-
import os
import pandas as pd
import numpy as np

DB_FOLDER = 'instance'
DB_NAME = 'db'
DB_TYPE = 'sqlite'

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
DB_DIR = os.path.join(BASE_DIR, DB_FOLDER, '.'.join([DB_NAME, DB_TYPE]))

