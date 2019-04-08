#!/bin/bash
# Build Script for Lambda Layers using Docker

# cleanup previous caches
rm -rf ./nodejs

# create and build node_modules
docker build ./ --tag ngs-lambda-layers
docker run --rm -v "$PWD":/var/task ngs-lambda-layers yarn install

# build a package for Lambda Layers
mkdir -p ./nodejs/node8
mv ./node_modules ./nodejs/node8