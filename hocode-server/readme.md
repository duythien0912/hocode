## Run server hot reload

```go
go get github.com/githubnemo/CompileDaemon

CompileDaemon -build="go build" -command="./hocode"
```

or

```go
// install fresh
go get github.com/pilu/fresh

// run
fresh
```

## Create docs

```sh
swag init -g server.go

swag init -g server.go && sed -i '' 's/odel./odel_/g' ./docs/swagger.yaml

```
