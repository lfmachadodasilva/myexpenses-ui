#!/bin/bash

DOCKER_LOGIN=lfmachadodasilva
DOCKER_PASSWORD=blabla

echo $DOCKER_PASSWORD | docker login -u $DOCKER_LOGIN --password-stdin