package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	MiniTask struct {
		ID             bson.ObjectId `json:"id" bson:"_id,omitempty"`
		MiniTaskName   string        `json:"mini_task_name" bson:"mini_task_name"`
		PointUnlock    int           `json:"point_unlock" bson:"point_unlock"`
		Status         string        `json:"status" bson:"status"`
		Vitri          bool          `json:"vitri" bson:"vitri"`
		NameFunc       string        `json:"name_func" bson:"name_func"`
		OutputTypeFunc string        `json:"output_type_func" bson:"output_type_func"`

		MinitaskDesc string      `json:"mini_task_desc" bson:"mini_task_desc"`
		Level        string      `json:"level" bson:"level"`
		TemplateCode string      `json:"template_code" bson:"template_code"`
		UnitTests    []*UnitTest `json:"unit_tests" bson:"unit_tests"`

		TaskId string `json:"task_id" bson:"task_id"`
	}
)

type (
	UnitTest struct {
		// ID             bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Inputs         []*Input `json:"inputs" bson:"inputs"`
		ExpectedOutput string   `json:"expected_output" bson:"expected_output"`
	}
)

type (
	Input struct {
		Value string `json:"value" bson:"value"`
		Type  string `json:"type" bson:"type"`
	}
)
