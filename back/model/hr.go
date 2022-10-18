package model

import "gorm.io/gorm"

// Hr 求职用户模型
type Hr struct {
	gorm.Model
	UserInfo User `gorm:"foreignKey:ID"`
	LastName string
	Gender   bool
	// 职位
	Position    string
	CompanyName string `gorm:"index:idx_company"`
}
