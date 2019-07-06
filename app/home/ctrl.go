package home_c

import (
	"github.com/gin-gonic/gin"
	news_s "go-vote/app/news"
	"net/http"
)

func Ctrl(c *gin.Context) {
	dataVO := struct {
		NewsList []string `json:"newsList"`
	}{
		NewsList: news_s.List(),
	}
	//c.JSON(http.StatusOK, dataVO)
	c.HTML(http.StatusOK, "index.html", gin.H{
		"data": dataVO,
	})
}
