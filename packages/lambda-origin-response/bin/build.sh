#!/bin/bash
# Build Script for Lambda Layers using Docker

# cleanup previous caches
rm -rf ./lib
rm -rf ./node_modules

# create and build node_modules
docker build ./ --tag ngs-lambda-layers
docker run --rm -v "$PWD":/var/task ngs-lambda-layers yarn install
# yarn run build

# build a package for Lambda Layers
mkdir ./lib
mv ./node_modules ./lib/

