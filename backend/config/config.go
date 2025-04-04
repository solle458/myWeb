package config

import "os"

type Config struct {
	Port            string
	ToEmail         string
	CredentialsPath string
}

func NewConfig() (*Config, error) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	return &Config{
		Port:            port,
		ToEmail:         os.Getenv("TO_EMAIL"),
		CredentialsPath: "../config/credentials.json",
	}, nil
}
