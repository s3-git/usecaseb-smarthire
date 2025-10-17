package main

import (
	"context"
	"database/sql"
	"log"

	"github.com/s3-git/usecaseb-smarthire/api/internal/controller/system"
	systemrest "github.com/s3-git/usecaseb-smarthire/api/internal/handler/rest/system"
	"github.com/s3-git/usecaseb-smarthire/api/internal/infra/config"
	"github.com/s3-git/usecaseb-smarthire/api/internal/infra/db/pg"
	"github.com/s3-git/usecaseb-smarthire/api/internal/infra/httpserver"
	"github.com/s3-git/usecaseb-smarthire/api/internal/repository"
)

func main() {
	ctx := context.Background()
	// Initial config
	config, err := initConfig()
	if err != nil {
		log.Fatal(err)
	}

	// Initial DB connection
	conn, err := pg.Connect(config.PGCfg.PGUrl)
	if err != nil {
		log.Fatal("[PG connection error] ", err)
	}
	defer conn.Close()

	// Initial router
	rtr, err := initRouter(ctx, conn)
	if err != nil {
		log.Fatal(err)
	}

	httpserver.Start(
		httpserver.Handler(
			httpserver.NewCORSConfig(rtr.corsOrigins),
			systemrest.New(rtr.systemCtrl).CheckDBReady(),
			rtr.routes,
		),
		config.ServerCfg,
	)
}

func initConfig() (config.Config, error) {
	cfg := config.NewConfig(pg.NewConfig(), httpserver.NewConfig())
	if err := cfg.Validate(); err != nil {
		return config.Config{}, err
	}

	return cfg, nil
}

func initRouter(ctx context.Context, db *sql.DB) (router, error) {
	repo := repository.New(db)
	systemCtrl := system.New(repo)

	return router{
		ctx:        ctx,
		systemCtrl: systemCtrl,
	}, nil
}
