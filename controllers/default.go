package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.Data["Website"] = "handband-rfid"
	c.Data["Email"] = "sergei.beregov@gmail.com"
	c.TplName = "index.tpl"
}
