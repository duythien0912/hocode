package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	TestInput struct {
		ID bson.ObjectId `json:"id" bson:"_id,omitempty"`
		// TestInputId string        `json:"test_input_id" bson:"test_input_id"`
		Value     string    `json:"value" bson:"value"`
		InputType string    `json:"input_type" bson:"input_type"`
		Timestamp time.Time `json:"timestamp" bson:"timestamp"`
		Del       bool      `json:"del" bson:"del"`
	}
)
