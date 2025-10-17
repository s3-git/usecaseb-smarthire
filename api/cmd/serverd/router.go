package main

import (
	"context"

	"github.com/go-chi/chi/v5"
	"github.com/s3-git/usecaseb-smarthire/api/internal/controller/system"
)

type router struct {
	ctx         context.Context
	corsOrigins []string
	systemCtrl  system.Controller
}

func (rtr router) routes(r chi.Router) {
	r.Group(rtr.public)
	r.Group(rtr.authenticated)
}

func (rtr router) public(r chi.Router) {
	prefix := "/api/public"

	r.Group(func(r chi.Router) {
		prefix = prefix + "/v1"
	})
}

func (rtr router) authenticated(r chi.Router) {
	prefix := "/api/authenticated"

	r.Group(func(r chi.Router) {
		prefix = prefix + "/v1"
	})
}
