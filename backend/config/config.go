package config

import (
	"os"
	"strconv"
)

type Config struct {
	//Server Setting
	Port string

	//Email Setting
	ToEmail         string
	CredentialsPath string

	//Database Setting
	DBUser          string
	DBHost          string
	DBPort          string
	DBName          string
	DBPassword      string
	USE_SSL         string
	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxLifetime int
}

func NewConfig() (*Config, error) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	maxOpenConns, _ := strconv.Atoi(getEnvWithDefault("MAX_OPEN_CONNS", "10"))
	maxIdleConns, _ := strconv.Atoi(getEnvWithDefault("MAX_IDLE_CONNS", "10"))
	connMaxLifetime, _ := strconv.Atoi(getEnvWithDefault("CONN_MAX_LIFETIME", "10"))

	return &Config{
		Port:            port,
		ToEmail:         os.Getenv("TO_EMAIL"),
		CredentialsPath: "./config/credentials.json",
		DBUser:          getEnvWithDefault("TIDB_USER", "root"),
		DBPassword:      getEnvWithDefault("TIDB_PASSWORD", ""),
		DBHost:          getEnvWithDefault("TIDB_HOST", "localhost"),
		DBPort:          getEnvWithDefault("TIDB_PORT", "3306"),
		DBName:          getEnvWithDefault("TIDB_NAME", "my_database"),
		USE_SSL:         getEnvWithDefault("USE_SSL", "false"),
		MaxOpenConns:    maxOpenConns,
		MaxIdleConns:    maxIdleConns,
		ConnMaxLifetime: connMaxLifetime,
	}, nil
}

func getEnvWithDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
