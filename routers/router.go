package routers

import (
	"handband-rfid/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/events", &controllers.EventsController{})
	beego.Router("/events/add", &controllers.EventsController{}, "Post:Add")
	beego.Router("/events/get", &controllers.EventsController{}, "get:GetAll")

	beego.Router("/log/find-rfid", &controllers.LogController{}, "post:FindRfid")
	beego.Router("/log/add", &controllers.LogController{}, "post:Add")
	beego.Router("/log/give", &controllers.LogController{}, "post:Give")
	beego.Router("/log/get", &controllers.LogController{}, "post:GetAll")
	beego.Router("/log/delete", &controllers.EventsController{}, "Delete:Delete")
}
