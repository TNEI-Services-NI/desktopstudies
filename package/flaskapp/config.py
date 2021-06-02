# -*- coding: utf-8 -*-
"""Flask config."""
from os import environ, path
# from dotenv import load_dotenv

BASE_DIR = path.abspath(path.dirname(__file__))
# load_dotenv(path.join(BASE_DIR, '.env'))
POSTGRES_URI = "postgres://plidaxhaouhzjx:eaa0c97f9d13a0b31b5e8e62d97ba69ec5869c769dbd944a691c6aa5762ce045@ec2-35-171-250-21.compute-1.amazonaws.com:5432/df0g003ot0biid"


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


class PostgresDevelopmentConfig(DevelopmentConfig):
    SQLALCHEMY_DATABASE_URI = POSTGRES_URI
    SQLALCHEMY_POOL_SIZE = 30


class PostgresProductionConfig(ProductionConfig):
    SQLALCHEMY_DATABASE_URI = POSTGRES_URI
    SQLALCHEMY_POOL_SIZE = 30
