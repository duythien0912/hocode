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

// Courses godoc
// @Summary List Courses
// @ID coursesx_list
// @Description get courses <a href="/api/v1/courses?page=1&limit=5">/api/v1/courses?page=1&limit=5</a>
// @Tags Courses
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Course
// @Router /courses [get]
func (h *Handler) GetListCourses(c echo.Context) (err error) {

	bk := []*model.Course{}

	// page, _ := strconv.Atoi(c.QueryParam("page"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("course").
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

// Courses godoc
// @Summary One Courses
// @ID coursesx_one
// @Description get courses <a href="/api/v1/courses?page=1&limit=5">/api/v1/courses?page=1&limit=5</a>
// @Tags Courses
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Course
// @Router /courses/:id [get]
func (h *Handler) GetOneCourses(c echo.Context) (err error) {

	bk := &model.Course{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("hocode").C("course").
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

// Courses godoc
// @Summary UpdateCourses Course
// @ID coursesx_update
// @Description Update Course
// @Tags Courses
// @Accept  json
// @Produce  json
// @Param  course body model.Course true "Update Course"
// @Success 200 {object} model.Course
// @Router /courses/:id [put]
func (h *Handler) UpdateCourses(c echo.Context) (err error) {

	bk := &model.Course{
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
	// if err = db.DB("hocode").C("course").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB("hocode").C("course").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Courses godoc
// @Summary Create Course
// @ID coursesx_create
// @Description Create Course
// @Tags Courses
// @Accept  json
// @Produce  json
// @Param  course body model.Course true "Create Course"
// @Success 200 {object} model.Course
// @Router /courses [post]
func (h *Handler) CreateCourses(c echo.Context) (err error) {

	bk := &model.Course{
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
	// if err = db.DB("hocode").C("course").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB("hocode").C("course").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Courses godoc
// @Summary Delete Course
// @ID coursesx_delete
// @Description Delete Course
// @Tags Courses
// @Accept  json
// @Produce  json
// @Param  course body model.Course true "Delete Course"
// @Success 200 {object} model.Course
// @Router /courses/:id [delete]
func (h *Handler) DeleteCourses(c echo.Context) (err error) {

	bk := &model.Course{
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
	// if err = db.DB("hocode").C("course").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	bk.Del = true
	if err = db.DB("hocode").C("course").Update(bson.M{"_id": bk.ID}, bson.M{"$set": bson.M{"del": true}}); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}
	}

	// _, errUs := db.DB("hocode").C("course").UpsertId(bk.ID, bk)
	// if errUs != nil {
	// 	// return echo.ErrInternalServerError
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// }

	return c.JSON(http.StatusOK, bk)

}
