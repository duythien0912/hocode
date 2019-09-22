package handler

import (
	"net/http"
	"strconv"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) Profile(c echo.Context) (err error) {

	ta := []*model.Profile{}
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("profile").
		Find(bson.M{}).
		Skip((page - 1) * limit).
		Limit(limit).
		// Sort("-timestamp").
		All(&ta); err != nil {
		return
	}

	return c.JSON(http.StatusOK, ta)

}

func (h *Handler) ProfileByID(c echo.Context) (err error) {

	tf := &model.Profile{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("hocode").C("profile").
		Find(bson.M{}).
		Select(bson.M{"id": id}).
		One(&tf); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	return c.JSON(http.StatusOK, tf)
}

func (h *Handler) CreateProfile(c echo.Context) (err error) {

	tn := &model.Profile{
		ID: bson.NewObjectId(),
	}
	if err = c.Bind(tn); err != nil {
		return
	}

	// Validation
	if tn.Name == "" || tn.Avatar == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	if err = db.DB("hocode").C("profile").Insert(tn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, tn)

}