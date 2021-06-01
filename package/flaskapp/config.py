# -*- coding: utf-8 -*-
"""Flask config."""
from os import environ, path
# from dotenv import load_dotenv

BASE_DIR = path.abspath(path.dirname(__file__))
# load_dotenv(path.join(BASE_DIR, '.env'))


class Config:
    """Flask configuration variables."""
    DEBUG = False
    DEVELOPMENT = False

    # General Config
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')
    SECRET_KEY = environ.get('SECRET_KEY', 'dev')

    # Assets
    LESS_BIN = environ.get('LESS_BIN')
    ASSETS_DEBUG = environ.get('ASSETS_DEBUG')
    LESS_RUN_IN_DEBUG = environ.get('LESS_RUN_IN_DEBUG')

    # Database
    SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL')

    # Static Assets
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'
    COMPRESSOR_DEBUG = environ.get('COMPRESSOR_DEBUG')


class ProductionConfig(Config):
    DEBUG = False
    DEVELOPMENT = False


class StagingConfig(Config):
    DEBUG = True


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True


class PostgresDevelopment(Config):
    DEVELOPMENT = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgres://lejasbqocafhqr:bc9a7665ac1c579d1296b4a28d0ca7b2bb3b16e8d350b9a38a79203711891693@ec2-23-23-128-222.compute-1.amazonaws.com:5432/df5qrdnkgl04nb"

