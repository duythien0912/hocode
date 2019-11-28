package handler

import (
	"github.com/duythien0912/hocode/config"
	"net/http"
	"strconv"
	"time"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Events godoc
// @Summary List Events
// @ID event_list
// @Description get events <a href="/api/v1/events?page=1&limit=5">/api/v1/events?page=1&limit=5</a>
// @Tags Events
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Event
// @Router /events [get]
func (h *Handler) GetListEvents(c echo.Context) (err error) {

	bk := []model.Event{}

	// page, _ := strconv.Atoi(c.QueryParam("page"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("events").
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

// Events godoc
// @Summary One Events
// @ID event_one
// @Description get events <a href="/api/v1/events?page=1&limit=5">/api/v1/events?page=1&limit=5</a>
// @Tags Events
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Event
// @Router /events/:id [get]
func (h *Handler) GetOneEvents(c echo.Context) (err error) {

	bk := &model.Event{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("events").
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

// Events godoc
// @Summary UpdateEvents Event
// @ID event_update
// @Description Update Event
// @Tags Events
// @Accept  json
// @Produce  json
// @Param  course body model.Event true "Update Event"
// @Success 200 {object} model.Event
// @Router /events/:id [put]
func (h *Handler) UpdateEvents(c echo.Context) (err error) {

	bk := &model.Event{
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
	if bk.Title == "" || bk.Image == "" || bk.Link == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("events").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("events").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Events godoc
// @Summary Create Event
// @ID event_create
// @Description Create Event
// @Tags Events
// @Accept  json
// @Produce  json
// @Param  course body model.Event true "Create Event"
// @Success 200 {object} model.Event
// @Router /events [post]
func (h *Handler) CreateEvents(c echo.Context) (err error) {

	bk := &model.Event{
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
	}

	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}

	// Validation
	if bk.Title == "" || bk.Image == "" || bk.Link == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("events").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("events").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Events godoc
// @Summary Delete Event
// @ID event_delete
// @Description Delete Event
// @Tags Events
// @Accept  json
// @Produce  json
// @Param  course body model.Event true "Delete Event"
// @Success 200 {object} model.Event
// @Router /events/:id [delete]
func (h *Handler) DeleteEvents(c echo.Context) (err error) {

	bk := &model.Event{
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
	// if err = db.DB(config.NameDb).C("events").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	bk.Del = true
	if err = db.DB(config.NameDb).C("events").Update(bson.M{"_id": bk.ID}, bson.M{"$set": bson.M{"del": true}}); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}
	}

	// _, errUs := db.DB(config.NameDb).C("events").UpsertId(bk.ID, bk)
	// if errUs != nil {
	// 	// return echo.ErrInternalServerError
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// }

	return c.JSON(http.StatusOK, bk)

}
