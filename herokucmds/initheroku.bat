cd ..
git status
pause
echo "web: gunicorn wsgi:app" > Procfile
pip install gunicorn
pip freeze > requirements.txt
git add .
git commit -m "Add Heroku deployment files"
git push
set /p herokuappname="Name of application: "
heroku create %herokuappname%
set /p branchname="Name of branch: "
git push heroku %branchname%