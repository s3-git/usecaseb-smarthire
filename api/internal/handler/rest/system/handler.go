package system

import (
	"github.com/s3-git/usecaseb-smarthire/api/internal/controller/system"
)

// Handler is the web handler for this pkg
type Handler struct {
	systemCtrl system.Controller
}

// New instantiates a new Handler and returns it
func New(systemCtrl system.Controller) Handler {
	return Handler{systemCtrl: systemCtrl}
}
