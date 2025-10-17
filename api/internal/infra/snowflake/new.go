package snowflake

import (
	"time"

	"github.com/sony/sonyflake"
)

// SnowflakeGenerator generates the snowflake ID
type SnowflakeGenerator struct {
	snowflake *sonyflake.Sonyflake
}

// New returns a new instance of Generator
func New() *SnowflakeGenerator {
	return &SnowflakeGenerator{
		snowflake: sonyflake.NewSonyflake(sonyflake.Settings{
			StartTime: time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC),
		})}
}
