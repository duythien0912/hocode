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

// MiniTasks godoc
// @Summary List MiniTasks
// @ID minitask_list
// @Description get minitasks <a href="/api/v1/minitasks?page=1&limit=5">/api/v1/minitasks?page=1&limit=5</a>
// @Tags MiniTasks
// @Accept  json
// @Produce  json
// @Success 200 {array} model.MiniTask
// @Router /minitasks [get]
func (h *Handler) GetListMiniTasks(c echo.Context) (err error) {

	bk := []*model.MiniTask{}

	// page, _ := strconv.Atoi(c.QueryParam("page"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("minitasks").
		Find(bson.M{"del": bson.M{"$ne": true}}).
		// Skip((page - 1) * limit).
		Skip(offset).
		Limit(limit).
		Sort("-timestamp").
		All(&bk); err != nil {
		return
	}
	len, _ := db.DB(config.NameDb).C("minitasks").Count()
	c.Response().Header().Set("x-total-count", strconv.Itoa(len))

	return c.JSON(http.StatusOK, bk)

}

// MiniTasks godoc
// @Summary One MiniTasks
// @ID minitask_one
// @Description get minitasks <a href="/api/v1/minitasks?page=1&limit=5">/api/v1/minitasks?page=1&limit=5</a>
// @Tags MiniTasks
// @Accept  json
// @Produce  json
// @Success 200 {object} model.MiniTask
// @Router /minitasks/:id [get]
func (h *Handler) GetOneMiniTasks(c echo.Context) (err error) {

	bk := &model.MiniTask{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("minitasks").
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

// MiniTasks godoc
// @Summary UpdateMiniTasks MiniTask
// @ID minitask_update
// @Description Update MiniTask
// @Tags MiniTasks
// @Accept  json
// @Produce  json
// @Param  minitask body model.MiniTask true "Update MiniTask"
// @Success 200 {object} model.MiniTask
// @Router /minitasks/:id [put]
func (h *Handler) UpdateMiniTasks(c echo.Context) (err error) {

	bk := &model.MiniTask{
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
	// if bk.Title == "" || bk.Image == "" || bk.Content == "" {
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	// }

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("minitasks").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("minitasks").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// MiniTasks godoc
// @Summary Create MiniTask
// @ID minitask_create
// @Description Create MiniTask
// @Tags MiniTasks
// @Accept  json
// @Produce  json
// @Param  minitask body model.MiniTask true "Create MiniTask"
// @Success 200 {object} model.MiniTask
// @Router /minitasks [post]
func (h *Handler) CreateMiniTasks(c echo.Context) (err error) {

	bk := &model.MiniTask{
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
	}

	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}

	// Validation
	// if bk.Title == "" || bk.Image == "" || bk.Content == "" {
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	// }

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("minitasks").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("minitasks").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// MiniTasks godoc
// @Summary Delete MiniTask
// @ID minitask_delete
// @Description Delete MiniTask
// @Tags MiniTasks
// @Accept  json
// @Produce  json
// @Param  minitask body model.MiniTask true "Delete MiniTask"
// @Success 200 {object} model.MiniTask
// @Router /minitasks/:id [delete]
func (h *Handler) DeleteMiniTasks(c echo.Context) (err error) {

	bk := &model.MiniTask{
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
	// if err = db.DB(config.NameDb).C("minitasks").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	bk.Del = true
	if err = db.DB(config.NameDb).C("minitasks").Update(bson.M{"_id": bk.ID}, bson.M{"$set": bson.M{"del": true}}); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}
	}

	// _, errUs := db.DB(config.NameDb).C("minitasks").UpsertId(bk.ID, bk)
	// if errUs != nil {
	// 	// return echo.ErrInternalServerError
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// }

	return c.JSON(http.StatusOK, bk)

}
