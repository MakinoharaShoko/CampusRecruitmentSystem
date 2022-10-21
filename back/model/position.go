package model

import "gorm.io/gorm"

type Position struct {
	gorm.Model
	PositionName string `json:"position_name"`
	CompanyId    string `json:"company_id"`
	JD           string `json:"jd"`
}
