package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	MiniTask struct {
		ID             bson.ObjectId `json:"id" bson:"_id,omitempty"`
		MiniTaskName   string        `json:"mini_task_name" bson:"mini_task_name"`
		PointUnlock    int           `json:"point_unlock" bson:"point_unlock"`
		CodePoint      int           `json:"code_point" bson:"code_point"`
		Status         string        `json:"status" bson:"status"`
		Vitri          bool          `json:"vitri" bson:"vitri"`
		NameFunc       string        `json:"name_func" bson:"name_func"`
		OutputTypeFunc string        `json:"output_type_func" bson:"output_type_func"`

		MinitaskDesc string      `json:"mini_task_desc" bson:"mini_task_desc"`
		Level        string      `json:"level" bson:"level"`
		Avatar       string      `json:"avatar" bson:"avatar"`
		TemplateCode string      `json:"template_code" bson:"template_code"`
		UnitTests    []UnitTest `json:"unit_tests" bson:"unit_tests"`
		// input_list:[{input_name:"param1",input_type:"int"}]

		InputList []InputList `json:"input_list" bson:"input_list"`

		TaskId    string    `json:"task_id" bson:"task_id"`
		Timestamp time.Time `json:"timestamp" bson:"timestamp"`
		Del       bool      `json:"del" bson:"del"`
	}
)

type (
	InputList struct {
		// ID             bson.ObjectId `json:"id" bson:"_id,omitempty"`
		InputName string `json:"input_name" bson:"input_name"`
		InputType string `json:"input_type" bson:"input_type"`
	}
)

type (
	UnitTest struct {
		// ID             bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Inputs         []Input `json:"inputs" bson:"inputs"`
		ExpectedOutput string   `json:"expected_output" bson:"expected_output"`
	}
)

type (
	Input struct {
		Value string `json:"value" bson:"value"`
		Type  string `json:"type" bson:"type"`
	}
)
