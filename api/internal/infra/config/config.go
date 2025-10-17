package config

import (
	"github.com/s3-git/usecaseb-smarthire/api/internal/infra/db/pg"
	"github.com/s3-git/usecaseb-smarthire/api/internal/infra/httpserver"
)

// Config represents config of config level, contains all config / secret keys to start up server
type Config struct {
	PGCfg     pg.Config
	ServerCfg httpserver.Config
}

// NewConfig returns config
func NewConfig(pgCfg pg.Config, serverCfg httpserver.Config) Config {
	return Config{
		PGCfg:     pgCfg,
		ServerCfg: serverCfg,
	}
}

// Validate validates config config
func (c Config) Validate() error {
	if err := c.PGCfg.Validate(); err != nil {
		return err
	}

	return c.ServerCfg.Validate()
}
