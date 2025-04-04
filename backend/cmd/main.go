package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/config"
	"backend/infrastructure"
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("../config/.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal("Error creating config:", err)
	}

	gmailClient, err := infrastructure.NewGmailClient(cfg)
	if err != nil {
		log.Fatal("Error creating Gmail client:", err)
	}

	contactRepository := repository.NewContactRepository()
	emailService := service.NewEmailService(gmailClient, cfg)
	contactUseCase := usecase.NewContactUseCase(contactRepository, emailService)
	contactHandler := handler.NewContactHandler(contactUseCase)

	http.HandleFunc("/api/contact", contactHandler.HandleContact)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("Server is running on port", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
