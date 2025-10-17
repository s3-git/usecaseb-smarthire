package repository

import (
	"context"

	pkgerrors "github.com/pkg/errors"
)

// PingPG will check if the PG DB connection is alive or not
func (i impl) PingPG(ctx context.Context) error {
	return pkgerrors.WithStack(i.pgConn.PingContext(ctx))
}
