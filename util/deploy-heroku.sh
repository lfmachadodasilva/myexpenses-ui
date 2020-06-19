#!/bin/bash

HEROKU_APP_NAME=myexpenses-ui

docker build . --target final -t web
heroku container:push web --app $HEROKU_APP_NAME
heroku container:release web --app $HEROKU_APP_NAME