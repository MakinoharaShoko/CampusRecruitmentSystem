package service

// // Login 用户登录函数
// func (service *UserLoginService) IntervieweeLogin(c *gin.Context) serializer.Response {
// 	var user model.Interviewee

// 	if err := model.DB.Where("user_name = ?", service.UserName).First(&user).Error; err != nil {
// 		return serializer.ParamErr("账号或密码错误", nil)
// 	}

// 	if user.UserInfo.CheckPassword(service.Password) == false {
// 		return serializer.ParamErr("账号或密码错误", nil)
// 	}

// 	// 设置session
// 	service.setSession(c, user.UserInfo)

// 	return serializer.BuildIntervieweeResponse(user)
// }
