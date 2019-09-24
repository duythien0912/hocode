package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

// HealthCheck godoc
// @Summary Health Check Server
// @Description Health Check Server
// @Accept  json
// @Produce  json
// @Success 200 {string} string "Server Ok"
// @Router /health_check [get]
func (h *Handler) HealthCheck(c echo.Context) (err error) {

	return c.JSON(http.StatusOK, "Server Ok")

}
