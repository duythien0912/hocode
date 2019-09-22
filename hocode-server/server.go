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
	// e.Logger.SetLevel(log.ERROR)

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

	e.GET("/health_check", h.HealthCheck)

	e.GET("/users/:id", h.GetUser)
	e.POST("/users", h.SaveUser)
	e.PUT("/users/:id", h.UpdateUser)
	e.DELETE("/users/:id", h.DeleteUser)

	e.GET("/show", h.Show)

	e.GET("/courses", h.Courses)
	e.GET("/courses/:id", h.CourseByID)
	e.GET("/courses/:id/tasks", h.TaskByCoursesID)
	e.POST("/courses", h.CreateCourse)

	e.GET("/tasks", h.Task)
	e.GET("/tasks/:id", h.TaskByID)
	e.POST("/tasks", h.CreateTask)

	e.GET("/minitasks", h.Minitasks)
	e.GET("/minitasks/:id", h.MinitasksByID)
	e.POST("/minitasks", h.CreateMinitast)

	e.GET("/profile", h.Profile)
	e.POST("/profile", h.CreateProfile)

	// e.Use(middleware.Static("/static"))

	// e.Static("/", "static")
	// e.GET("/", h.Gethome)
	e.File("/api", "static/index.html")

	e.Logger.Fatal(e.Start(":8080"))
}