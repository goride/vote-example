package router

import (
	"github.com/gin-gonic/gin"
	home_c "go-vote/app/home"
	"go-vote/middleware"
)

func Init (r *gin.Engine){
	r.Use(middleware.UserAuth())
	{
		r.GET("/",home_c.Ctrl)
	}
}