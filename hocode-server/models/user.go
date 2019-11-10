package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	User struct {
		ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Email     string        `json:"email,omitempty" bson:"email"`
		Password  string        `json:"password,omitempty" bson:"password"`
		Token     string        `json:"token,omitempty" bson:"token"`
		FirstName string        `json:"firstname" bson:"firstname"`
		LastName  string        `json:"lastname" bson:"lastname"`
		CodePoint int           `json:"codepoint" bson:"codepoint"`
		Avatar    string        `json:"avatar" bson:"avatar"`
		// Company []company      `json:"company,omitempty" bson:"company,omitempty"`
		Timestamp time.Time `json:"timestamp" bson:"timestamp"`
		Del       bool      `json:"del" bson:"del"`
	}
)
