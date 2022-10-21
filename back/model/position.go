package model

import (
	"time"
)

type Position struct {
	ID           int64 `gorm:"primarykey"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	PositionName string `json:"position_name"`
	CompanyId    int64  `json:"company_id"`
	JD           string `json:"jd"`
}
