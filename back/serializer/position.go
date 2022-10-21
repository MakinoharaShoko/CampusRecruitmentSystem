package serializer

type Position struct {
	PositionId   int64  `json:"position_id"`
	PositionName string `json:"position_name"`
	CompanyId    int64  `json:"company_id"`
	JD           string `json:"jd"`
	CreatAt      int64  `json:"creat_at"`
}
