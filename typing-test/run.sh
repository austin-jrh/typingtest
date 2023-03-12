#!/bin/bash

docker stop sutd-frontend
yes y | docker image prune -a
docker build -t sutd-frontend .
docker run -dp 8080:8080 --rm --name sutd-frontend sutd-frontend