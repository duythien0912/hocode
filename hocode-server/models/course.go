package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	Course struct {
		ID              bson.ObjectId `json:"id" bson:"_id,omitempty"`
		CourseName      string        `json:"course_name" bson:"course_name"`
		TaskSolved      string        `json:"task_solved" bson:"task_solved"`
		BackgroundImage string        `json:"background_image" bson:"background_image"`
	}
)
