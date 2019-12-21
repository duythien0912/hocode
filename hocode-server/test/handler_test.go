package handler

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
	model "github.com/duythien0912/hocode/models"
	handler "github.com/duythien0912/hocode/handlers"

)

var (
	mockDB = map[string]*model.User{
		"duythien0912@gmail.com": &model.User{"Duy Thien", "duythien0912@gmail.com"},
	}
	userJSON = `{"name":"Duy Thien","email":"duythien0912@gmail.com"}`
)
func TestCreateUser(t *testing.T) {
	// Setup
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(userJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	h := &handler{mockDB}

	// Assertions
	if assert.NoError(t, h.createUser(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		assert.Equal(t, userJSON, rec.Body.String())
	}
}
