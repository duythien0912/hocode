package model

import (
	"time"
)

type (
	Code struct {
		Code      string    `json:"code" bson:"code"`
		Lang      string    `json:"lang" bson:"lang"`
		Timestamp time.Time `json:"timestamp" bson:"timestamp"`
	}
)
