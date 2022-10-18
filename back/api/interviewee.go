package api

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
