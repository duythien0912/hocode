#!/bin/sh
git pull

git add .

git commit -m "[Thien] deploy to vps"

git push -u origin master

ssh root@45.76.179.78 "source ~/.profile && cd hocode && rm -rf hocode-server/hocode && git pull -f && cd hocode-server && go build && sudo systemctl restart hocode"