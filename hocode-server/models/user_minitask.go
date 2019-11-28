package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	UserMiniTask struct {
		ID           bson.ObjectId   `json:"id" bson:"_id"`
		UserID       string          `json:"user_id" bson:"user_id"`
		MiniTaskInfo []*MiniTaskInfo `json:"course_info" bson:"course_info"`
		Timestamp    time.Time       `json:"timestamp" bson:"timestamp"`
		Del          bool            `json:"del" bson:"del"`
	}
)

type (
	MiniTaskInfo struct {
		MiniTaskID string `json:"minitask_id" bson:"minitask_id"`
		Status     string `json:"status" bson:"status"`
	}
)
