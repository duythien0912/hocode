package handler

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"

	"github.com/labstack/echo"

	"gopkg.in/mgo.v2/bson"

	model "github.com/duythien0912/hocode/models"

	"gopkg.in/mgo.v2"
)

//e.GET("/testauth", TestAuth)
// curl localhost:8080/testauth -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTcwNjExOTY5LCJuYW1lIjoiYWRtaW41In0.Sa9lrADkn686Pyj5tYDltCR4trB2Oc9tdqhnIAPPNYs"

func (h *Handler) TestAuth(c echo.Context) (err error) {
	// Get team and member from the query string
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	name := claims["name"].(string)

	return c.String(http.StatusOK, "Welcome "+name+"!")

}

func (h *Handler) GetUserData(c echo.Context) (err error) {
	// Get team and member from the query string
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	name := claims["name"].(string)

	db := h.DB.Clone()
	defer db.Close()

	ur := &model.User{}

	if err = db.DB("hocode").C("users").
		Find(bson.M{"email": name}).
		One(&ur); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	ur.Password = ""

	return c.JSON(http.StatusOK, ur)

}

func (h *Handler) UpdataUserData(c echo.Context) (err error) {

	ur := &model.User{}

	if err = c.Bind(ur); err != nil {
		return err
	}

	ur.Email = ""

	// Validation
	if ur.ID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid ID fields"}
	}

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").
		C("users").
		Update(bson.M{"_id": ur.ID}, ur); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrInternalServerError
		}

		return
	}

	ur.Password = ""
	ur.Email = ""

	return c.JSON(http.StatusOK, ur)

}
