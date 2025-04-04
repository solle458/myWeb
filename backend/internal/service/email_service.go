package service

import (
	"encoding/base64"
	"fmt"
	"io"
	"strings"

	"backend/config"
	"backend/internal/domain"

	"golang.org/x/text/encoding/japanese"
	"golang.org/x/text/transform"
	"google.golang.org/api/gmail/v1"
)

type EmailService interface {
	SendContactEmail(contact domain.Contact) error
}

type emailService struct {
	gmailService *gmail.Service
	config       *config.Config
}

func NewEmailService(gmailService *gmail.Service, config *config.Config) EmailService {
	return &emailService{
		gmailService: gmailService,
		config:       config,
	}
}

func (s *emailService) SendContactEmail(contact domain.Contact) error {
	to := s.config.ToEmail
	subject := "新しいお問い合わせがありました"

	msgStr := "From: 'me'\r\n" +
		"Reply-To: " + contact.Email + "\r\n" +
		"To: " + to + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		contact.Message

	reader := strings.NewReader(msgStr)
	transformer := japanese.ISO2022JP.NewEncoder()
	msgISO2022JP, err := io.ReadAll(transform.NewReader(reader, transformer))
	if err != nil {
		return fmt.Errorf("failed to encode message: %w", err)
	}

	msg := []byte(msgISO2022JP)
	message := gmail.Message{}
	message.Raw = base64.StdEncoding.EncodeToString(msg)
	_, err = s.gmailService.Users.Messages.Send("me", &message).Do()
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}
