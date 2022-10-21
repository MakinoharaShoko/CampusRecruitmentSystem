package model

import "gorm.io/gorm"

// Interviewee 求职用户模型
type Interviewee struct {
	gorm.Model
	UserId       int64  `gorm:"index:idx_user_id;unique"`
	Institution  string `gorm:"index:idx_institution;comment:'最高学历毕业院校'"`
	Background   string
	GraduationAt int32
	Resume       string
}

// // GetUser 用ID获取用户
// func GetInterviewee(ID interface{}) (User, error) {
// 	var user User
// 	result := DB.First(&user, ID)
// 	return user, result.Error
// }
