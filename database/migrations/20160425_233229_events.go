package main

import (
	"github.com/astaxie/beego/migration"
)

// DO NOT MODIFY
type Events_20160425_233229 struct {
	migration.Migration
}

// DO NOT MODIFY
func init() {
	m := &Events_20160425_233229{}
	m.Created = "20160425_233229"
	migration.Register("Events_20160425_233229", m)
}

// Run the migrations
func (m *Events_20160425_233229) Up() {
	// use m.SQL("CREATE TABLE ...") to make schema update
	m.SQL("CREATE TABLE events(`id` int(11) NOT NULL AUTO_INCREMENT,`name` varchar(128) NOT NULL,`holes_x` int(11) DEFAULT NULL,`holes_y` int(11) DEFAULT NULL,PRIMARY KEY (`id`))")
}

// Reverse the migrations
func (m *Events_20160425_233229) Down() {
	// use m.SQL("DROP TABLE ...") to reverse schema update
	m.SQL("DROP TABLE `events`")
}
