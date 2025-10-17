package system

import (
	"context"
)

// CheckDBReadiness checks if the database is ready for operation or not
func (i impl) CheckDBReadiness(ctx context.Context) error {
	return i.repo.PingPG(ctx)
}
