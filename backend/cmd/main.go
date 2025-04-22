package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"backend/config"
	"backend/infrastructure"
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/internal/usecase"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("../config/.env") // パスを確認してください
	if err != nil {
		// .envがなくてもエラーにしない場合もある
		log.Fatal("Warning: .env file not found or error loading it:", err)
		// log.Fatal("Error loading .env file") // 必須の場合は Fatal
	}

	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal("Error creating config:", err)
	}

	db, err := infrastructure.NewMySQLDB(cfg)
	if err != nil {
		log.Fatal("Error creating MySQL DB:", err)
	}
	defer infrastructure.CloseDB(db)

	gmailClient, err := infrastructure.NewGmailClient(cfg)
	if err != nil {
		log.Fatal("Error creating Gmail client:", err)
	}

	emailService := service.NewEmailService(gmailClient, cfg)
	contactRepository := repository.NewContactRepository(db)
	contactUseCase := usecase.NewContactUseCase(contactRepository, emailService)
	contactHandler := handler.NewContactHandler(contactUseCase)

	http.HandleFunc("/api/contact", contactHandler.HandleContact)
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "OK")
	})
	// http.HandleFunc("/api/admin/login", )
	port := cfg.Port
	server := &http.Server{
		Addr: ":" + port,
	}

	go func() {
		fmt.Println("Server is running on port", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Error starting server:", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	// ここで Graceful Shutdown の処理を追加するのが一般的 (省略)
}
