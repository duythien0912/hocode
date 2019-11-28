package handler

import (
	"net/http"
	"strconv"

	"github.com/duythien0912/hocode/config"

	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// Configs godoc
// @Summary One Configs by name
// @ID config_one_by_name
// @Description get configs
// @Tags Configs
// @Accept  json
// @Produce  json
// @Success 200 {object} model.Config
// @Router /curd/config/byname/:id [get]
func (h *Handler) GetConfigByName(c echo.Context) (err error) {

	bk := model.Config{}

	id := c.Param("id")

	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB(config.NameDb).C("configs").
		// FindId(bson.ObjectIdHex(id)).
		Find(bson.M{
			"name_site": id,
			// "del": bson.M{"$ne": true},
		}).
		One(&bk); err != nil {
		if err == mgo.ErrNotFound {
			// return echo.ErrNotFound
			return c.JSON(http.StatusOK, bk)

			// return &echo.HTTPError{Code: http.StatusBadRequest, Message: err}

		}
		return
	}

	c.Response().Header().Set("x-total-count", strconv.Itoa(1))

	return c.JSON(http.StatusOK, bk)

}
