package api

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"singo/model"
	"singo/serializer"
	"singo/service"
)

type CompanyMeResp struct {
	CompanyName string `json:"company_name"`
	Info        string `json:"info"`
}

type CompanyAllInfoResp struct {
	Id          int64  `json:"id"`
	CompanyName string `json:"company_name"`
	Info        string `json:"info"`
}

// CompanyRegister 公司注册接口
func CompanyRegister(c *gin.Context) {
	var service service.CompanyRegisterService
	if err := c.ShouldBind(&service); err == nil {
		res := service.Register()
		c.JSON(200, res)
	} else {
		c.JSON(200, ErrorResponse(err))
	}
}

// CompanyLogin 公司登录接口
func CompanyLogin(c *gin.Context) {
	var service service.CompanyLoginService
	if err := c.ShouldBind(&service); err == nil {
		res := service.Login(c)
		c.JSON(200, res)
	} else {
		c.JSON(200, ErrorResponse(err))
	}
}

// CompanyLogout 公司登出
func CompanyLogout(c *gin.Context) {
	s := sessions.Default(c)
	s.Clear()
	s.Save()
	c.JSON(200, serializer.Response{
		Code: 0,
		Msg:  "登出成功",
	})
}

func CompanyMe(c *gin.Context) {
	companyId := c.Query("company_id")
	if companyInfo, err := model.GetCompany(companyId); err != nil {
		c.JSON(http.StatusNotFound, serializer.ParamErr("未能查找到公司信息", err))
	} else {
		c.JSON(http.StatusOK, serializer.Response{
			Data: CompanyMeResp{
				CompanyName: companyInfo.CompanyName,
				Info:        companyInfo.Info,
			},
		})
	}
}

func CompanyAllInfo(c *gin.Context) {
	company := CurrentCompany(c)
	res := serializer.Response{
		Data: CompanyAllInfoResp{
			Id:          company.ID,
			CompanyName: company.CompanyName,
			Info:        company.Info,
		}}
	c.JSON(200, res)
}
