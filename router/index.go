package router

import (
	"github.com/gin-gonic/gin"
	ctrlHome "go-vote/ctrl/home"
	"go-vote/middleware"
)

func Init (r *gin.Engine){
	r.Use(middleware.UserAuth())
	{
		r.GET("/", ctrlHome.Index)
	}
}