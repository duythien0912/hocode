## Run server hot reload

```go
go get github.com/githubnemo/CompileDaemon

CompileDaemon -build="go build" -command="./hocode"
```


## Create docs

```sh
swag init -g server.go
```