package httpserver

type Response struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
}

// SuccessResponse represents the response for a successful request
type SuccessResponse struct {
	Success bool `json:"success"`
}
