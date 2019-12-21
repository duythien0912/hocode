package handler

import (
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/duythien0912/hocode/config"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	gonanoid "github.com/matoous/go-nanoid"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Certs godoc
// @Summary One Certs by Search ID
// @ID cert_search_id
// @Description get certs by SearchID
// @Tags Certs
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Cert
// @Router /certs/search/:id [get]
func (h *Handler) SearchCertsByID(c echo.Context) (err error) {

	bk := []*model.Cert{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("certs").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"search_id": bson.RegEx{Pattern: id, Options: "i"},
			// "search_id": bson.M{"$regex": id},
			// "search_id": id,
			"del": bson.M{"$ne": true},
		}).
		All(&bk); err != nil {
		if err == mgo.ErrNotFound {
			// return echo.ErrNotFound
			return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}

		}

		return
	}

	for i := 0; i < len(bk); i++ {
		ur := &model.User{}

		db.DB(config.NameDb).C("users").
			// FindId(bson.ObjectIdHex(ID)).
			Find(bson.M{
				"_id": bson.ObjectIdHex(bk[i].UserID),
				"del": bson.M{"$ne": true},
			}).
			One(&ur)
		if ur != nil {
			if ur.Email != "" {
				bk[i].UrEmail = ur.Email
				bk[i].CodePoint = ur.CodePoint
			}
		}

	}

	c.Response().Header().Set("x-total-count", strconv.Itoa(len(bk)))

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

	if err = db.DB(config.NameDb).C("certs").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"user_id":   ur.ID.Hex(),
			"config_id": configApp.ID.Hex(),
			"del":       bson.M{"$ne": true},
		}).
		One(&bk); err != nil {
		if err == mgo.ErrNotFound {
			// return echo.ErrNotFound
			// return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}

		}

		// returns
	}

	// bk.ID = bson.NewObjectId()
	if bk.ID == "" {
		bk.ID = bson.NewObjectId()
		id, _ := gonanoid.Generate(bk.ID.Hex(), 8)
		bk.SearchID = id
	}
	bk.UserID = ur.ID.Hex()
	bk.ConfigID = configApp.ID.Hex()
	if ur.CodePoint >= configApp.ReviewPoint {
		bk.Status = "Peding"
	} else {
		bk.Status = "Inactive"
	}

	bk.Timestamp = time.Now()

	_, errUs := db.DB(config.NameDb).C("certs").UpsertId(bk.ID, bk)
	if errUs != nil {
		// return echo.ErrInternalServerError
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	}

	// else {
	// 	_, errUs := db.DB(config.NameDb).C("certs").Insert(bson.M{"user_id": bk.UserID, "config_id": bk.ConfigID}, bk)
	// 	if errUs != nil {
	// 		// return echo.ErrInternalServerError
	// 		return &echo.HTTPError{Code: http.StatusBadRequest, Message: errUs}
	// 	}

	// }

	bk.Agree = false

	reviewCertOut := &model.ReviewCertOut{
		User: ur, Config: configApp, Cert: bk,
	}

	c.Response().Header().Set("x-total-count", strconv.Itoa(1))

	return c.JSON(http.StatusOK, reviewCertOut)

}

// ViewCertUser godoc
// @Summary View Cert by user
// @ID view_cert
// @Description View cert for user
// @Tags ViewCertUser
// @Accept  json
// @Produce  json
// @Success 200 {object} model.ReviewCertOut
// @Router /auth/viewcert [get]
func (h *Handler) ViewCertUser(c echo.Context) (err error) {

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

	// if err =
	db.DB(config.NameDb).C("configs").
		Find(bson.M{
			"name_site": "hocode",
		}).
		One(&configApp)
		// err != nil {
		// if err == mgo.ErrNotFound {
		// return c.JSON(http.StatusOK, configApp)

		// }
	// 	return
	// }

	bk := &model.Cert{}

	if err = db.DB(config.NameDb).C("certs").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"user_id":   ur.ID.Hex(),
			"config_id": configApp.ID.Hex(),
			"del":       bson.M{"$ne": true},
		}).
		One(&bk); err != nil {
		if err == mgo.ErrNotFound {
		}

	}

	reviewCertOut := &model.ReviewCertOut{
		User: ur, Config: configApp, Cert: bk,
	}

	c.Response().Header().Set("x-total-count", strconv.Itoa(1))

	return c.JSON(http.StatusOK, reviewCertOut)

}
