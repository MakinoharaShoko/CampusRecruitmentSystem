package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"singo/model"
	"singo/serializer"
)

// // IntervieweeRegister 用户注册接口
// func IntervieweeIntervieweeRegister(c *gin.Context) {
// 	var service service.UserRegisterService
// 	if err := c.ShouldBind(&service); err == nil {
// 		res := service.Register()
// 		c.JSON(200, res)
// 	} else {
// 		c.JSON(200, ErrorResponse(err))
// 	}
// }

// // IntervieweeLogin 用户登录接口
// func IntervieweeLogin(c *gin.Context) {
// 	var service service.UserLoginService
// 	if err := c.ShouldBind(&service); err == nil {
// 		res := service.IntervieweeLogin(c)
// 		c.JSON(200, res)
// 	} else {
// 		c.JSON(200, ErrorResponse(err))
// 	}
// }

// // IntervieweeMe 用户详情
// func IntervieweeMe(c *gin.Context) {
// 	user := CurrentInterviewee(c)
// 	res := serializer.BuildIntervieweeResponse(*user)
// 	c.JSON(200, res)
// }

// // IntervieweeLogout 用户登出
// func IntervieweeLogout(c *gin.Context) {
// 	s := sessions.Default(c)
// 	s.Clear()
// 	s.Save()
// 	c.JSON(200, serializer.Response{
// 		Code: 0,
// 		Msg:  "登出成功",
// 	})
// }

type IntervieweeSetMeReq struct {
	Id           int64  `json:"id"`
	Institution  string `json:"institution"`
	Background   string `json:"background"`
	GraduationAt int32  `json:"graduation_at"`
}

type IntervieweeMeResp struct {
	Institution  string `json:"institution"`
	Background   string `json:"background"`
	GraduationAt int32  `json:"graduation_at"`
	Resume       string `json:"resume"`
}

// IntervieweeMe 用户详情
func IntervieweeMe(c *gin.Context) {
	IntervieweeId := c.Query("interviewee_id")
	var intervieweeInfo model.User
	if err := model.DB.Where("id = ?", IntervieweeId).Find(&intervieweeInfo).Error; err != nil {
		c.JSON(http.StatusNotFound, serializer.ParamErr("未能查找到用户信息", err))
	} else {
		c.JSON(http.StatusOK, serializer.Response{
			Data: IntervieweeMeResp{
				Institution:  intervieweeInfo.Institution,
				Background:   intervieweeInfo.Background,
				GraduationAt: intervieweeInfo.GraduationAt,
				Resume:       intervieweeInfo.Resume,
			},
		})
	}
}

func IntervieweeSetMe(c *gin.Context) {
	var info IntervieweeSetMeReq
	if err := c.ShouldBind(&info); err == nil {
		var interviewee model.User
		interviewee = model.User{
			ID:           info.Id,
			Institution:  info.Institution,
			Background:   info.Background,
			GraduationAt: info.GraduationAt,
		}
		//model.DB.Save(&interviewee)
		model.DB.Where("id = ?", info.Id).Updates(interviewee)
		c.JSON(http.StatusOK, serializer.Response{Data: "更新成功"})
		return
	} else {
		c.JSON(200, ErrorResponse(err))
		return
	}
}
