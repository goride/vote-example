package ctrlHome

import (
	"github.com/gin-gonic/gin"
	"go-vote/service"
)

func Index(c *gin.Context) {
	c.JSON(200, gin.H{
		"luckyDay": service.LuckyDay().Format("2006-01-02"),
	})
}