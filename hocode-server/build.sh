#!/usr/bin/env bash

env GOOS=linux GOARCH=arm go build
#scp ./hocode root@45.76.179.78:/
