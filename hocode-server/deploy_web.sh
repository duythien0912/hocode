#!/bin/sh
cd ..

cd hocode-web

git pull

yarn

yarn build

cp -a build/. ../hocode-server/web/

cd ..

cd hocode-server

./deploy.sh