package service

import (
	"singo/model"
	"singo/serializer"
)

// CompanyRegisterService 管理公司注册服务
type CompanyRegisterService struct {
	CompanyName     string `form:"company_name" json:"company_name" binding:"required,min=1,max=30"`
	Password        string `form:"password" json:"password" binding:"required,min=8,max=40"`
	PasswordConfirm string `form:"password_confirm" json:"password_confirm" binding:"required,min=8,max=40"`
}

// valid 验证表单
func (service *CompanyRegisterService) valid() *serializer.Response {
	if service.PasswordConfirm != service.Password {
		return &serializer.Response{
			Code: 40001,
			Msg:  "两次输入的密码不相同",
		}
	}

	count := int64(0)
	model.DB.Model(&model.Company{}).Where("company_name = ?", service.CompanyName).Count(&count)
	if count > 0 {
		return &serializer.Response{
			Code: 40001,
			Msg:  "该公司名已被占用",
		}
	}

	count = 0
	model.DB.Model(&model.Company{}).Where("company_name = ?", service.CompanyName).Count(&count)
	if count > 0 {
		return &serializer.Response{
			Code: 40001,
			Msg:  "公司已经注册",
		}
	}

	return nil
}

// Register 公司注册
func (service *CompanyRegisterService) Register() serializer.Response {
	company := model.Company{
		CompanyName: service.CompanyName,
	}

	// 表单验证
	if err := service.valid(); err != nil {
		return *err
	}

	// 加密密码
	if err := company.SetPassword(service.Password); err != nil {
		return serializer.Err(
			serializer.CodeEncryptError,
			"密码加密失败",
			err,
		)
	}

	// 创建公司
	if err := model.DB.Create(&company).Error; err != nil {
		return serializer.ParamErr("注册失败", err)
	}

	return serializer.BuildCompanyResponse(company)
}
