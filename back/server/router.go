package server

import (
	"os"
	"singo/api"
	"singo/middleware"

	"github.com/gin-gonic/gin"
)

// NewRouter 路由配置
func NewRouter() *gin.Engine {
	r := gin.Default()

	// 中间件, 顺序不能改
	r.Use(middleware.Session(os.Getenv("SESSION_SECRET")))
	r.Use(middleware.Cors())
	r.Use(middleware.CurrentUser())

	// 路由
	v1 := r.Group("/api/v1")
	{
		v1.POST("ping", api.Ping)

		// 用户注册
		v1.POST("user/register", api.UserRegister)

		// 用户登录
		v1.POST("user/login", api.UserLogin)

		// interviewee 相关接口
		// 获取应聘者基本信息
		v1.GET("interviewee/me")
		// 查看招聘详细信息
		v1.GET("interviewee/check")

		// hr 相关接口
		// 获取hr基本信息
		v1.GET("hr/me")

		// 公司 接口
		// 查看公司基本信息
		v1.GET("company/me")

		// 需要登录保护的
		auth := v1.Group("")
		auth.Use(middleware.AuthRequired())
		{
			// User Routing
			auth.GET("user/me", api.UserMe)
			auth.DELETE("user/logout", api.UserLogout)
			// 发起聊天
			auth.POST("user/talkwith")

			// interviewee 接口
			// 设置个人应聘信息
			auth.POST("interviewee/setme")
			// 投递个人简历
			auth.POST("interviewee/post_resume")

			// hr 接口
			// 设置个人简介
			auth.POST("hr/setme")
			// 发布招聘信息
			auth.POST("hr/publish")
			// 查看已收到的简历
			auth.GET("hr/get_resume")
			// 接收简历
			auth.PUT("hr/occupy")
			// 拒绝简历
			auth.PUT("hr/deny")
		}
	}
	// // 求职用户
	// interviewee := v1.Group("/interviewee")
	// {
	// 	interviewee.POST("ping", api.Ping)

	// 	// 用户登录
	// 	interviewee.POST("user/register", api.UserRegister)

	// 	// 用户登录
	// 	interviewee.POST("user/login", api.UserLogin)

	// 	// 需要登录保护的
	// 	auth := interviewee.Group("")
	// 	auth.Use(middleware.AuthRequired())
	// 	{
	// 		// User Routing
	// 		auth.GET("user/me", api.UserMe)
	// 		auth.DELETE("user/logout", api.UserLogout)
	// 	}
	// }
	return r
}
