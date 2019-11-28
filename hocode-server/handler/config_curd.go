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

// Configs godoc
// @Summary List Configs
// @ID config_list
// @Description get configs <a href="/api/v1/configs?page=1&limit=5">/api/v1/configs?page=1&limit=5</a>
// @Tags Configs
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Config
// @Router /configs [get]
func (h *Handler) GetListConfigs(c echo.Context) (err error) {

	var bk []*model.Config

	// page, _ := strconv.Atoi(c.QueryParam("page"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("configs").
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

// Configs godoc
// @Summary One Configs
// @ID config_one
// @Description get configs <a href="/api/v1/configs?page=1&limit=5">/api/v1/configs?page=1&limit=5</a>
// @Tags Configs
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Config
// @Router /configs/:id [get]
func (h *Handler) GetOneConfigs(c echo.Context) (err error) {

	bk := &model.Config{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("configs").
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

// Configs godoc
// @Summary UpdateConfigs Config
// @ID config_update
// @Description Update Config
// @Tags Configs
// @Accept  json
// @Produce  json
// @Param  course body model.Config true "Update Config"
// @Success 200 {object} model.Config
// @Router /configs/:id [put]
func (h *Handler) UpdateConfigs(c echo.Context) (err error) {

	bk := &model.Config{
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
	if bk.Name == "" || bk.ReviewPoint == 0  {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid Name or ReviewPoint fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("configs").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("configs").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Configs godoc
// @Summary Create Config
// @ID config_create
// @Description Create Config
// @Tags Configs
// @Accept  json
// @Produce  json
// @Param  course body model.Config true "Create Config"
// @Success 200 {object} model.Config
// @Router /configs [post]
func (h *Handler) CreateConfigs(c echo.Context) (err error) {

	bk := &model.Config{
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
	}

	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}

	// Validation
	if bk.Name == "" || bk.ReviewPoint == 0  {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid Name or ReviewPoint fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("configs").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("configs").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Configs godoc
// @Summary Delete Config
// @ID config_delete
// @Description Delete Config
// @Tags Configs
// @Accept  json
// @Produce  json
// @Param  course body model.Config true "Delete Config"
// @Success 200 {object} model.Config
// @Router /configs/:id [delete]
func (h *Handler) DeleteConfigs(c echo.Context) (err error) {

	bk := &model.Config{
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
	// if err = db.DB(config.NameDb).C("configs").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	bk.Del = true
	if err = db.DB(config.NameDb).C("configs").Update(bson.M{"_id": bk.ID}, bson.M{"$set": bson.M{"del": true}}); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}
	}

	// _, errUs := db.DB(config.NameDb).C("configs").UpsertId(bk.ID, bk)
	// if errUs != nil {
	// 	// return echo.ErrInternalServerError
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// }

	return c.JSON(http.StatusOK, bk)

}
