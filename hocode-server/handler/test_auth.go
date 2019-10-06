package handler

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"

	"github.com/labstack/echo"
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
