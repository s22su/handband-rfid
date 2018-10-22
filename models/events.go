package models

// Event type
type Event struct {
	Id       int    `form:"-"`
	Filename string `form:"filename,text,filename:" valid:"MinSize(5);MaxSize(20)"`
	N        string `form:"n,integer,n:"`
	M        string `form:"n,integer,n:"`
}

// TableName .
func (a *Event) TableName() string {
	return "events"
}
