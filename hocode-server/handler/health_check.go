package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

func (h *Handler) HealthCheck(c echo.Context) (err error) {

	return c.JSON(http.StatusOK, "Server Ok")

}
