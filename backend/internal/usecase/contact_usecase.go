package usecase

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"backend/internal/service"
)

type ContactUseCase interface {
	HandleContactForm(form domain.Contact) error
}

type contactUseCase struct {
	contactRepo  repository.ContactRepository
	emailService service.EmailService
}

func NewContactUseCase(contactRepo repository.ContactRepository, emailService service.EmailService) ContactUseCase {
	return &contactUseCase{
		contactRepo:  contactRepo,
		emailService: emailService,
	}
}

func (u *contactUseCase) HandleContactForm(contact domain.Contact) error {
	// Save contact to repository if needed
	if err := u.contactRepo.SaveContact(contact); err != nil {
		return err
	}

	// Send email notification
	if err := u.emailService.SendContactEmail(contact); err != nil {
		return err
	}

	return nil
}
