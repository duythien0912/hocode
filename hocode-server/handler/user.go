package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

func (h *Handler) SaveUser(c echo.Context) (err error) {

	return c.String(http.StatusOK, "saveUser")

}

// e.GET("/users/:id", getUser)
func (h *Handler) GetUser(c echo.Context) (err error) {
	// User ID from path `users/:id`
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func (h *Handler) UpdateUser(c echo.Context) (err error) {
	return c.String(http.StatusOK, "updateUser")
}

func (h *Handler) DeleteUser(c echo.Context) (err error) {
	return c.String(http.StatusOK, "deleteUser")
}
