package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"singo/model"
	"singo/serializer"
)

type UploadAvatarService struct {
	Filename string `form:"filename" json:"filename"`
}

// UploadAvatar 图片上传授权
func UploadAvatar(c *gin.Context) {
	uid := c.PostForm("uid")
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		return
	}

	basePath := "./upload/avatar"
	filename := basePath + "/" + filepath.Base(file.Filename)
	if err := c.SaveUploadedFile(file, filename); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		return
	}

	model.DB.Model(model.User{}).Where("id = ?", uid).Update("avatar", filename)

	c.JSON(http.StatusOK, serializer.Response{Data: fmt.Sprintf("文件 %s 上传成功 ", file.Filename)})
}

// UploadResume 简历上传授权
func UploadResume(c *gin.Context) {
	uid := c.PostForm("uid")
	_ = c.PostForm("fileName") // 文件名称
	//获取文件
	file, header, errFile := c.Request.FormFile("file")
	//处理获取文件错误
	if errFile != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(errFile))
		return
	}

	//文件保存目录
	saveDir := "./upload/resume"
	//保存的文件名称
	savePath := saveDir + "/" + header.Filename
	//打开目录
	localFileInfo, fileStatErr := os.Stat(saveDir)
	//目录不存在
	if fileStatErr != nil || !localFileInfo.IsDir() {
		//创建目录
		err := os.MkdirAll(saveDir, 0755)
		if err != nil {
			c.JSON(http.StatusBadRequest, ErrorResponse(err))
			return
		}
	}

	out, err := os.Create(savePath)
	if err != nil {
		fmt.Printf("error, panic")
		return
	}
	defer out.Close()
	_, err = io.Copy(out, file)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse(err))
		return
	}

	model.DB.Model(model.User{}).Where("id = ?", uid).Update("resume", savePath)

	//没有错误的情况下
	c.JSON(http.StatusOK, serializer.Response{Data: fmt.Sprintf("文件 %s 上传成功 ", header.Filename)})
	return
}
