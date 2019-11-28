package handler

import (
	"net/http"

	"github.com/duythien0912/hocode/handler/code"
	model "github.com/duythien0912/hocode/models"

	"fmt"
	"os"

	"github.com/labstack/echo"
)

var pack = `package code

`

//e.GET("/show", show)
func (h *Handler) RunGolang(c echo.Context) (err error) {
	// Get team and member from the query string
	co := model.Code{}

	if err = c.Bind(co); err != nil {
		return
	}
	if co.Code == "" || co.Lang == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid to or message fields"}
	}
	fmt.Println(co)

	res := CheckTest(co.Code)

	return c.String(http.StatusOK, res)
}

func CheckTest(funs string) string {
	res := "Ok"
	d := make(chan int)

	go createFunc(d, funs)

	fmt.Println(<-d)
	dd := <-d
	if dd == 1 {

		c := make(chan int)

		x := 5
		y := 5

		go code.Sum(x, y, c)
		total := <-c

		if total != 10 {
			res = fmt.Sprintf("Sum was incorrect x=%d, y=%d, got: %d, want: %d.", x, y, total, 10)
		}

	}
	return res
}

func createFunc(c chan int, funs string) int {
	r := 1

	f, err := os.Create("./handler/code/sum.go")
	if err != nil {
		fmt.Println(err)
		r = 0
	}
	l, err := f.WriteString(pack + funs)
	if err != nil {
		fmt.Println(err)
		f.Close()
		r = 0
	}
	fmt.Println(l, "bytes written successfully")
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		r = 0
	}

	c <- r
	return r
}
