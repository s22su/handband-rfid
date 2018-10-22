package controllers

import (
	"encoding/json"
	"fmt"

	models "github.com/s22su/handband-rfid/models"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type EventsController struct {
	beego.Controller
}

func (events *EventsController) Add() {

	beego.Debug("Add called")

	o := orm.NewOrm()
	o.Using("default")

	var event models.Event
	json.Unmarshal(events.Ctx.Input.RequestBody, &event)
	beego.Debug(event)

	id, err := o.Insert(&event)
	if err == nil {
		msg := fmt.Sprintf("Event inserted with id: %d", id)
		beego.Debug(msg)
	} else {
		msg := fmt.Sprintf("Couldn't insert new article. Reason: %s", err)
		beego.Debug(msg)
	}

	events.Data["json"] = id
	events.ServeJSON()
}

func (events *EventsController) GetAll() {
	// TODO: move that code to model
	o := orm.NewOrm()
	o.Using("default")

	var eventList []*models.Event
	o.QueryTable("events").OrderBy("-Id").One(&eventList)
	//fmt.Println(eventList)
	events.Data["json"] = eventList
	events.ServeJSON()
}
