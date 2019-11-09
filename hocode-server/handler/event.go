package handler

import (
	"net/http"
	"strconv"
	"time"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
)

// Events godoc
// @Summary List Events
// @Description get events <a href="/api/v1/events?page=1&limit=5">/api/v1/events?page=1&limit=5</a>
// @Tags Events
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Event
// @Router /events [get]
func (h *Handler) GetEvents(c echo.Context) (err error) {

	bk := []*model.Event{}

	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("events").
		Find(bson.M{}).
		Skip((page - 1) * limit).
		Limit(limit).
		Sort("-timestamp").
		All(&bk); err != nil {
		return
	}

	return c.JSON(http.StatusOK, bk)

}

// CreateEvent godoc
// @Summary Create Event
// @Description Create Event
// @Tags Events
// @Accept  json
// @Produce  json
// @Param  course body model.Event true "Create Event"
// @Success 200 {object} model.Event
// @Router /createevent [post]
func (h *Handler) CreateEvent(c echo.Context) (err error) {

	bk := &model.Event{
		ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
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
	if err = db.DB("hocode").C("events").Insert(bk); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, bk)

}
