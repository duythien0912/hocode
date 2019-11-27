package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/duythien0912/hocode/config"
	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
)

// Books godoc
// @Summary List Books
// @Description get books <a href="/api/v1/books?page=1&limit=5">/api/v1/books?page=1&limit=5</a>
// @ID book_list
// @Tags Books
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Book
// @Router /books [get]
func (h *Handler) GetBooks(c echo.Context) (err error) {

	bk := []*model.Book{}

	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("books").
		Find(bson.M{"del": bson.M{"$ne": true}}).
		Skip(offset).
		Limit(limit).
		Sort("-timestamp").
		All(&bk); err != nil {
		return
	}
	c.Response().Header().Set("x-total-count", strconv.Itoa(len(bk)))

	return c.JSON(http.StatusOK, bk)
}

// CreateBook godoc
// @Summary Create Book
// @Description Create Book
// @Tags Books
// @Accept  json
// @Produce  json
// @Param  course body model.Book true "Create Book"
// @Success 200 {object} model.Book
// @Router /createbook [post]
func (h *Handler) CreateBook(c echo.Context) (err error) {

	bk := &model.Book{
		// ID: bson.NewObjectId(),
	}

	if err = c.Bind(bk); err != nil {
		return
	}

	// Validation
	if bk.Title == "" || bk.Image == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}
	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(config.NameDb).C("books").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	//Upsert
	// update := bson.M{"$inc": bk}
	// selector := bson.M{"_id": bk.ID}

	_, errUs := db.DB(config.NameDb).C("books").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}
