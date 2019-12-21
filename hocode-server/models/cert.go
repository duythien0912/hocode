package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Cert struct {
		ID        bson.ObjectId `json:"id" bson:"_id"`
		UserID    string        `json:"user_id" bson:"user_id"`
		CodePoint int           `json:"codepoint" bson:"codepoint"`
		SearchID  string        `json:"search_id" bson:"search_id"`
		ConfigID  string        `json:"config_id" bson:"config_id"`
		Status    string        `json:"status" bson:"status"`
		Agree     bool          `json:"agree" bson:"agree"`
		// ElectronicSignature string        `json:"electronic_signature" bson:"electronic_signature"`
		Timestamp time.Time `json:"timestamp" bson:"timestamp"`
		Del       bool      `json:"del" bson:"del"`
	}
)

type (
	ReviewCertOut struct {
		User   *User   `json:"user" bson:"user"`
		Config *Config `json:"config" bson:"config"`
		Cert   *Cert   `json:"cert" bson:"cert"`
	}
)
