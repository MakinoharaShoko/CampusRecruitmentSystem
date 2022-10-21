package model

import "gorm.io/gorm"

//// CompanyInfo 公司模型
//type CompanyInfo struct {
//	gorm.Model
//	CompanyName string
//	image       string
//	info        string
//}
//
//type CompanyHrList struct {
//	gorm.Model
//	CompanyId uint
//	HrId      uint
//}
//
//type RecruitInfo struct {
//	gorm.Model
//	CompanyId  uint
//	HrId       uint
//	background uint
//	jobName    string
//	jobInfo    string
//}

type Company struct {
	gorm.Model
	CompanyName    string
	PasswordDigest string
	Info           string
	Avatar         string `gorm:"size:1000"`
}
