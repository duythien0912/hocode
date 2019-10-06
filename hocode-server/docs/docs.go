// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag at
// 2019-10-06 12:30:48.265581 +0700 +07 m=+0.083413883

package docs

import (
	"bytes"
	"encoding/json"

	"github.com/alecthomas/template"
	"github.com/swaggo/swag"
)

var doc = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "This is a server Api Hocode.",
        "title": "Hocode API",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "1.0"
    },
    "host": "hocode.appspot.com",
    "basePath": "/api/v1",
    "paths": {
        "/courses": {
            "get": {
                "description": "get courses \u003ca href=\"/api/v1/courses?page=1\u0026limit=5\"\u003e/api/v1/courses?page=1\u0026limit=5\u003c/a\u003e",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Courses"
                ],
                "summary": "List Courses",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Course"
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "Create Course",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Courses"
                ],
                "summary": "Create Course",
                "parameters": [
                    {
                        "description": "Create Course",
                        "name": "course",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.Course"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.Course"
                        }
                    }
                }
            }
        },
        "/courses/{id}": {
            "get": {
                "description": "get courses by ID \u003ca href=\"/courses/5d86e07bfe6e2b157bd3b259\"\u003e/courses/5d86e07bfe6e2b157bd3b259\u003c/a\u003e",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Courses"
                ],
                "summary": "Get Course By ID",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Course ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.Course"
                        }
                    }
                }
            }
        },
        "/courses/{id}/tasks": {
            "get": {
                "description": "Get Task By Courses ID \u003ca href=\"/api/v1/courses/5d86e07bfe6e2b157bd3b259/tasks\"\u003e/api/v1/courses/5d86e07bfe6e2b157bd3b259/tasks\u003c/a\u003e",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Courses"
                ],
                "summary": "Get Task By Courses ID",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Course ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Task"
                            }
                        }
                    }
                }
            }
        },
        "/health_check": {
            "get": {
                "description": "Health Check Server",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Health Check Server",
                "responses": {
                    "200": {
                        "description": "Server Ok",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/minitasks": {
            "get": {
                "description": "get List Minitasks \u003ca href=\"/api/v1/minitasks?page=1\u0026limit=5\"\u003e/api/v1/minitasks?page=1\u0026limit=5\u003c/a\u003e",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Minitasks"
                ],
                "summary": "List Minitasks",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.MiniTask"
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "Create MiniTask",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Minitasks"
                ],
                "summary": "Create Minitast",
                "parameters": [
                    {
                        "description": "Create MiniTask",
                        "name": "task",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.MiniTask"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.MiniTask"
                        }
                    }
                }
            }
        },
        "/minitasks/{id}": {
            "get": {
                "description": "get Minitasks by ID \u003ca href=\"/api/v1/minitasks/5d995ae8fe6e2b0ca40b22fe\"\u003e/api/v1/minitasks/5d995ae8fe6e2b0ca40b22fe\u003c/a\u003e",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Minitasks"
                ],
                "summary": "Get Minitasks By ID",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Minitask ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.MiniTask"
                        }
                    }
                }
            }
        },
        "/tasks": {
            "get": {
                "description": "get tasks \u003ca href=\"/api/v1/tasks?page=1\u0026limit=5\"\u003e/api/v1/tasks?page=1\u0026limit=5\u003c/a\u003e",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Tasks"
                ],
                "summary": "List Task",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.Task"
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "Create Task",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Tasks"
                ],
                "summary": "Create Task",
                "parameters": [
                    {
                        "description": "Create Task",
                        "name": "task",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.Task"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.Task"
                        }
                    }
                }
            }
        },
        "/tasks/{id}": {
            "get": {
                "description": "get task by ID \u003ca href=\"/api/v1/tasks/5d86f268fe6e2b31c0673b02\"\u003e/api/v1/tasks/5d86f268fe6e2b31c0673b02\u003c/a\u003e",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Tasks"
                ],
                "summary": "Get Task By ID",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Task ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.Task"
                        }
                    }
                }
            }
        },
        "/users": {
            "get": {
                "description": "get users",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "List users",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/model.User"
                            }
                        }
                    }
                }
            }
        },
        "/users/{id}": {
            "post": {
                "description": "update accounts by ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Update user",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Account ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Update account",
                        "name": "account",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.User"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.User"
                        }
                    }
                }
            },
            "delete": {
                "description": "delete accounts by ID",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Delete user",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Account ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Ok",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "model.Course": {
            "type": "object",
            "properties": {
                "background_image": {
                    "type": "string"
                },
                "course_name": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "task_solved": {
                    "description": "Name            string     json:\"name\" bson:\"name\"",
                    "type": "object",
                    "$ref": "#/definitions/model.TaskSolved"
                }
            }
        },
        "model.Input": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string"
                },
                "value": {
                    "type": "string"
                }
            }
        },
        "model.MiniTask": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "level": {
                    "type": "string"
                },
                "mini_task_desc": {
                    "type": "string"
                },
                "mini_task_name": {
                    "type": "string"
                },
                "name_func": {
                    "type": "string"
                },
                "point_unlock": {
                    "type": "integer"
                },
                "status": {
                    "type": "string"
                },
                "task_id": {
                    "type": "string"
                },
                "template_code": {
                    "type": "string"
                },
                "unit_tests": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.UnitTest"
                    }
                },
                "vitri": {
                    "type": "boolean"
                }
            }
        },
        "model.Task": {
            "type": "object",
            "properties": {
                "background_image": {
                    "type": "string"
                },
                "course_id": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "minitasks": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.MiniTask"
                    }
                },
                "task_name": {
                    "type": "string"
                }
            }
        },
        "model.TaskSolved": {
            "type": "object",
            "properties": {
                "task_count": {
                    "description": "ID            bson.ObjectId json:\"id\" bson:\"_id,omitempty\"",
                    "type": "integer"
                },
                "tasks_complete": {
                    "type": "integer"
                }
            }
        },
        "model.UnitTest": {
            "type": "object",
            "properties": {
                "expected_output": {
                    "type": "string"
                },
                "inputs": {
                    "description": "ID             bson.ObjectId json:\"id\" bson:\"_id,omitempty\"",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.Input"
                    }
                }
            }
        },
        "model.User": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "token": {
                    "type": "string"
                }
            }
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Schemes     []string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = swaggerInfo{ Schemes: []string{}}

type s struct{}

func (s *s) ReadDoc() string {
	t, err := template.New("swagger_info").Funcs(template.FuncMap{
		"marshal": func(v interface {}) string {
			a, _ := json.Marshal(v)
			return string(a)
		},
	}).Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, SwaggerInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register(swag.Name, &s{})
}
