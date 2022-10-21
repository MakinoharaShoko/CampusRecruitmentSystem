package model

//执行数据迁移

func migration() {
	// 自动迁移模式
	_ = DB.AutoMigrate(&User{})
	//_ = DB.AutoMigrate(&Hr{})
	_ = DB.AutoMigrate(&Process{})
	_ = DB.AutoMigrate(&Company{})
	_ = DB.AutoMigrate(&Position{})
}
