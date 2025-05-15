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

func initialize(local bool) {
	if local {
		// ローカル環境での開発時に .env ファイルを読み込む
		err := godotenv.Load("./config/.env")
		if err != nil {
			log.Fatal("Warning: .env file not found or error loading it:", err)
		}
	} else {
		// 本番環境では、GMAIL_CREDENTIALS_JSON 環境変数から JSON を取得し、ファイルに保存する
		creds := os.Getenv("GMAIL_CREDENTIALS_JSON")
		if creds == "" {
			panic("GMAIL_CREDENTIALS_JSON is not set")
		}
		err := os.WriteFile("./config/credentials.json", []byte(creds), 0600)
		if err != nil {
			panic("failed to write credentials.json: " + err.Error())
		}
		// 本番環境では、GMAIL_TOKEN_JSON 環境変数から JSON を取得し、ファイルに保存する
		tokenFile := os.Getenv("GMAIL_TOKEN_JSON")
		if tokenFile == "" {
			panic("GMAIL_TOKEN_JSON is not set")
		}
		err = os.WriteFile("./config/token.json", []byte(tokenFile), 0600)
		if err != nil {
			panic("failed to write token.json: " + err.Error())
		}
	}
}

func main() {
	env := os.Getenv("ENV")
	initialize(env == "")
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal("Error creating config:", err)
	}

	// Email
	cfgEmail, err := config.NewEmailConfig()
	if err != nil {
		log.Fatal("Error creating config:", err)
	}
	gmailClient, err := infrastructure.NewGmailClient(cfgEmail)
	if err != nil {
		log.Fatal("Error creating Gmail client:", err)
	}

	// DB
	cfgDB, err := config.NewDBConfig()
	if err != nil {
		log.Fatal("Error creating config:", err)
	}
	db, err := infrastructure.NewMySQLDB(cfgDB)
	if err != nil {
		log.Fatal("Error creating MySQL DB:", err)
	}
	defer infrastructure.CloseDB(db)

	cfgCloudinary, err := config.NewCloudinaryConfig()
	if err != nil {
		log.Fatal("Error creating config:", err)
	}
	cld, err := infrastructure.NewCloudinary(cfgCloudinary)
	if err != nil {
		log.Fatal("Error creating Cloudinary client:", err)
	}

	// service関連の初期化
	emailService := service.NewEmailService(gmailClient, cfgEmail)
	cloudinaryService := service.NewCloudinaryService(cld)

	// Photo関連のリポジトリとユースケースを初期化
	photoRepository := repository.NewPhotoRepository(db)
	photoUseCase := usecase.NewPhotoUseCase(photoRepository, cloudinaryService)
	photoHandler := handler.NewPhotoHandler(photoUseCase)

	// Contact関連のリポジトリとユースケースを初期化
	contactRepository := repository.NewContactRepository(db)
	contactUseCase := usecase.NewContactUseCase(contactRepository, emailService)
	contactHandler := handler.NewContactHandler(contactUseCase)

	// About関連のリポジトリとユースケースを初期化
	aboutRepository := repository.NewAboutRepository(db)
	skillsRepository := repository.NewSkillsRepository(db)
	educationRepository := repository.NewEducationRepository(db)
	aboutUseCase := usecase.NewAboutUsecase(aboutRepository, skillsRepository, educationRepository)
	aboutHandler := handler.NewAboutHandler(aboutUseCase)

	// Project関連のリポジトリとユースケースを初期化
	projectRepository := repository.NewProjectRepository(db)
	projectUseCase := usecase.NewProjectUsecase(projectRepository)
	projectHandler := handler.NewProjectHandler(projectUseCase)

	// ルーティングの設定
	http.HandleFunc("/api/contact", contactHandler.HandleContact)
	http.HandleFunc("/api/photo/", photoHandler.HandlePhoto)
	http.HandleFunc("/api/about/", aboutHandler.HandleAbout)
	http.HandleFunc("/api/projects", projectHandler.HandleProject)
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
}
