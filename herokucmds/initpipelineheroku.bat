cd ..
set /p herokuappname="Name of application: "
heroku create %herokuappname%-staging --remote staging
heroku pipelines:create --app %herokuappname% --stage production %herokuappname%
heroku git:remote --app vollcosts --remote prod
heroku pipelines:add %herokuappname% --app %herokuappname%-staging --stage staging