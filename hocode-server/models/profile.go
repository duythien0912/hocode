package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Profile struct {
		ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Name      string        `json:"name" bson:"name"`
		Avatar    string        `json:"avatar" bson:"avatar"`
		Timestamp time.Time     `json:"timestamp" bson:"timestamp"`
	}
)
