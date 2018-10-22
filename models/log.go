package models

import (
	"fmt"
	"strconv"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type Log struct {
	Id        int64     `orm:"auto"`
	Rfid      string    `orm:"size(128)"`
	Cell      int64     `json:",string"`
	EventId   int64     `json:",string"`
	TimeGiven time.Time `orm:"null"`
	TimeTaken time.Time `orm:"auto_now_add;type(datetime)"`
}

// AddLog insert a new Log into database and returns
// last inserted Id on success.
func AddLog(m *Log) (id int64, err error) {
	o := orm.NewOrm()
	id, err = o.Insert(m)
	return
}

// GetLogByCell Get row id in case cell is not empty
func GetLogByCell(cellNr int64) (count int64) {
	beego.Debug("chck cell", cellNr)
	o := orm.NewOrm()

	var logRows []*Log

	l := new(Log)
	qs := o.QueryTable(l).Filter("cell", strconv.FormatInt(cellNr, 10)).Filter("time_given__isnull", true)

	c, err := qs.All(&logRows)
	beego.Debug(logRows)

	for k := range logRows {
		beego.Debug(logRows[k])
	}

	if err == nil {
		return c
	}
	return 0
}

// GetLogById retrieves Log by Id. Returns error if
// Id doesn't exist
func GetLogById(id int64) (v *Log, err error) {
	o := orm.NewOrm()
	v = &Log{Id: id}
	if err = o.Read(v); err == nil {
		return v, nil
	}
	return nil, err
}

// GetRfidTaken
func GetRfidTaken(rfid string, event_id int64) (v *Log, err error) {
	o := orm.NewOrm()
	v = &Log{Rfid: rfid, EventId: event_id}
	if err = o.QueryTable("log").OrderBy("-Id").Filter("rfid__exact", v.Rfid).Limit(1).One(v); err == nil {
		return v, nil
	}
	return nil, err
}

// UpdateLog updates Log by Id and returns error if
// the record to be updated doesn't exist
func UpdateLogById(m *Log) (err error) {
	o := orm.NewOrm()
	v := Log{Id: m.Id}
	// ascertain id exists in the database
	if err = o.Read(&v); err == nil {
		var num int64
		if num, err = o.Update(m); err == nil {
			fmt.Println("Number of records updated in database:", num)
		}
	}
	return
}

// DeleteLog deletes Log by Id and returns error if
// the record to be deleted doesn't exist
func DeleteLog(id int64) (err error) {
	o := orm.NewOrm()
	v := Log{Id: id}
	// ascertain id exists in the database
	if err = o.Read(&v); err == nil {
		var num int64
		if num, err = o.Delete(&Log{Id: id}); err == nil {
			fmt.Println("Number of records deleted in database:", num)
		}
	}
	return
}
