package config

import (
	"os"
	"strconv"
)

type Config struct {
	Port string
	URL  string
}

type EmailConfig struct {
	ToEmail         string
	CredentialsPath string
}

type DBConfig struct {
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

type CloudinaryConfig struct {
	CLOUD_NAME string
	API_KEY    string
	API_SECRET string
}

func NewConfig() (*Config, error) {
	port := getEnvWithDefault("PORT", "8080")
	url := getEnvWithDefault("URL", "http://localhost:8080")

	return &Config{
		Port: port,
		URL:  url,
	}, nil
}

func NewEmailConfig() (*EmailConfig, error) {
	toEmail := os.Getenv("TO_EMAIL")
	credentialsPath := getEnvWithDefault("CREDENTIALS_PATH", "./config/credentials.json")

	return &EmailConfig{
		ToEmail:         toEmail,
		CredentialsPath: credentialsPath,
	}, nil
}

func NewDBConfig() (*DBConfig, error) {
	dbUser := getEnvWithDefault("TIDB_USER", "root")
	dbPassword := os.Getenv("TIDB_PASSWORD")
	dbHost := getEnvWithDefault("TIDB_HOST", "localhost")
	dbPort := getEnvWithDefault("TIDB_PORT", "3306")
	dbName := getEnvWithDefault("TIDB_NAME", "my_database")
	useSSL := getEnvWithDefault("USE_SSL", "false")
	maxOpenConns, _ := strconv.Atoi(getEnvWithDefault("MAX_OPEN_CONNS", "10"))
	maxIdleConns, _ := strconv.Atoi(getEnvWithDefault("MAX_IDLE_CONNS", "10"))
	connMaxLifetime, _ := strconv.Atoi(getEnvWithDefault("CONN_MAX_LIFETIME", "10"))

	return &DBConfig{
		DBUser:          dbUser,
		DBPassword:      dbPassword,
		DBHost:          dbHost,
		DBPort:          dbPort,
		DBName:          dbName,
		USE_SSL:         useSSL,
		MaxOpenConns:    maxOpenConns,
		MaxIdleConns:    maxIdleConns,
		ConnMaxLifetime: connMaxLifetime,
	}, nil
}

func NewCloudinaryConfig() (*CloudinaryConfig, error) {
	cLOUD_NAME := os.Getenv("CLOUD_NAME")
	aPI_KEY := os.Getenv("API_KEY")
	aPI_SECRET := os.Getenv("API_SECRET")

	return &CloudinaryConfig{
		CLOUD_NAME: cLOUD_NAME,
		API_KEY:    aPI_KEY,
		API_SECRET: aPI_SECRET,
	}, nil
}

func getEnvWithDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
