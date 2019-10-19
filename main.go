package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/mattn/go-sqlite3"
	"handband-rfid/models"
	_ "handband-rfid/routers"
)

func init() {
	orm.RegisterDriver("sqlite", orm.DRSqlite)
	//orm.RegisterDataBase(aliasName, driverName, dataSource, params)
	orm.RegisterDataBase("default", "sqlite3", "./database/handband.db")
	orm.RegisterModel(new(models.Event))
	orm.RegisterModel(new(models.Log))
}

func main() {
	beego.Run()
}
