#!/bin/bash
# Build Script for Lambda Layers using Docker

# cleanup previous caches
rm -rf ./lib
mv ./node_modules ./node_modules_host

# create and build node_modules
docker build ./ --tag ngs-lambda-layers
docker run --rm -v "$PWD":/var/task ngs-lambda-layers yarn install --prod
# yarn run build

# build a package for Lambda
mkdir ./lib
mv ./node_modules ./lib/
mv ./node_modules_host ./node_modules

yarn run build