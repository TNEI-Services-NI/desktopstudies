cd venv
cd Scripts 
call activate.bat
cd..
cd..
set FLASK_APP=package/flaskapp
set FLASK_ENV=development
flask init-db
