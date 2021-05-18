cd ..
git status
pause
git add .
set /p commitmessage="Commit message: "
git commit -m "%commitmessage%"
git push
git push heroku master