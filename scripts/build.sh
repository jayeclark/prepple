#!/bin/bash

# Build backend
echo "Building backend..."
cd src/backend && sam build && cd ../..

# Build quarkus backend
echo "Building quarkus backend..."
cd src/backend-core && quarkus build && cd ../..

# Build frontend
echo "Building frontend..."
cd src/frontend && yarn install && yarn run build && cd ../..
