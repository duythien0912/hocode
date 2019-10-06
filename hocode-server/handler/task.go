package handler

import (
	"net/http"
	"strconv"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Task godoc
// @Summary List Task
// @Description get tasks <a href="/api/v1/tasks?page=1&limit=5">/api/v1/tasks?page=1&limit=5</a>
// @Tags Tasks
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Task
// @Router /tasks [get]
func (h *Handler) Task(c echo.Context) (err error) {

	ta := []*model.Task{}
	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("tasks").
		Find(bson.M{}).
		Skip((page - 1) * limit).
		Limit(limit).

		// Sort("-timestamp").
		All(&ta); err != nil {
		return
	}

	for i := 0; i < len(ta); i++ {
		mta := []*model.MiniTask{}

		db.DB("hocode").C("minitasks").
			Find(bson.M{
				"task_id": ta[i].ID.Hex(),
			}).
			All(&mta)
		ta[i].Minitasks = mta

	}

	return c.JSON(http.StatusOK, ta)

}

// TaskByID godoc
// @Summary Get Task By ID
// @Description get task by ID <a href="/api/v1/tasks/5d86f268fe6e2b31c0673b02">/api/v1/tasks/5d86f268fe6e2b31c0673b02</a>
// @Tags Tasks
// @Accept  json
// @Produce  json
// @Param  id path int true "Task ID"
// @Success 200 {object} model.Task
// @Router /tasks/{id} [get]
func (h *Handler) TaskByID(c echo.Context) (err error) {

	tf := &model.Task{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("hocode").C("tasks").
		FindId(bson.ObjectIdHex(id)).
		// Find(bson.M{}).
		// Select(bson.M{"id": id}).
		One(&tf); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	mta := []*model.MiniTask{}

	db.DB("hocode").C("minitasks").
		Find(bson.M{
			"task_id": id,
		}).
		All(&mta)
	tf.Minitasks = mta

	return c.JSON(http.StatusOK, tf)
}

// CreateTask godoc
// @Summary Create Task
// @Description Create Task
// @Tags Tasks
// @Accept  json
// @Produce  json
// @Param  task body model.Task true "Create Task"
// @Success 200 {object} model.Task
// @Router /tasks [post]
func (h *Handler) CreateTask(c echo.Context) (err error) {

	tn := &model.Task{
		ID: bson.NewObjectId(),
	}
	if err = c.Bind(tn); err != nil {
		return
	}

	// Validation
	if tn.TaskName == "" || tn.CourseId == "" || tn.BackgroundImage == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	if err = db.DB("hocode").C("tasks").Insert(tn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, tn)

}
