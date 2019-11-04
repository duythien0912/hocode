package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	UserCourse struct {
		ID         bson.ObjectId `json:"id" bson:"_id"`
		UserID     string        `json:"user_id" bson:"user_id"`
		CourseInfo []CourseInfo  `json:"course_info" bson:"course_info"`
	}
)

type (
	CourseInfo struct {
		CourseID            string `json:"course_id" bson:"_id"`
		CourseName          string `json:"course_name" bson:"course_name"`
		CompletedTasksCount int    `json:"completed_tasks_count" bson:"CompletedTasksCount"`
		ToDoTasksCount      int    `json:"todo_tasks_count" bson:"ToDoTasksCount"`
		TotalTasksCount     int    `json:"total_tasks_count" bson:"TotalTasksCount"`
		PassCourse          bool   `json:"pass_course" bson:"PassCourse"`
		BackgroundImage     string `json:"background_image" bson:"background_image"`
	}
)

type (
	BodyUC struct {
		CourseID   string `json:"course_id" bson:"course_id"`
		MiniTaskID string `json:"minitask_id" bson:"minitask_id"`
	}
)
