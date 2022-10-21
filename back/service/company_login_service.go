package service

import (
	"singo/model"
	"singo/serializer"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// CompanyLoginService 管理公司登录的服务
type CompanyLoginService struct {
	CompanyName string `form:"company_name" json:"company_name" binding:"required,min=1,max=30"`
	Password    string `form:"password" json:"password" binding:"required,min=8,max=40"`
}

// setSession 设置session
func (service *CompanyLoginService) setSession(c *gin.Context, company model.Company) {
	s := sessions.Default(c)
	s.Clear()
	s.Set("company_id", company.ID)
	s.Save()
}

// Login 公司登录函数
func (service *CompanyLoginService) Login(c *gin.Context) serializer.Response {
	var company model.Company

	if err := model.DB.Where("company_name = ?", service.CompanyName).First(&company).Error; err != nil {
		return serializer.ParamErr("账号或密码错误", nil)
	}

	if company.CheckPassword(service.Password) == false {
		return serializer.ParamErr("账号或密码错误", nil)
	}

	// 设置session
	service.setSession(c, company)

	return serializer.BuildCompanyResponse(company)
}
