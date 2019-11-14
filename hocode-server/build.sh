#!/bin/sh

git add .

git commit -m "deploy to vps"

git push -u origin master

ssh root@45.76.179.78 "source ~/.profile && cd hocode && git pull && cd hocode-server && go build && sudo systemctl restart hocode"
