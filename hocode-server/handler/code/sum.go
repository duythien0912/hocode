package code

func Sum(x int, y int, c chan int) int {
	sum := x + y
	c <- sum
	return sum
}
