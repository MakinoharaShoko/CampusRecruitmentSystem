package serializer

type Process struct {
	IntervieweeId int64 `json:"interviewee_id"`
	PostionId     int64 `json:"postion_id"`
	CompanyId     int64 `json:"company_id"`
	Status        int32 `json:"status"`
	CreatAt       int64 `json:"creat_at"`
}
