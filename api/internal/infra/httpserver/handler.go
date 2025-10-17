package httpserver

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func Handler(
	corsConf CORSConfig,
	dbReadiness http.HandlerFunc,
	routerFn func(r chi.Router),
) http.Handler {
	r := chi.NewRouter()

	r.Use(cors.New(cors.Options{
		AllowedOrigins:   corsConf.allowedOrigins,
		AllowedMethods:   corsConf.allowedMethods,
		AllowedHeaders:   corsConf.allowedHeaders,
		ExposedHeaders:   corsConf.exposedHeaders,
		AllowCredentials: corsConf.allowCredentials,
		MaxAge:           corsConf.maxAge, // Maximum value not ignored by any of major browsers
	}).Handler)

	r.Get("/_/pg", dbReadiness)
	r.Get("/_/healthz", checkLiveness)

	r.Group(routerFn)

	return r
}

func checkLiveness(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("X-Content-Type-Options", "nosniff")
}
