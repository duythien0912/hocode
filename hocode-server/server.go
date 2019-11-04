package main

import (
	"github.com/duythien0912/hocode/handler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	"gopkg.in/mgo.v2"
)

// @title Hocode API
// @version 1.0
// @description This is a server Api Hocode.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host hocode.appspot.com
// @BasePath /api/v1

func main() {

	e := echo.New()
	// e.Logger.SetLevel(log.ERROR)
	e.Use(middleware.GzipWithConfig(middleware.GzipConfig{
		Level: 5,
	}))

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

	e.GET("/users", h.GetUser)
	e.GET("/users/:id", h.GetUserByID)
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

	r := e.Group("/api/v1")

	r.GET("/courses", h.Courses)
	r.GET("/courses/:id", h.CourseByID)
	r.GET("/courses/:id/tasks", h.TaskByCoursesID)
	r.POST("/courses", h.CreateCourse)

	r.GET("/tasks", h.Task)
	r.GET("/tasks/:id", h.TaskByID)
	r.POST("/tasks", h.CreateTask)

	r.GET("/minitasks", h.Minitasks)
	r.GET("/minitasks/:id", h.MinitasksByID)
	r.POST("/minitasks", h.CreateMinitast)

	r.GET("/profile", h.Profile)
	r.POST("/profile", h.CreateProfile)
	r.POST("/login", h.Login)
	r.POST("/signup", h.SignUp)

	r.GET("/books", h.GetBooks)
	r.POST("/createbook", h.CreateBook)
	r.GET("/events", h.GetEvents)
	r.POST("/createevent", h.CreateEvent)

	// r.GET("/rungolang", h.RunGolang)
	r.POST("/rungolang", h.RunGolang)

	ra := e.Group("/auth")
	ra.Use(middleware.JWT([]byte("secret")))
	ra.GET("", h.TestAuth)
	ra.GET("/userinfo", h.GetUserData)
	ra.POST("/userinfoupdate", h.UpdataUserData)
	ra.GET("/usercourse", h.GetUserCourse)
	ra.POST("/updateusercourse", h.UpdateUserCourse)

	// e.Use(middleware.Static("/static"))
	// e.Static("/", "static")
	// e.GET("/", h.Gethome)
	// e.Static("/*", "../hocode-web/build")
	// e.File("/*", "../hocode-web/build/index.html")
	// e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.File("/swagger.json", "docs/swagger.json")

	e.File("/", "static/docs.html")

	e.File("/docs", "static/dist/index.html")
	e.File("/swagger-ui.css", "static/dist/swagger-ui.css")
	e.File("/swagger-ui-bundle.js", "static/dist/swagger-ui-bundle.js")
	e.File("/swagger-ui-standalone-preset.js", "static/dist/swagger-ui-standalone-preset.js")

	e.File("*", "static/index.html")
	e.Use(ServerHeader)
	e.Logger.Fatal(e.Start(":8080"))
}

func ServerHeader(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		c.Response().Header().Set(echo.HeaderServer, "Echo/3.0")
		c.Response().Header().Set("Access-Control-Expose-Headers", "Content-Range")

		c.Response().Header().Set("Content-Range", "bytes : 0-9/*")
		return next(c)
	}
}
