package model

import (
	"gorm.io/gorm"
)

// Resume 面试申请模型
type Resume struct {
	gorm.Model
	intervieweeID string
	hrID          string
	Status        string
}
