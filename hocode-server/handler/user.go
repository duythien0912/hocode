package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

func (h *Handler) SaveUser(c echo.Context) (err error) {

	return c.String(http.StatusOK, "saveUser")

}

// GetUser godoc
// @Summary List users
// @Description get users
// @Tags users
// @Accept  json
// @Produce  json
// @Success 200 {array} model.User
// @Router /users [get]
func (h *Handler) GetUser(c echo.Context) (err error) {
	// User ID from path `users/:id`
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

// UpdateUser godoc
// @Summary Update user
// @Description update accounts by ID
// @Tags users
// @Accept  json
// @Produce  json
// @Param  id path int true "Account ID"
// @Param  account body model.User true "Update account"
// @Success 200 {object} model.User
// @Router /users/{id} [post]
func (h *Handler) UpdateUser(c echo.Context) (err error) {
	return c.String(http.StatusOK, "updateUser")
}

// DeleteUser godoc
// @Summary Delete user
// @Description delete accounts by ID
// @Tags users
// @Accept  json
// @Produce  json
// @Param  id path int true "Account ID"
// @Success 200 {string} string "Ok"
// @Router /users/{id} [delete]
func (h *Handler) DeleteUser(c echo.Context) (err error) {
	return c.String(http.StatusOK, "deleteUser")
}
