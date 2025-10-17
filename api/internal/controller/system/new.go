package system

import (
	"context"

	"github.com/s3-git/usecaseb-smarthire/api/internal/repository"
)

// Controller represents the specification of this pkg
type Controller interface {
	// CheckDBReadiness checks if the system is ready for operation or not
	CheckDBReadiness(ctx context.Context) error
}

// New initializes a new Controller instance and returns it
func New(repo repository.Registry) Controller {
	return impl{repo: repo}
}

type impl struct {
	repo repository.Registry
}
