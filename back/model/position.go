package model

import (
	"time"
)

type Position struct {
	ID           int64     `json:"id" gorm:"primarykey"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	PositionName string    `json:"position_name"`
	CompanyId    int64     `json:"company_id"`
	JD           string    `json:"jd"`
}
