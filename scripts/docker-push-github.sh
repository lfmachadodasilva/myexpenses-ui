#!/bin/bash

echo "$GB_TOKEN" | docker login -u lfmachadodasilva --password-stdin docker.pkg.github.com
docker build . --target final -t lfmachadodasilva/myexpenses-ui
docker tag lfmachadodasilva/myexpenses-ui docker.pkg.github.com/lfmachadodasilva/myexpenses-ui/master:latest
docker push docker.pkg.github.com/lfmachadodasilva/myexpenses-ui/master:latest
