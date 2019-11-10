package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Company struct {
		ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Name      string        `json:"name" bson:"name"`
		Password  string        `json:"password" bson:"password"`
		Timestamp time.Time     `json:"timestamp" bson:"timestamp"`
		Del       bool          `json:"del" bson:"del"`
	}
)
