package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	Test struct {
		ID         bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Output     string        `json:"output" bson:"output"`
		OutputType string        `json:"output_type" bson:"output_type"`
		// TestInputId string        `json:"test_input_id" bson:"test_input_id"`
	}
)