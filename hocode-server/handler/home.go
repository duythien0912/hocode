package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

func (h *Handler) Gethome(c echo.Context) (err error) {
	// pusher, ok := c.Response().Writer.(http.Pusher)
	// if ok {
	//     if err = pusher.Push("/app.css", nil); err != nil {
	//         return
	//     }
	//     if err = pusher.Push("/app.js", nil); err != nil {
	//         return
	//     }
	//     if err = pusher.Push("/echo.png", nil); err != nil {
	//         return
	//     }
	// }

	// c.File("index.html")

	return c.HTML(http.StatusOK, "index.html")

}
