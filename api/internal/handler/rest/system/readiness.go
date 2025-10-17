package system

import (
	"context"
	"errors"
	"net/http"

	"github.com/s3-git/usecaseb-smarthire/api/internal/infra/httpserver"
)

// CheckDBReady checks for database readiness
func (h Handler) CheckDBReady() http.HandlerFunc {
	return httpserver.HandlerErr(func(w http.ResponseWriter, r *http.Request) error {
		err := h.systemCtrl.CheckDBReadiness(r.Context())
		if err != nil {
			if errors.Is(err, context.Canceled) {
				return nil
			}
			return err
		}
		return nil
	})
}
