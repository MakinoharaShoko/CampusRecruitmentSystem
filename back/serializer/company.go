package serializer

import "singo/model"

type Company struct {
	ID          int64  `json:"id"`
	CompanyName string `json:"company_name"`
	Info        string `json:"info"`
	Avatar      string `json:"avatar"`
	CreatedAt   int64  `json:"created_at"`
}

// BuildCompany 序列化用户
func BuildCompany(company model.Company) Company {
	return Company{
		ID:          company.ID,
		CompanyName: company.CompanyName,
		Info:        company.Info,
		Avatar:      company.Avatar,
		CreatedAt:   company.CreatedAt.Unix(),
	}
}

// BuildCompanyResponse 序列化用户响应
func BuildCompanyResponse(user model.Company) Response {
	return Response{
		Data: BuildCompany(user),
	}
}
