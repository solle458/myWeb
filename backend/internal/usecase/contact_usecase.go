package usecase

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"backend/internal/service"

	"github.com/google/uuid"
)

type ContactUseCase interface {
	HandleContactForm(form domain.Contact) error
	GetContactById(id uuid.UUID) (*domain.Contact, error)
	GetAllContacts() ([]domain.Contact, error)
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
	// Generate UUID if not set
	if contact.ID == "" {
		contact.ID = uuid.New().String()
	}

	// Save contact to repository
	if err := u.contactRepo.SaveContact(contact); err != nil {
		return err
	}

	// Send email notification
	if err := u.emailService.SendContactEmail(contact); err != nil {
		return err
	}

	return nil
}

func (u *contactUseCase) GetContactById(id uuid.UUID) (*domain.Contact, error) {
	return u.contactRepo.GetContactById(id)
}

func (u *contactUseCase) GetAllContacts() ([]domain.Contact, error) {
	return u.contactRepo.GetAllContacts()
}
