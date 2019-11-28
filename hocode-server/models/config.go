package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Config struct {
		ID                  bson.ObjectId `json:"id" bson:"_id"`
		Name                string        `json:"name" bson:"name"`
		ReviewPoint         int           `json:"review_point" bson:"review_point"`
		ElectronicSignature string        `json:"electronic_signature" bson:"electronic_signature"`
		NameSite            string        `json:"name_site" bson:"name_site"`
		Timestamp           time.Time     `json:"timestamp" bson:"timestamp"`
		Del                 bool          `json:"del" bson:"del"`
	}
)
