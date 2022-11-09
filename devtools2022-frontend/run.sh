#!/bin/bash

docker stop sutd-frontend
docker build -t sutd-frontend .
docker run -dp 8080:8080 --rm --name sutd-frontend sutd-frontend