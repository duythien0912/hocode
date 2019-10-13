package handler

import (
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

	// Validation
	if ur.Email == "" || ur.Password == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("users").
		Find(bson.M{"email": ur.Email, "password": ur.Password}).
		One(&ur); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = ur.Email
	claims["admin"] = true
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return err
	}

	ur.Token = t

	// if err = db.DB("hocode").C("course").Update(bson.M{"_id": ur.ID}, bson.M{"$set": bson.M{"token": t}}); err != nil {
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
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}

	// Connect to DB
	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("users").
		Find(bson.M{"email": ur.Email}).
		One(&ur); err != nil {

		// Create token
		token := jwt.New(jwt.SigningMethodHS256)

		// Set claims
		claims := token.Claims.(jwt.MapClaims)
		claims["name"] = ur.Email
		claims["admin"] = true
		claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

		// Generate encoded token and send it as response.
		t, err := token.SignedString([]byte("secret"))
		if err != nil {
			return err
		}

		ur.Token = t
		ur.ID = bson.NewObjectId()

		// Save in database
		if err = db.DB("hocode").C("users").Insert(ur); err != nil {
			return echo.ErrInternalServerError
		}

	} else {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "Email " + ur.Email + " already in use"}
	}

	return c.JSON(http.StatusOK, ur)
}

// return &echo.HTTPError{Code: http.StatusBadRequest, Message: "Email already in use"}