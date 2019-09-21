package handler

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
)

func (h *Handler) Gethome(c echo.Context) (err error) {

	return c.HTML(http.StatusOK, fmt.Sprintf(index, ""))

}

var index = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Upstream Server</title>
		<style>
			h1, p {
				font-weight: 300;
			}
		</style>
	</head>
	<body>
		<h1>
			Hocode server %s
		</h1>
	</body>
	</html
`
