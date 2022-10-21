package model

import (
	"golang.org/x/crypto/bcrypt"
	"time"
)

type Company struct {
	ID             int64 `gorm:"primarykey"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
	CompanyName    string
	PasswordDigest string
	Info           string
	Avatar         string `gorm:"size:1000"`
}

// GetCompany 用ID获取公司
func GetCompany(ID interface{}) (Company, error) {
	var company Company
	result := DB.First(&company, ID)
	return company, result.Error
}

// SetPassword 设置密码
func (company *Company) SetPassword(password string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), PassWordCost)
	if err != nil {
		return err
	}
	company.PasswordDigest = string(bytes)
	return nil
}

// CheckPassword 校验密码
func (company *Company) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(company.PasswordDigest), []byte(password))
	return err == nil
}

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
