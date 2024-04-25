#!/bin/bash

# Build quarkus backend
# echo "Building quarkus backend..."
# cd src/backend-core && ./gradlew build && cd ../..

# Build frontend
echo "Building frontend..."
cd src/frontend && yarn install && yarn run build && cd ../..
