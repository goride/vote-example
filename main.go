package main

import (
	"github.com/gin-gonic/gin"
	"go-vote/router"
)

func main() {
	r := gin.Default()
	router.Init(r)
	r.Run()
}
