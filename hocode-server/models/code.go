package model

type (
	Code struct {
		Code string `json:"code" bson:"code"`
		Lang string `json:"lang" bson:"lang"`
	}
)
