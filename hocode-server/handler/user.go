package handler

import (
	"net/http"
	"strconv"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
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

	courses := []*model.User{}
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("users").
		Find(bson.M{}).
		Skip((page - 1) * limit).
		Limit(limit).
		// Sort("-timestamp").
		All(&courses); err != nil {
		return
	}

	return c.JSON(http.StatusOK, courses)

}

// GetUserByID godoc
// @Summary Get user by ID
// @Description get accounts by ID
// @Tags users
// @Accept  json
// @Produce  json
// @Param  id path int true "Account ID"
// @Param  account body model.User true "Get account"
// @Success 200 {object} model.User
// @Router /users/{id} [post]
func (h *Handler) GetUserByID(c echo.Context) (err error) {
	return c.String(http.StatusOK, "GetUserByID")
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
