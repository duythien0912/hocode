package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Event struct {
		ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Title     string        `json:"title" bson:"title"`
		Image     string        `json:"image" bson:"image"`
		Content   string        `json:"content" bson:"content"`
		Link      string        `json:"link" bson:"link"`
		Timestamp time.Time     `json:"timestamp" bson:"timestamp"`
		Del       bool          `json:"del" bson:"del"`
	}
)
