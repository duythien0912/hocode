package main

import (
	"net/http"

	"github.com/labstack/echo"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.GET("/health_check", func(c echo.Context) error {
		return c.String(http.StatusOK, "Server Ok")
	})
	e.Logger.Fatal(e.Start(":8080"))
}
