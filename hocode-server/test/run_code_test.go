package test

import (
	"fmt"
	"os"
	"testing"
)

var pack = `package test

`
var funs = `func Sum(x int, y int, c chan int) int {
	sum := x + y
	c <- sum
	return sum
}`

func createFunc(c chan int) int {
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

func TestSum(t *testing.T) {
	d := make(chan int)

	go createFunc(d)

	fmt.Println(<-d)

	fmt.Println("run done createFunc")
	c := make(chan int)

	x := 5
	y := 5
	go Sum(x, y, c)
	total := <-c

	fmt.Println("run done Sum")

	if total != 10 {
		t.Errorf("Sum was incorrect, got: %d, want: %d.", total, 10)
	}
}
