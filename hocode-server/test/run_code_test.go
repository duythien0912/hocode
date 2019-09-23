package test

import (
	"fmt"
	"os"
	"testing"
)

var pack = `package test

`

// var funs = `func Sum(x int, y int, c chan int) int {
// 	sum := x + y
// 	c <- sum
// 	return sum
// }`

func TestSum(t *testing.T) {
	d := make(chan int)

	go createFunc(d)

	fmt.Println(<-d)

	c := make(chan int)

	x := 5
	y := 5
	go Sum(x, y, c)
	total := <-c

	if total != 10 {
		t.Errorf("Sum was incorrect x=%d, y=%d, got: %d, want: %d.", x, y, total, 10)
	}
}

func CheckTest(funs string) string {
	res := "Ok"
	d := make(chan int)

	go createFunc(d, funs)

	fmt.Println(<-d)

	c := make(chan int)

	x := 5
	y := 5
	go Sum(x, y, c)
	total := <-c

	if total != 10 {
		res = fmt.Sprintf("Sum was incorrect x=%d, y=%d, got: %d, want: %d.", x, y, total, 10)
	}

	return res
}

func createFunc(c chan int, funs string) int {
	r := 1

	f, err := os.Create("sum.go")
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
