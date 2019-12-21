package handler

import (
	"fmt"
	"net/http"

	"github.com/duythien0912/hocode/config"

	"github.com/dgrijalva/jwt-go"
	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
)

// UserMiniTask godoc
// @Summary Get complete user minitask
// @ID user_complete_minitask
// @Description
// @Tags UserMiniTask
// @Accept  json
// @Produce  json
// @Success 200 {array} model.MiniTask
// @Router /auth/completeminitask [get]
func (h *Handler) GetUserCompleteMititask(c echo.Context) (err error) {

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["id"].(string)

	db := h.DB.Clone()
	defer db.Close()

	userMiniTask := &model.UserMiniTask{}

	fmt.Println("[user_minitask]")
	if err = db.DB(config.NameDb).C("user_minitask").
		Find(bson.M{
			"user_id": userID,
			"del":     bson.M{"$ne": true},
		}).
		One(&userMiniTask); err != nil {
	}

	mta := []*model.MiniTask{}

	for i := 0; i < len(userMiniTask.MiniTaskInfo); i++ {
		bk := &model.MiniTask{}

		fmt.Println("[minitasks]")
		fmt.Println(userMiniTask.MiniTaskInfo[i].MiniTaskID)
		db.DB(config.NameDb).C("minitasks").
			// FindId(bson.ObjectIdHex(id)).
			Find(bson.M{
				"_id": bson.ObjectIdHex(userMiniTask.MiniTaskInfo[i].MiniTaskID),
				"del": bson.M{"$ne": true},
			}).
			One(&bk)

		if bk != nil {
			if bk.ID != "" {
				mta = append(mta, bk)
			}
		}

	}

	for i := 0; i < len(mta); i++ {

		tf := &model.Task{}

		fmt.Println("[tasks]")
		fmt.Println(mta[i].TaskId)
		if err = db.DB(config.NameDb).C("tasks").
			// FindId(bson.ObjectIdHex(mta[i].TaskId)).
			Find(bson.M{
				"_id": bson.ObjectIdHex(mta[i].TaskId),
				"del": bson.M{"$ne": true},
			}).
			// Find(bson.M{}).
			// Select(bson.M{"id": id}).
			One(&tf); err != nil {
			// if err == mgo.ErrNotFound {
			// return echo.ErrNotFound
			// return
			// }

			return
		}
		if tf != nil {
			if tf.BackgroundImage != "" {
				mta[i].Avatar = tf.BackgroundImage

			}
		}
	}
	return c.JSON(http.StatusOK, mta)

}
