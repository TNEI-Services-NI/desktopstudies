from package.flaskapp import create_app, dbs
# from package.flaskapp.models import User

app = create_app()
with app.app_context():
    dbs.drop_all()