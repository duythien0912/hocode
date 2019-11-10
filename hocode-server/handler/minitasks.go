package handler

import (
	"net/http"
	"strconv"
	"time"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Minitasks godoc
// @Summary List Minitasks
// @Description get List Minitasks <a href="/api/v1/minitasks?page=1&limit=5">/api/v1/minitasks?page=1&limit=5</a>
// @Tags Minitasks
// @Accept  json
// @Produce  json
// @Success 200 {array} model.MiniTask
// @Router /minitasks [get]
func (h *Handler) Minitasks(c echo.Context) (err error) {

	mta := []*model.MiniTask{}
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("minitasks").
		Find(bson.M{"del": bson.M{"$ne": true}}).
		Skip((page - 1) * limit).
		Limit(limit).
		Sort("-timestamp").
		All(&mta); err != nil {
		return
	}

	return c.JSON(http.StatusOK, mta)
}

// MinitasksByID godoc
// @Summary Get Minitasks By ID
// @Description get Minitasks by ID <a href="/api/v1/minitasks/5d995ae8fe6e2b0ca40b22fe">/api/v1/minitasks/5d995ae8fe6e2b0ca40b22fe</a>
// @Tags Minitasks
// @Accept  json
// @Produce  json
// @Param  id path int true "Minitask ID"
// @Success 200 {object} model.MiniTask
// @Router /minitasks/{id} [get]
func (h *Handler) MinitasksByID(c echo.Context) (err error) {

	mtf := &model.MiniTask{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("hocode").C("minitasks").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"_id": bson.ObjectIdHex(id),
			"del": bson.M{"$ne": true},
		}).
		One(&mtf); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	return c.JSON(http.StatusOK, mtf)
}

// CreateMinitast godoc
// @Summary Create Minitast
// @Description Create MiniTask
// @Tags Minitasks
// @Accept  json
// @Produce  json
// @Param  task body model.MiniTask true "Create MiniTask"
// @Success 200 {object} model.MiniTask
// @Router /minitasks [post]
func (h *Handler) CreateMinitast(c echo.Context) (err error) {

	mtn := &model.MiniTask{
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(mtn); err != nil {
		return
	}

	if mtn.ID == "" {
		mtn.ID = bson.NewObjectId()
	}
	// Validation
	if mtn.MiniTaskName == "" || mtn.TaskId == "" || mtn.Status == "" || mtn.NameFunc == "" || mtn.MinitaskDesc == "" || mtn.TemplateCode == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	mtn.Timestamp = time.Now()
	// if err = db.DB("hocode").C("minitasks").Insert(mtn); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB("hocode").C("minitasks").UpsertId(mtn.ID, mtn)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, mtn)

}

func (h *Handler) DailyMiniTask(c echo.Context) (err error) {

	limit, errorLimit := strconv.Atoi(c.QueryParam("limit"))
	if errorLimit != nil {
		limit = 4
	}
	mta := []*model.MiniTask{}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("minitasks").
		Find(bson.M{"del": bson.M{"$ne": true}}).
		// Select().
		Limit(limit).
		Sort("-timestamp").
		All(&mta); err != nil {
		return
	}

	for i := 0; i < len(mta); i++ {

		tf := &model.Task{}

		if err = db.DB("hocode").C("tasks").
			// FindId(bson.ObjectIdHex(mta[i].TaskId)).
			Find(bson.M{
				"_id": bson.ObjectIdHex(mta[i].TaskId),
				"del": bson.M{"$ne": true},
			}).
			// Find(bson.M{}).
			// Select(bson.M{"id": id}).
			One(&tf); err != nil {
			if err == mgo.ErrNotFound {
				return echo.ErrNotFound
			}

			return
		}
		mta[i].Avatar = tf.BackgroundImage
	}
	return c.JSON(http.StatusOK, mta)

}
