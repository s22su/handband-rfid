package controllers

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	models "handband-rfid/models"
)

type LogController struct {
	beego.Controller
}

// helper to deal with time
// http://stackoverflow.com/questions/20924303/date-time-comparison-in-golang
func inTimeSpan(start, end, check time.Time) bool {
	return check.After(start) && check.Before(end)
}

func (this *LogController) FindRfid() {
	beego.Debug("FindRfid called")
	o := orm.NewOrm()
	o.Using("default")

	//var formValues models.Log
	formValues := models.Log{}
	json.Unmarshal(this.Ctx.Input.RequestBody, &formValues)

	beego.Debug(formValues.Rfid)

	log, err := models.GetRfidTaken(formValues.Rfid, formValues.EventId)

	beego.Debug(formValues)
	beego.Debug(log)

	if err == orm.ErrNoRows {
		this.Data["json"] = map[string]string{"not-found": "true"}
	} else if err != nil {
		this.Data["json"] = map[string]string{"error": err.Error()}
	} else if log.TimeGiven.After(log.TimeTaken) {
		this.Data["json"] = map[string]string{"not-found": "true"}
	} else {
		this.Data["json"] = log
	}
	this.ServeJSON()
}

func (this *LogController) Add() {
	o := orm.NewOrm()
	o.Using("default")

	formValues := models.Log{}

	json.Unmarshal(this.Ctx.Input.RequestBody, &formValues)

	beego.Debug("check cell nr", formValues.Cell)
	foundRows := models.GetLogByCell(formValues.Cell)
	beego.Debug("Rows found: ", foundRows)

	if foundRows != 0 {
		this.Data["json"] = map[string]string{"error": "cell"}
	} else {
		id, err := models.AddLog(&formValues)
		if err != nil {
			this.Data["json"] = map[string]string{"error": err.Error()}
		} else {
			this.Data["json"] = map[string]int64{"ok": id}
		}
	}

	this.ServeJSON()
}

// Give it back
func (this *LogController) Give() {
	o := orm.NewOrm()
	o.Using("default")

	formValues := models.Log{}
	json.Unmarshal(this.Ctx.Input.RequestBody, &formValues)

	beego.Debug(formValues)
	beego.Debug(this.Ctx.Input.RequestBody)
	// TODO: move to model
	tmpLog := models.Log{Id: formValues.Id}

	beego.Debug(&tmpLog)
	beego.Debug(formValues.Id)

	if o.Read(&tmpLog) == nil {
		tmpLog.TimeGiven = time.Now()
		if num, err := o.Update(&tmpLog); err == nil {
			this.Data["json"] = map[string]int64{"ok": num}
		} else {
			this.Data["json"] = map[string]string{"error": err.Error()}
		}
	} else {
		this.Data["json"] = map[string]string{"error": "not-found"}
	}
	this.ServeJSON()
}

func (events *EventsController) Delete() {
	o := orm.NewOrm()
	o.Using("default")

	logItem := models.Log{}
	json.Unmarshal(events.Ctx.Input.RequestBody, &logItem)
	msg := fmt.Sprintf("Trying to delete: %d", logItem.Id)
	beego.Debug(msg)

	if exist := o.QueryTable("log").Filter("id", logItem.Id).Exist(); exist {
		if num, err := o.Delete(&logItem); err == nil {
			beego.Info("Record Deleted. ", num)
		} else {
			beego.Error("Record couldn't be deleted. Reason: ", err)
		}
	} else {
		beego.Info("Record Doesn't exist.")
	}

	events.Data["json"] = "ok"
	events.ServeJSON()
}

func (this *LogController) GetAll() {
	// TODO: move that code to model
	o := orm.NewOrm()
	var log []*models.Log
	o.QueryTable("log").OrderBy("-Id").One(&log)
	this.Data["json"] = log
	this.ServeJSON()
}
