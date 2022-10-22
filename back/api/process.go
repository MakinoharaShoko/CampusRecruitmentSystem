package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"singo/model"
	"singo/serializer"
)

type NewProcessReq struct {
	IntervieweeId int64 `json:"interviewee_id"`
	PositionId    int64 `json:"position_id"`
	CompanyId     int64 `json:"company_id"`
}

type ChangeProcessReq struct {
	IntervieweeId int64 `json:"interviewee_id"`
	PositionId    int64 `json:"position_id"`
	CompanyId     int64 `json:"company_id"`
	Status        int32 `json:"status"`
}

func NewProcess(c *gin.Context) {
	var req NewProcessReq
	if err := c.ShouldBind(&req); err == nil {
		var processInfo model.Process
		processInfo = model.Process{
			IntervieweeId: req.IntervieweeId,
			PositionId:    req.PositionId,
			CompanyId:     req.CompanyId,
			Status:        1,
		}
		model.DB.Create(&processInfo)
		c.JSON(http.StatusOK, serializer.Response{Data: "成功"})
		return
	} else {
		c.JSON(http.StatusOK, ErrorResponse(err))
		return
	}
}

func CheckProcess(c *gin.Context) {
	id := c.Query("process_id")
	var target model.Process
	model.DB.First(&target, id)
	c.JSON(http.StatusOK, serializer.Response{Data: target})
	return
}

func ChangeProcess(c *gin.Context) {
	var req ChangeProcessReq
	if err := c.ShouldBind(&req); err == nil {
		model.DB.Model(&model.Process{}).Where("interviewee_id = ? and position_id = ? and company_id = ?", req.IntervieweeId, req.PositionId, req.CompanyId).Update("status", req.Status)
		c.JSON(http.StatusOK, serializer.Response{Data: "修改完毕"})
		return
	} else {
		c.JSON(http.StatusOK, ErrorResponse(err))
		return
	}
}

func AllProcessCompany(c *gin.Context) {
	id := c.Query("company_id")
	var allProcess []model.Process
	_ = model.DB.Where("company_id = ?", id).Find(&allProcess)
	c.JSON(http.StatusOK, serializer.Response{Data: allProcess})
}

func AllProcessUser(c *gin.Context) {
	id := c.Query("uid")
	var allProcess []model.Process
	_ = model.DB.Where("interviewee_id = ?", id).Find(&allProcess)
	c.JSON(http.StatusOK, serializer.Response{Data: allProcess})
}
