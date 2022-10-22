package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"singo/model"
	"singo/serializer"
)

func GetAllProcess(c *gin.Context) {
	var allProcess []model.Process
	var allUid []string
	schoolName := c.Query("school_name")
	model.DB.Where("background = ?", schoolName).Find(&allProcess)
	model.DB.Select("id").Where("background = ?", schoolName).Find(model.User{})
	model.DB.Where("interviewee_id IN ?", allUid).Find(&allProcess)
	c.JSON(http.StatusOK, serializer.Response{Data: allProcess})
}

//db.Table("go_service_info").Select("go_service_info.serviceId as service_id, go_service_info.serviceName as service_name, go_system_info.systemId as system_id, go_system_info.systemName as system_name").Joins("left join go_system_info on go_service_info.systemId = go_system_info.systemId").Scan(&results)
//
//db.Table("go_service_info").Select("go_service_info.serviceId as service_id, go_service_info.serviceName as service_name, go_system_info.systemId as system_id, go_system_info.systemName as system_name").Joins("left join go_system_info on go_service_info.systemId = go_system_info.systemId where go_service_info.serviceId <> ? and go_system_info.systemId = ?", "xxx", "xxx").Scan(&results)
//
//db.Raw("SELECT  FROM go_service_info a LEFT JOIN go_system_info b ON a.systemId = b.systemId").Scan(&results)
//
//db.Raw("SELECT  FROM go_service_info a LEFT JOIN go_system_info b ON a.systemId = b.systemId where a.serviceId <> ? and b.systemId = ?", "xxx", "xxx").Scan(&results)
