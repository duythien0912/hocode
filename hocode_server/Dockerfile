FROM golang:1.13.0-alpine3.10

RUN apk add git
WORKDIR /app
COPY . .

ENV CGO_ENABLED=0

RUN go get github.com/githubnemo/CompileDaemon

ENTRYPOINT CompileDaemon -build="go build" -command="./hocode"
