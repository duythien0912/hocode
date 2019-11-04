package handler

import (
	"net/http"
	"strconv"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
)

// Books godoc
// @Summary List Books
// @Description get books <a href="/api/v1/books?page=1&limit=5">/api/v1/books?page=1&limit=5</a>
// @Tags Books
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Book
// @Router /books [get]
func (h *Handler) GetBooks(c echo.Context) (err error) {

	bk := []*model.Book{}

	page, _ := strconv.Atoi(c.QueryParam("page"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("books").
		Find(bson.M{}).
		Skip((page - 1) * limit).
		Limit(limit).
		// Sort("-timestamp").
		All(&bk); err != nil {
		return
	}

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
		ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
	}

	// Validation
	if bk.Title == "" || bk.Image == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	if err = db.DB("hocode").C("books").Insert(bk); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusOK, bk)

}
