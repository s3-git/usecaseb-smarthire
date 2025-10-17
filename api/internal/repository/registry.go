package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/aarondl/sqlboiler/v4/boil"
	pkgerrors "github.com/pkg/errors"
)

// Registry represents the specification of this pkg
type Registry interface {
	// PingPG checks if the DB connection is alive or not
	PingPG(context.Context) error
	// DoInTx handles db operations in a transaction
	DoInTx(ctx context.Context, txFunc func(txRegistry Registry) error) error
}

// New returns an implementation instance which satisfying Registry
func New(pgConn *sql.DB) Registry {
	return impl{
		pgConn: pgConn,
	}
}

type impl struct {
	pgConn *sql.DB
	txExec boil.Transactor
}

// DoInTx handles db operations in a transaction
func (i impl) DoInTx(ctx context.Context, txFunc func(txRegistry Registry) error) error {
	if i.txExec != nil {
		return errors.New("db tx nested in db tx")
	}

	tx, err := i.pgConn.BeginTx(ctx, nil)
	if err != nil {
		return pkgerrors.WithStack(err)
	}

	var committed bool
	defer func() {
		if committed {
			return
		}
		_ = tx.Rollback()
	}()

	newI := impl{
		txExec: tx,
	}

	if err = txFunc(newI); err != nil {
		return err
	}

	if err = tx.Commit(); err != nil {
		return pkgerrors.WithStack(err)
	}

	committed = true

	return nil
}
