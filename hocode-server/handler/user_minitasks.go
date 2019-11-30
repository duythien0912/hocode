package handler

import (
	"net/http"

	"github.com/duythien0912/hocode/config"

	"github.com/dgrijalva/jwt-go"
	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) GetUserCompleteMititask(c echo.Context) (err error) {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["id"].(string)

	db := h.DB.Clone()
	defer db.Close()

	userMiniTask := &model.UserMiniTask{}

	if err = db.DB(config.NameDb).C("user_minitask").
		Find(bson.M{
			"user_id": userID,
			"del":     bson.M{"$ne": true},
		}).
		One(&userMiniTask); err != nil {
	}

	return c.JSON(http.StatusOK, userMiniTask)

}
