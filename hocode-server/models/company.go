package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	Company struct {
		ID       bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Name     string        `json:"name" bson:"name"`
		Password string        `json:"password" bson:"password"`
	}
)
