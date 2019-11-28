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

// Certs godoc
// @Summary List Certs
// @ID cert_list
// @Description get certs <a href="/api/v1/certs?page=1&limit=5">/api/v1/certs?page=1&limit=5</a>
// @Tags Certs
// @Accept  json
// @Produce  json
// @Success 200 {array} model.Cert
// @Router /certs [get]
func (h *Handler) GetListCerts(c echo.Context) (err error) {

	// var bk []model.Cert
	bk := []model.Cert{}

	// page, _ := strconv.Atoi(c.QueryParam("page"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))
	limit, _ := strconv.Atoi(c.QueryParam("limit"))

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("certs").
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

// Certs godoc
// @Summary One Certs
// @ID cert_one
// @Description get certs <a href="/api/v1/certs?page=1&limit=5">/api/v1/certs?page=1&limit=5</a>
// @Tags Certs
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Cert
// @Router /certs/:id [get]
func (h *Handler) GetOneCerts(c echo.Context) (err error) {

	bk := model.Cert{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("certs").
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

// Certs godoc
// @Summary UpdateCerts Cert
// @ID cert_update
// @Description Update Cert
// @Tags Certs
// @Accept  json
// @Produce  json
// @Param  course body model.Cert true "Update Cert"
// @Success 200 {object} model.Cert
// @Router /certs/:id [put]
func (h *Handler) UpdateCerts(c echo.Context) (err error) {

	bk := model.Cert{
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
	if bk.UserID == "" || bk.ConfigID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(cert.NameDb).C("certs").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("certs").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Certs godoc
// @Summary Create Cert
// @ID cert_create
// @Description Create Cert
// @Tags Certs
// @Accept  json
// @Produce  json
// @Param  course body model.Cert true "Create Cert"
// @Success 200 {object} model.Cert
// @Router /certs [post]
func (h *Handler) CreateCerts(c echo.Context) (err error) {

	bk := model.Cert{
		// ID: bson.NewObjectId(),
	}
	if err = c.Bind(bk); err != nil {
		return
	}

	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
	}

	// Validation
	if bk.UserID == "" || bk.ConfigID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid title or image fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	// Save in database
	bk.Timestamp = time.Now()
	// if err = db.DB(cert.NameDb).C("certs").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	_, errUs := db.DB(config.NameDb).C("certs").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	return c.JSON(http.StatusOK, bk)

}

// Certs godoc
// @Summary Delete Cert
// @ID cert_delete
// @Description Delete Cert
// @Tags Certs
// @Accept  json
// @Produce  json
// @Param  course body model.Cert true "Delete Cert"
// @Success 200 {object} model.Cert
// @Router /certs/:id [delete]
func (h *Handler) DeleteCerts(c echo.Context) (err error) {

	bk := model.Cert{
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
	// if err = db.DB(cert.NameDb).C("certs").Insert(bk); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	bk.Del = true
	if err = db.DB(config.NameDb).C("certs").Update(bson.M{"_id": bk.ID}, bson.M{"$set": bson.M{"del": true}}); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}
	}

	// _, errUs := db.DB(cert.NameDb).C("certs").UpsertId(bk.ID, bk)
	// if errUs != nil {
	// 	// return echo.ErrInternalServerError
	// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// }

	return c.JSON(http.StatusOK, bk)

}
