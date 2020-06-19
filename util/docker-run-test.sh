#!/bin/bash

docker build --target test . -t test
docker run --rm -i -v C:/luizfelipe/myexpenses-ui/coverage:/app/coverage test
