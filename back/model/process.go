package model

import "gorm.io/gorm"

type Process struct {
	gorm.Model
	IntervieweeId int64 `json:"interviewee_id"`
	PositionId    int64 `json:"position_id"`
	CompanyId     int64 `json:"company_id"`
	Status        int32 `json:"status"`
}
