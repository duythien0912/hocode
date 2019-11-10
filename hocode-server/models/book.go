package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Book struct {
		ID        bson.ObjectId `json:"id" bson:"_id"`
		Title     string        `json:"title" bson:"title"`
		Image     string        `json:"image" bson:"image"`
		Content   string        `json:"content" bson:"content"`
		Timestamp time.Time     `json:"timestamp" bson:"timestamp"`
		Del       bool          `json:"del" bson:"del"`
	}
)
