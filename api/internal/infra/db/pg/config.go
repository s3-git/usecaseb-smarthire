package pg

import (
	"errors"
	"os"
)

// Config represents config of config level, contains all config / secret keys to start up server
type Config struct {
	PGUrl string
}

// NewConfig returns config
func NewConfig() Config {
	return Config{
		PGUrl: os.Getenv("PG_URL"),
	}
}

// Validate validates config config
func (c Config) Validate() error {
	if c.PGUrl == "" {
		return errors.New("required env variable 'PG_URL' not found")
	}

	return nil
}
