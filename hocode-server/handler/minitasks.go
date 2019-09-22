package handler

import (
	"net/http"
	"strconv"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) Minitasks(c echo.Context) (err error) {

	mta := []*model.MiniTask{}
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("minitasks").
		Find(bson.M{}).
		Skip((page - 1) * limit).
		Limit(limit).
		// Sort("-timestamp").
		All(&mta); err != nil {
		return
	}

	return c.JSON(http.StatusOK, mta)
}

func (h *Handler) MinitasksByID(c echo.Context) (err error) {

	mtf := &model.MiniTask{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("hocode").C("minitasks").
		FindId(bson.ObjectIdHex(id)).
		// Find(bson.M{}).
		// Select(bson.M{"id": id}).
		One(&mtf); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	return c.JSON(http.StatusOK, mtf)
}

func (h *Handler) CreateMinitast(c echo.Context) (err error) {

	mtn := &model.MiniTask{
		ID: bson.NewObjectId(),
	}
	if err = c.Bind(mtn); err != nil {
		return
	}

	// Validation
	if mtn.MiniTaskName == "" || mtn.TaskId == "" || mtn.Status == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	if err = db.DB("hocode").C("minitasks").Insert(mtn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, mtn)

}
