package serializer

import "singo/model"

// User 用户序列化器
type Interviewee struct {
	UserInfo     User
	Institution  string `json:"institution"`
	Background   string `json:"background"`
	GraduationAt int32  `json:"graduation_at"`
	Resume       string `json:"resume"`
}

// BuildUser 序列化用户
func BuildInterviewee(interviewee model.Interviewee) Interviewee {
	return Interviewee{
		UserInfo: User{
			ID:        interviewee.UserInfo.ID,
			UserName:  interviewee.UserInfo.UserName,
			Nickname:  interviewee.UserInfo.Nickname,
			Status:    interviewee.UserInfo.Status,
			Avatar:    interviewee.UserInfo.Avatar,
			CreatedAt: interviewee.UserInfo.CreatedAt.Unix(),
		},
		Institution:  interviewee.Institution,
		Background:   interviewee.Background,
		GraduationAt: interviewee.GraduationAt,
		Resume:       interviewee.Resume,
	}
}

// BuildUserResponse 序列化用户响应
func BuildIntervieweeResponse(user model.Interviewee) Response {
	return Response{
		Data: BuildInterviewee(user),
	}
}
