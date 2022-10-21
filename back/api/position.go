package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"singo/model"
	"singo/serializer"
)

type NewPositionReq struct {
	PositionName string `json:"position_name"`
	CompanyId    int64  `json:"company_id"`
	JD           string `json:"jd"`
}

func NewPosition(c *gin.Context) {
	var req NewPositionReq
	if err := c.ShouldBind(&req); err == nil {
		var positionInfo model.Position
		positionInfo = model.Position{
			PositionName: req.PositionName,
			CompanyId:    req.CompanyId,
			JD:           req.JD,
		}
		model.DB.Create(&positionInfo)
		c.JSON(http.StatusOK, serializer.Response{Data: "成功"})
		return
	} else {
		c.JSON(http.StatusOK, ErrorResponse(err))
		return
	}
}

func DelPosition(c *gin.Context) {
	positionId := c.Query("position_id")
	model.DB.Delete(&model.Position{}, positionId)
	c.JSON(http.StatusOK, serializer.Response{Data: "成功"})
	return
}

func CheckPosition(c *gin.Context) {
	id := c.Query("position_id")
	var target model.Position
	model.DB.First(&target, id)
	c.JSON(http.StatusOK, serializer.Response{Data: target})
	return
}

func AllPosition(c *gin.Context) {
	var positions []model.Position
	_ = model.DB.Find(&positions)
	c.JSON(http.StatusOK, serializer.Response{Data: positions})
}
