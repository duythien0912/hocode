package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
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
		Find(bson.M{"del": bson.M{"$ne": true}}).
		Skip((page - 1) * limit).
		Limit(limit).
		Sort("-timestamp").
		All(&ta); err != nil {
		return
	}

	for i := 0; i < len(ta); i++ {
		mta := []*model.MiniTask{}

		db.DB("hocode").C("minitasks").
			Find(bson.M{
				"task_id": ta[i].ID.Hex(),
				"del":     bson.M{"$ne": true},
			}).
			Sort("-timestamp").
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

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["id"].(string)

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("hocode").C("tasks").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"_id": bson.ObjectIdHex(id),
			"del": bson.M{"$ne": true},
		}).
		// Find(bson.M{}).
		// Select(bson.M{"id": id}).
		One(&tf); err != nil {
		if err == mgo.ErrNotFound {
			return &echo.HTTPError{Code: http.StatusBadRequest, Message: "tasks not found"}
		}

		return
	}

	mta := []*model.MiniTask{}
	userMiniTask := &model.UserMiniTask{}

	db.DB("hocode").C("minitasks").
		Find(bson.M{
			"task_id": id,
			"del":     bson.M{"$ne": true},
		}).
		Sort("-timestamp").
		All(&mta)

	if err = db.DB("hocode").C("user_minitask").
		Find(bson.M{
			"user_id": userID,
			"del":     bson.M{"$ne": true},
		}).
		One(&userMiniTask); err != nil {
		// if err == mgo.ErrNotFound {
		// 	uc.CourseInfo = []CourseInfo
		// }
		// isInDBUserMiniTask = false
		// return
	}

	tf.Minitasks = mta

	vitri := -1

	for i := 0; i < len(mta); i++ {
		for j := 0; j < len(
			userMiniTask.MiniTaskInfo); j++ {
			if mta[i].ID.Hex() == userMiniTask.MiniTaskInfo[j].MiniTaskID {
				vitri = i
				mta[i].Status = userMiniTask.MiniTaskInfo[j].Status
			}

		}

	}

	if vitri != -1 {
		mta[vitri].Vitri = true
	}

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
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(tn); err != nil {
		return
	}

	if tn.ID == "" {
		tn.ID = bson.NewObjectId()
	}

	// Validation
	if tn.TaskName == "" || tn.CourseId == "" || tn.BackgroundImage == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	tn.Timestamp = time.Now()
	// if err = db.DB("hocode").C("tasks").Insert(tn); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB("hocode").C("tasks").UpsertId(tn.ID, tn)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, tn)

}
