package model

import (
	"gorm.io/gorm"
)

// CompanyInfo 公司模型
type CompanyInfo struct {
	gorm.Model
	CompanyName string
	image       string
	info        string
}

type CompanyHrList struct {
	gorm.Model
	CompanyName string
	HrId        uint
}
