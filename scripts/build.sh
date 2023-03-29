#!/bin/bash

# Build backend
echo "Building backend..."
cd src/backend && sam build && cd ../..

# Build frontend
echo "Building frontend..."
cd src/frontend && yarn install && yarn run build && cd ../..

# Build infrastructure after all the previous builds have completed
# echo "Building infrastructure..."
# npm run tsc src/infrastructure/*/* --outDir ./build