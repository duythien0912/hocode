package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	model "github.com/duythien0912/hocode/models"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// GetUserCourse godoc
// @Summary List GetUserCourse
// @Description get GetUserCourse
// @Tags UserCourse
// @Accept  json
// @Produce  json
// @Success 200 {object} model.UserCourse
// @Router /auth/usercourse [get]
func (h *Handler) GetUserCourse(c echo.Context) (err error) {

	uc := &model.UserCourse{}

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	ID := claims["id"].(string)

	db := h.DB.Clone()
	defer db.Close()

	if err = db.DB("hocode").C("user_course").
		Find(bson.M{"user_id": ID}).
		One(&uc); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	return c.JSON(http.StatusOK, uc)

}

// UpdateUserCourse godoc
// @Summary UpdateUserCourse
// @Description UpdateUserCourse
// @Tags UserCourse
// @Accept  json
// @Produce  json
// @Param  course body model.BodyUC true "UpdateUserCourse"
// @Success 200 {object} model.UserCourseOut
// @Router /auth/updateusercourse [post]
func (h *Handler) UpdateUserCourse(c echo.Context) (err error) {

	uc := &model.UserCourse{}

	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["id"].(string)

	bodyUC := &model.BodyUC{}

	if err = c.Bind(bodyUC); err != nil {
		return
	}

	// courseID := c.Param("course_id")
	// miniTaskID := c.Param("minitask_id")

	// Validation
	if bodyUC.TaskID == "" || bodyUC.MiniTaskID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid task_id or minitask_id fields"}
	}

	if userID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid jwt"}
	}

	db := h.DB.Clone()
	defer db.Close()

	tf := &model.Task{}

	if err = db.DB("hocode").C("tasks").
		FindId(bson.ObjectIdHex(bodyUC.TaskID)).
		// Find(bson.M{}).
		// Select(bson.M{"id": id}).
		One(&tf); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	bodyUC.CourseID = tf.CourseId

	uc.UserID = userID

	isInDB := true
	// Find old db user_course
	if err = db.DB("hocode").C("user_course").
		Find(bson.M{"user_id": userID}).
		One(&uc); err != nil {
		// if err == mgo.ErrNotFound {
		// 	uc.CourseInfo = []CourseInfo
		// }
		isInDB = false
		// return
	}
	ucLocationC := -1

	if len(uc.CourseInfo) != 0 {
		for i := 0; i < len(uc.CourseInfo); i++ {
			if uc.CourseInfo[i].CourseID == bodyUC.CourseID {
				ucLocationC = i
			}
		}
	}

	// get title from course
	course := &model.Course{}

	if err = db.DB("hocode").C("course").
		FindId(bson.ObjectIdHex(bodyUC.CourseID)).
		One(&course); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	taskf := &model.Task{}

	if err = db.DB("hocode").C("tasks").
		Find(bson.M{"course_id": bodyUC.CourseID}).
		One(&taskf); err != nil {
		if err == mgo.ErrNotFound {
			return echo.ErrNotFound
		}

		return
	}

	if ucLocationC != -1 {

		uc.CourseInfo[ucLocationC].CourseName = course.CourseName
		uc.CourseInfo[ucLocationC].BackgroundImage = course.BackgroundImage
		uc.CourseInfo[ucLocationC].TotalTasksCount = len(taskf.Minitasks)
		completedTasksCount := uc.CourseInfo[ucLocationC].CompletedTasksCount + 1
		if uc.CourseInfo[ucLocationC].TotalTasksCount <= completedTasksCount {
			uc.CourseInfo[ucLocationC].ToDoTasksCount = 0
			uc.CourseInfo[ucLocationC].CompletedTasksCount = uc.CourseInfo[ucLocationC].TotalTasksCount
			uc.CourseInfo[ucLocationC].PassCourse = true
		} else {
			uc.CourseInfo[ucLocationC].ToDoTasksCount = uc.CourseInfo[ucLocationC].TotalTasksCount - completedTasksCount
			uc.CourseInfo[ucLocationC].CompletedTasksCount = completedTasksCount
			uc.CourseInfo[ucLocationC].PassCourse = false
		}

	} else {
		courseInfo := model.CourseInfo{}

		courseInfo.CourseID = bodyUC.CourseID
		courseInfo.CourseName = course.CourseName
		courseInfo.BackgroundImage = course.BackgroundImage
		courseInfo.TotalTasksCount = len(taskf.Minitasks)
		courseInfo.CompletedTasksCount += 1
		completedTasksCount := courseInfo.CompletedTasksCount
		if courseInfo.TotalTasksCount <= completedTasksCount {
			courseInfo.ToDoTasksCount = 0
			courseInfo.CompletedTasksCount = courseInfo.TotalTasksCount
			courseInfo.PassCourse = true

		} else {
			courseInfo.ToDoTasksCount = courseInfo.TotalTasksCount - completedTasksCount
			courseInfo.CompletedTasksCount = completedTasksCount
			courseInfo.PassCourse = false
		}

		uc.CourseInfo = append(uc.CourseInfo, courseInfo)
		// uc.CourseInfo.add(courseInfo)
	}

	fmt.Println("[isInDB]")
	fmt.Println(isInDB)
	fmt.Println(uc)

	if isInDB {

		uc.Timestamp = time.Now()

		if err = db.DB("hocode").
			C("user_course").
			Update(bson.M{"user_id": uc.UserID}, uc); err != nil {
			if err == mgo.ErrNotFound {
				return echo.ErrInternalServerError
			}

			return
		}

	} else {
		uc.ID = bson.NewObjectId()
		// Save in database
		uc.Timestamp = time.Now()
		if err = db.DB("hocode").C("user_course").Insert(uc); err != nil {
			fmt.Println("[err]")
			fmt.Println(err)
			return echo.ErrInternalServerError
		}

	}

	userMiniTask := &model.UserMiniTask{}

	userMiniTask.UserID = userID

	isInDBUserMiniTask := true

	if err = db.DB("hocode").C("user_minitask").
		Find(bson.M{
			"user_id": userID,
		}).
		One(&userMiniTask); err != nil {
		// if err == mgo.ErrNotFound {
		// 	uc.CourseInfo = []CourseInfo
		// }
		isInDBUserMiniTask = false
		// return
	}
	uMiniTaskLocationC := -1

	if len(userMiniTask.MiniTaskInfo) != 0 {
		for i := 0; i < len(userMiniTask.MiniTaskInfo); i++ {
			if userMiniTask.MiniTaskInfo[i].MiniTaskID == bodyUC.MiniTaskID {
				uMiniTaskLocationC = i
			}
		}
	}

	if uMiniTaskLocationC != -1 {
		userMiniTask.MiniTaskInfo[uMiniTaskLocationC].Status = "hoanthanh"
		userMiniTask.MiniTaskInfo[uMiniTaskLocationC].MiniTaskID = bodyUC.MiniTaskID
	} else {
		miniTaskIn := model.MiniTaskInfo{}
		miniTaskIn.Status = "hoanthanh"
		miniTaskIn.MiniTaskID = bodyUC.MiniTaskID

		userMiniTask.MiniTaskInfo = append(userMiniTask.MiniTaskInfo, miniTaskIn)

	}

	userMiniTask.Timestamp = time.Now()

	if isInDBUserMiniTask {
		if err = db.DB("hocode").
			C("user_minitask").
			Update(bson.M{"user_id": userMiniTask.UserID}, userMiniTask); err != nil {
			if err == mgo.ErrNotFound {
				return echo.ErrInternalServerError
			}

			return
		}
	} else {
		userMiniTask.ID = bson.NewObjectId()
		if err = db.DB("hocode").C("user_minitask").Insert(userMiniTask); err != nil {
			fmt.Println("[err]")
			fmt.Println(err)
			return echo.ErrInternalServerError
		}
	}

	nextMiniTask := &model.MiniTask{}

	nextMiniTask.Timestamp = time.Now()
	if err = db.DB("hocode").C("minitasks").
		Find(
			bson.M{
				"_id": bson.M{
					"$gt": bson.ObjectIdHex(bodyUC.MiniTaskID),
				},
			},
		).
		Select(bson.M{"_id": 1}).
		Limit(1).
		One(&nextMiniTask); err != nil {
	}

	userCourseOut := &model.UserCourseOut{
		UserCourse:   uc,
		UserMiniTask: userMiniTask,
		NextMiniTask: nextMiniTask,
	}

	// db.getCollection("minitasks").find({_id: {$gt: ObjectId("5d9b6ff5fe6e2b038fe5a409") }}).limit(1)

	return c.JSON(http.StatusOK, userCourseOut)

}

func (h *Handler) NextMiniTask(c echo.Context) (err error) {

	bodyUC := &model.BodyUC{}

	if err = c.Bind(bodyUC); err != nil {
		return
	}

	// Validation
	if bodyUC.MiniTaskID == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid minitask_id fields"}
	}

	nextMiniTask := &model.MiniTask{}

	db := h.DB.Clone()
	defer db.Close()

	nextMiniTask.Timestamp = time.Now()
	if err = db.DB("hocode").C("minitasks").
		Find(
			bson.M{
				"_id": bson.M{
					"$gt": bson.ObjectIdHex(bodyUC.MiniTaskID),
				},
			},
		).
		Sort("-timestamp").
		Select(bson.M{"_id": 1, "mini_task_name": 1}).
		Limit(1).
		One(&nextMiniTask); err != nil {
	}

	return c.JSON(http.StatusOK, nextMiniTask)

}
