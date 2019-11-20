package handler

import (
	"github.com/duythien0912/hocode/config"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) Login(c echo.Context) (err error) {
	ur := &model.User{}

	if err = c.Bind(ur); err != nil {
		return err
	}

	passw := ur.Password

	// Validation
	if ur.Email == "" || ur.Password == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB(config.NameDb).C("users").
		Find(
			bson.M{
				"email": ur.Email,
				"del":   bson.M{"$ne": true},
			},
		).
		One(&ur); err != nil {
		if err == mgo.ErrNotFound {
			return &echo.HTTPError{Code: http.StatusBadRequest, Message: "Not Found Email"}
		}

		return
	}

	if passw != ur.Password {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "Wrong password"}
	}

	ur.Password = ""

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	urn := ur
	urn.Password = ""
	urn.Token = ""

	urn.Avatar = ""

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = ur.Email
	claims["id"] = ur.ID
	claims["data"] = urn
	claims["admin"] = true
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return err
	}

	ur.Token = t

	// if err = db.DB(config.NameDb).C("course").Update(bson.M{"_id": ur.ID}, bson.M{"$set": bson.M{"token": t}}); err != nil {
	// 	return echo.ErrInternalServerError
	// }

	return c.JSON(http.StatusOK, ur)

}

func (h *Handler) SignUp(c echo.Context) (err error) {
	ur := &model.User{}

	if err = c.Bind(ur); err != nil {
		return err
	}

	// Validation
	if ur.Email == "" || ur.Password == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid Email or Password fields"}
	}

	if ur.Avatar == "" {
		ur.Avatar = "https://ui-avatars.com/api/?name=" + ur.FirstName + "+" + ur.LastName
	}

	pass := ur.Password

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	urF := &model.User{}

	if err = db.DB(config.NameDb).C("users").
		Find(bson.M{"email": ur.Email, "del": bson.M{"$ne": true}}).One(urF); err != nil {

		ur.ID = bson.NewObjectId()

		// Create token
		token := jwt.New(jwt.SigningMethodHS256)

		urn := ur
		urn.Password = ""
		urn.Avatar = ""
		// Set claims
		claims := token.Claims.(jwt.MapClaims)
		claims["name"] = ur.Email
		claims["id"] = ur.ID
		claims["data"] = urn
		claims["admin"] = true
		claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

		// Generate encoded token and send it as response.
		t, err := token.SignedString([]byte("secret"))
		if err != nil {
			return err
		}

		ur.Token = t
		ur.Password = pass

		// Save in database
		ur.Timestamp = time.Now()
		ur.Role = "user"
		if err = db.DB(config.NameDb).C("users").Insert(ur); err != nil {
			return echo.ErrInternalServerError
		}

	} else {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "Email " + ur.Email + " already in use"}
	}

	ur.Password = ""

	return c.JSON(http.StatusOK, ur)
}

// return &echo.HTTPError{Code: http.StatusBadRequest, Message: "Email already in use"}
