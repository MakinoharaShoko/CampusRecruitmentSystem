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
	r.Use(middleware.CurrentCompany())

	// 最大文件大小
	//r.MaxMultipartMemory = 8 << 20 // 8 MiB
	// 设置静态文件夹
	r.Static("./upload/avatar", "./upload/avatar")

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

		// 公司 接口
		companyOpen := v1.Group("company")
		// 查看公司基本信息
		companyOpen.GET("me", api.CompanyMe)
		// 公司注册
		companyOpen.POST("register", api.CompanyRegister)
		// 公司登录
		companyOpen.POST("login", api.CompanyLogin)

		// position 公共接口
		positionOpen := v1.Group("position")
		// 查看特定职位
		positionOpen.GET("check_position", api.CheckPosition)
		// 查看所有职位
		positionOpen.GET("get_all_position", api.AllPosition)

		// school 接口
		school := v1.Group("school")
		// 获取本校全部学生
		school.GET("get_all_process", api.GetAllProcess)

		// 需要登录保护的
		auth := v1.Group("")
		auth.Use(middleware.AuthRequired())
		{
			// User Routing
			auth.GET("user/me", api.UserMe)
			auth.DELETE("user/logout", api.UserLogout)
			//头像上传
			v1.POST("user/avatar/upload", api.UploadAvatar)
			// 发起聊天
			auth.POST("user/talkwith")

			// interviewee 接口
			// 设置个人应聘信息
			auth.POST("interviewee/setme", api.IntervieweeSetMe)
			// 投递个人简历
			auth.POST("interviewee/post_resume", api.UploadResume)
			// 查看个人全部流程
			auth.GET("interviewee/get_all_process", api.AllProcessUser)

			// process 接口
			process := auth.Group("process")
			// 发起流程
			process.POST("new_process", api.NewProcess)
			// 查看流程状态
			process.GET("check_process", api.CheckProcess)
		}

		// 公司需要登录保护的
		companyAuth := v1.Group("")
		companyAuth.Use(middleware.CompanyAuthRequired())
		{
			// company 接口
			company := companyAuth.Group("company")
			// 登录公司获取本公司信息
			company.GET("AllInfo", api.CompanyAllInfo)
			// 获取全部流程
			company.GET("get_all_process", api.AllProcessCompany)
			// 公司登出
			company.DELETE("logout", api.CompanyLogout)

			// position 接口
			position := companyAuth.Group("position")
			// 创建职位
			position.POST("new_position", api.NewPosition)
			// 删除职位
			position.DELETE("del_position", api.DelPosition)

			// process 接口
			process := auth.Group("process")
			// 查看流程状态
			process.GET("check_process_company", api.CheckProcess)
			// 变更流程
			process.POST("change_process", api.ChangeProcess)
		}
	}
	return r
}
