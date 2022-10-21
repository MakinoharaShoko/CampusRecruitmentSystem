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
		v1.GET("interviewee/me", api.IntervieweeMe)

		// hr 相关接口
		// 获取hr基本信息
		v1.GET("hr/me")

		// 公司 接口
		companyOpen := v1.Group("company")
		// 查看公司基本信息
		companyOpen.GET("me")
		// 公司登录
		companyOpen.POST("login")

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
			auth.POST("interviewee/setme", api.IntervieweeSetMe)
			// 投递个人简历
			auth.POST("interviewee/post_resume")
			//
			auth.GET("interviewee/get_all_process")

			// company 接口
			company := auth.Group("company")
			// 获取全部流程
			company.GET("get_all_process")

			// position 接口
			position := auth.Group("position")
			// 发布职位
			position.POST("new_position")
			// 查看特定职位
			position.GET("check_position")
			// 删除职位
			position.DELETE("del_position")

			// process 接口
			process := auth.Group("process")
			// 发起流程
			process.POST("new_process")
			// 查看流程状态
			process.GET("check_process")
			// 变更流程
			process.POST("change_process")
		}
	}
	return r
}
