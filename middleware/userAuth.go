package middleware

import (
	"github.com/gin-gonic/gin"
)

func UserAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
	}
}