package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Course struct {
		ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
		CourseName string        `json:"course_name" bson:"course_name"`
		// Name            string     `json:"name" bson:"name"`
		TaskSolved      TaskSolved `json:"task_solved" bson:"task_solved"`
		BackgroundImage string     `json:"background_image" bson:"background_image"`
		Tasks           []*Task    `json:"tasks" bson:"tasks"`
		Timestamp       time.Time  `json:"timestamp" bson:"timestamp"`
		Del             bool       `json:"del" bson:"del"`
	}
)
type (
	TaskSolved struct {
		// ID            bson.ObjectId `json:"id" bson:"_id,omitempty"`
		TaskCount     int       `json:"task_count" bson:"task_count"`
		TasksComplete int       `json:"tasks_complete" bson:"tasks_complete"`
		Timestamp     time.Time `json:"timestamp" bson:"timestamp"`
	}
)
