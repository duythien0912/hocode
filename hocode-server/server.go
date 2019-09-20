package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	e := echo.New()

	// Root level middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	e.GET("/", getHome)
	e.GET("/health_check", gethealthCheck)
	e.POST("/users", saveUser)
	e.GET("/users/:id", getUser)
	e.PUT("/users/:id", updateUser)
	e.DELETE("/users/:id", deleteUser)
	e.GET("/show", show)

	e.Logger.Fatal(e.Start(":8080"))
}

func getHome(c echo.Context) error {
	return c.HTML(http.StatusOK, fmt.Sprintf(index, ""))
}

func gethealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "Server Ok")
}

func saveUser(c echo.Context) error {
	return c.String(http.StatusOK, "saveUser")
}

// e.GET("/users/:id", getUser)
func getUser(c echo.Context) error {
	// User ID from path `users/:id`
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func updateUser(c echo.Context) error {
	return c.String(http.StatusOK, "updateUser")
}

func deleteUser(c echo.Context) error {
	return c.String(http.StatusOK, "deleteUser")
}

//e.GET("/show", show)
func show(c echo.Context) error {
	// Get team and member from the query string
	team := c.QueryParam("team")
	member := c.QueryParam("member")
	return c.String(http.StatusOK, "team:"+team+", member:"+member)
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
