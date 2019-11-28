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

// Books godoc
// @Summary List Books
// @ID book_list
// @Description get books <a href="/api/v1/books?page=1&limit=5">/api/v1/books?page=1&limit=5</a>
// @Tags Books
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Book
// @Router /books [get]
func (h *Handler) GetListBooks(c echo.Context) (err error) {

	var bk []*model.Book

	// page, _ := strconv.Atoi(c.QueryParam("page"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("books").
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

// Books godoc
// @Summary One Books
// @ID book_one
// @Description get books <a href="/api/v1/books?page=1&limit=5">/api/v1/books?page=1&limit=5</a>
// @Tags Books
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Book
// @Router /books/:id [get]
func (h *Handler) GetOneBooks(c echo.Context) (err error) {

	bk := &model.Book{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("books").
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

// Books godoc
// @Summary UpdateBooks Book
// @ID book_update
// @Description Update Book
// @Tags Books
// @Accept  json
// @Produce  json
// @Param  course body model.Book true "Update Book"
// @Success 200 {object} model.Book
// @Router /books/:id [put]
func (h *Handler) UpdateBooks(c echo.Context) (err error) {

	bk := &model.Book{
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
	if bk.Title == "" || bk.Image == "" || bk.Content == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("books").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("books").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Books godoc
// @Summary Create Book
// @ID book_create
// @Description Create Book
// @Tags Books
// @Accept  json
// @Produce  json
// @Param  course body model.Book true "Create Book"
// @Success 200 {object} model.Book
// @Router /books [post]
func (h *Handler) CreateBooks(c echo.Context) (err error) {

	bk := &model.Book{
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
	}

	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}

	// Validation
	if bk.Title == "" || bk.Image == "" || bk.Content == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("books").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("books").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Books godoc
// @Summary Delete Book
// @ID book_delete
// @Description Delete Book
// @Tags Books
// @Accept  json
// @Produce  json
// @Param  course body model.Book true "Delete Book"
// @Success 200 {object} model.Book
// @Router /books/:id [delete]
func (h *Handler) DeleteBooks(c echo.Context) (err error) {

	bk := &model.Book{
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
	// if err = db.DB(config.NameDb).C("books").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	bk.Del = true
	if err = db.DB(config.NameDb).C("books").Update(bson.M{"_id": bk.ID}, bson.M{"$set": bson.M{"del": true}}); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}
	}

	// _, errUs := db.DB(config.NameDb).C("books").UpsertId(bk.ID, bk)
	// if errUs != nil {
	// 	// return echo.ErrInternalServerError
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// }

	return c.JSON(http.StatusOK, bk)

}
