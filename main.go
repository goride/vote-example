package main

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"go-vote/router"
	"html/template"
)

func main() {
	r := gin.Default()
	r.Delims("<?", "?>")
	r.SetFuncMap(template.FuncMap{
		"json": func(v interface {}) template.JS {
			a, _ := json.Marshal(v)
			return template.JS(a)
		},
	})
	r.LoadHTMLGlob("view/*")
	router.Init(r)
	r.Run()
}
