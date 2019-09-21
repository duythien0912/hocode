package main

import (
	"github.com/duythien0912/hocode/handler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	"gopkg.in/mgo.v2"
)

func main() {

	e := echo.New()
	e.Logger.SetLevel(log.ERROR)

	// Root level middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// mongodb://admin:adminadmin1@ds021984.mlab.com:21984/hocode
	db, err := mgo.Dial("mongodb://admin:adminadmin1@ds021984.mlab.com:21984/hocode")
	if err != nil {
		e.Logger.Fatal(err)
	} else {
		log.Info("Connect mongodb success")
	}

	// Initialize handler
	h := &handler.Handler{DB: db}

	e.GET("/", h.Gethome)
	e.GET("/health_check", h.HealthCheck)
	e.POST("/users", h.SaveUser)
	e.GET("/users/:id", h.GetUser)
	e.PUT("/users/:id", h.UpdateUser)
	e.DELETE("/users/:id", h.DeleteUser)
	e.GET("/show", h.Show)

	e.Logger.Fatal(e.Start(":8080"))
}
