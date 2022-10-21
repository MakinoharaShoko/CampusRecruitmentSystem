package serializer

import "singo/model"

// Hr 用户序列化器
type Hr struct {
	UserInfo    User   `json:"user_info"`
	LastName    string `json:"last_name"`
	Gender      bool   `json:"gender"`
	Position    string `json:"position"`
	CompanyName string `json:"company_name"`
}

// BuildHr 序列化用户
func BuildHr(hr model.Hr) Hr {
	return Hr{
		UserInfo: User{
			//ID:        hr.UserInfo.ID,
			UserName:  hr.UserInfo.UserName,
			Nickname:  hr.UserInfo.Nickname,
			Status:    hr.UserInfo.Status,
			Avatar:    hr.UserInfo.Avatar,
			CreatedAt: hr.UserInfo.CreatedAt.Unix(),
		},
		LastName:    hr.LastName,
		Gender:      hr.Gender,
		Position:    hr.Position,
		CompanyName: hr.CompanyName,
	}
}

// BuildHrResponse 序列化用户响应
func BuildHrResponse(user model.Hr) Response {
	return Response{
		Data: BuildHr(user),
	}
}
