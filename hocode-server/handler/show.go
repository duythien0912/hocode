package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

//e.GET("/show", show)
func (h *Handler) Show(c echo.Context) (err error) {
	// Get team and member from the query string
	team := c.QueryParam("team")
	member := c.QueryParam("member")
	return c.String(http.StatusOK, "team:"+team+", member:"+member)
}
