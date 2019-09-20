package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	DetailTask struct {
		ID           bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Description  string        `json:"description" bson:"description"`
		TemplateCode string        `json:"template_code" bson:"template_code"`
		UserCode     string        `json:"user_code" bson:"user_code"`
		PointUnlock  string        `json:"point_unlock" bson:"point_unlock"`
	}
)
