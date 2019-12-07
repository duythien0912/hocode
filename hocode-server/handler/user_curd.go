package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/duythien0912/hocode/config"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Users godoc
// @Summary List Users
// @ID user_list
// @Description get users <a href="/api/v1/users?page=1&limit=5">/api/v1/users?page=1&limit=5</a>
// @Tags Users
// @Accept  json
// @Produce  json
// @Success 200 {array} model.User
// @Router /users [get]
func (h *Handler) GetListUsers(c echo.Context) (err error) {

	var bk []*model.User

	// page, _ := strconv.Atoi(c.QueryParam("page"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("users").
		Find(bson.M{"del": bson.M{"$ne": true}}).
		// Skip((page - 1) * limit).
		Skip(offset).
		Limit(limit).
		Sort("-timestamp").
		All(&bk); err != nil {
		return
	}
	c.Response().Header().Set("x-total-count", strconv.Itoa(len(bk)))

	return c.JSON(http.StatusOK, bk)

}

// Users godoc
// @Summary One Users
// @ID user_one
// @Description get users <a href="/api/v1/users?page=1&limit=5">/api/v1/users?page=1&limit=5</a>
// @Tags Users
// @Accept  json
// @Produce  json
// @Success 200 {object} model.User
// @Router /users/:id [get]
func (h *Handler) GetOneUsers(c echo.Context) (err error) {

	bk := &model.User{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("users").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"_id": bson.ObjectIdHex(id),
			"del": bson.M{"$ne": true},
		}).
		One(&bk); err != nil {
		if err == mgo.ErrNotFound {
			// return echo.ErrNotFound
			return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}

		}

		return
	}

	c.Response().Header().Set("x-total-count", strconv.Itoa(1))

	return c.JSON(http.StatusOK, bk)

}

// Users godoc
// @Summary UpdateUsers User
// @ID user_update
// @Description Update User
// @Tags Users
// @Accept  json
// @Produce  json
// @Param  course body model.User true "Update User"
// @Success 200 {object} model.User
// @Router /users/:id [put]
func (h *Handler) UpdateUsers(c echo.Context) (err error) {

	bk := &model.User{
		// ID: bson.NewObjectId(),
	}

	id := c.Param("id")

	if err = c.Bind(bk); err != nil {
		return
	}
	bk.ID = bson.ObjectIdHex(id)
	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}

	// Validation
	if bk.Email == "" || bk.Password == "" || bk.LastName == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid Email or Password or LastName fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("users").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("users").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Users godoc
// @Summary Create User
// @ID user_create
// @Description Create User
// @Tags Users
// @Accept  json
// @Produce  json
// @Param  course body model.User true "Create User"
// @Success 200 {object} model.User
// @Router /users [post]
func (h *Handler) CreateUsers(c echo.Context) (err error) {

	bk := &model.User{
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
	}

	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}

	// Validation
	if bk.Email == "" || bk.Password == "" || bk.LastName == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid Email or Password or LastName fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("users").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("users").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Users godoc
// @Summary Delete User
// @ID user_delete
// @Description Delete User
// @Tags Users
// @Accept  json
// @Produce  json
// @Param  course body model.User true "Delete User"
// @Success 200 {object} model.User
// @Router /users/:id [delete]
func (h *Handler) DeleteUsers(c echo.Context) (err error) {

	bk := &model.User{
		// ID: bson.NewObjectId(),
	}

	if err = c.Bind(bk); err != nil {
		return
	}

	id := c.Param("id")

	bk.ID = bson.ObjectIdHex(id)

	// if bk.ID == "" {
	// 	bk.ID = bson.NewObjectId()
	// }

	// Validation
	if bk.ID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid id fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("users").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	bk.Del = true
	if err = db.DB(config.NameDb).C("users").Update(bson.M{"_id": bk.ID}, bson.M{"$set": bson.M{"del": true}}); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}
	}

	// _, errUs := db.DB(config.NameDb).C("users").UpsertId(bk.ID, bk)
	// if errUs != nil {
	// 	// return echo.ErrInternalServerError
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// }

	return c.JSON(http.StatusOK, bk)

}
