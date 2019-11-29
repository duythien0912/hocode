package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/duythien0912/hocode/config"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"github.com/matoous/go-nanoid"

)

// Certs godoc
// @Summary One Certs by Search ID
// @ID cert_search_id
// @Description get certs by SearchID
// @Tags Certs
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Cert
// @Router /cert/search/:id [get]
func (h *Handler) SearchCertsByID(c echo.Context) (err error) {

	bk := &model.Cert{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("certs").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"search_id": id,
			"del":       bson.M{"$ne": true},
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

// ReviewCert godoc
// @Summary Review Cert by user
// @ID review_cert
// @Description Review cert for user
// @Tags ReviewCert
// @Accept  json
// @Produce  json
// @Success 200 {object} model.ReviewCertOut
// @Router /auth/reviewcert [get]
func (h *Handler) ReviewCert(c echo.Context) (err error) {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	ID := claims["id"].(string)

	db := h.DB.Clone()
	defer db.Close()

	ur := &model.User{}

	if err = db.DB(config.NameDb).C("users").
		// FindId(bson.ObjectIdHex(ID)).
		Find(bson.M{
			"_id": bson.ObjectIdHex(ID),
			"del": bson.M{"$ne": true},
		}).
		One(&ur); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	configApp := &model.Config{}

	if err = db.DB(config.NameDb).C("configs").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"name_site": "hocode",
			// "del": bson.M{"$ne": true},
		}).
		One(&configApp); err != nil {
		if err == mgo.ErrNotFound {
			// return echo.ErrNotFound
			return c.JSON(http.StatusOK, configApp)

			// return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}

		}
		return
	}

	bk := &model.Cert{}

	if ur.CodePoint >= configApp.ReviewPoint {

		bk.UserID = ur.ID.Hex()
		bk.ConfigID = configApp.ID.Hex()
		bk.Status = "Active"
		id, _ := gonanoid.Generate("abcde", 6)
		bk.SearchID  = id


		bk.Timestamp = time.Now()

		_, errUs := db.DB(config.NameDb).C("certs").Upsert(bson.M{"user_id": bk.UserID, "config_id": bk.ConfigID}, bk)
		if errUs != nil {
			// return echo.ErrInternalServerError
			return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
		}

	}

	reviewCertOut := &model.ReviewCertOut{
		User: ur, Config: configApp, Cert: bk,
	}

	c.Response().Header().Set("x-total-count", strconv.Itoa(1))

	return c.JSON(http.StatusOK, reviewCertOut)

}
