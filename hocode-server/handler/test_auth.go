package handler

import (
	"github.com/duythien0912/hocode/config"
	"net/http"

	"github.com/dgrijalva/jwt-go"

	"github.com/labstack/echo"

	"gopkg.in/mgo.v2/bson"

	model "github.com/duythien0912/hocode/models"

	"gopkg.in/mgo.v2"

	"time"
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
	ID := claims["id"].(string)

	db := h.DB.Clone()
	defer db.Close()

	ur := model.User{}

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

	if ur.Avatar == "" {
		ur.Avatar = "https://ui-avatars.com/api/?name=" + ur.FirstName + "+" + ur.LastName
	}

	ur.Password = ""

	return c.JSON(http.StatusOK, ur)

}

func (h *Handler) UpdataUserData(c echo.Context) (err error) {

	urN := model.User{}

	if err = c.Bind(urN); err != nil {
		return err
	}

	// ur.Email = ""

	// Validation
	if urN.ID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid ID fields"}
	}

	db := h.DB.Clone()
	defer db.Close()

	urO := model.User{}

	if err = db.DB(config.NameDb).C("users").
		Find(bson.M{
			"_id": urN.ID,
			"del": bson.M{"$ne": true},
		}).
		One(&urO); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	if urN.CodePoint != 0 {
		urO.CodePoint = urN.CodePoint
	}

	if urN.Password != "" {
		urO.Password = urN.Password
	}

	if urN.FirstName != "" {
		urO.FirstName = urN.FirstName
	}

	if urN.LastName != "" {
		urO.LastName = urN.LastName
	}

	if urN.Avatar != "" {
		urO.Avatar = urN.Avatar
	}

	urO.Timestamp = time.Now()
	if err = db.DB(config.NameDb).
		C("users").
		Update(bson.M{"_id": urN.ID}, urO); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrInternalServerError
		}

		return
	}

	urO.Password = ""

	return c.JSON(http.StatusOK, urO)

}
