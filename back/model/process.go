package model

import (
	"time"
)

type Process struct {
	ID            int64     `json:"id" gorm:"primarykey"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	IntervieweeId int64     `json:"interviewee_id"`
	PositionId    int64     `json:"position_id"`
	CompanyId     int64     `json:"company_id"`
	Status        int32     `json:"status"`
}
