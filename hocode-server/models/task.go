package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	Task struct {
		ID              bson.ObjectId `json:"id" bson:"_id,omitempty"`
		TaskName        string        `json:"task_name" bson:"task_name"`
		BackgroundImage string        `json:"background_image" bson:"background_image"`
	}
)
