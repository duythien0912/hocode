package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	MiniTask struct {
		ID           bson.ObjectId `json:"id" bson:"_id,omitempty"`
		MiniTaskName string        `json:"mini_task_name" bson:"mini_task_name"`
		PointUnlock  string        `json:"point_unlock" bson:"point_unlock"`
		Status       string        `json:"status" bson:"status"`
	}
)
