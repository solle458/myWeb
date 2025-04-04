package repository

import "backend/internal/domain"

type ContactRepository interface {
	SaveContact(contact domain.Contact) error
}

type contactRepository struct {
	//db
}

func NewContactRepository() ContactRepository {
	return &contactRepository{}
}

func (r *contactRepository) SaveContact(contact domain.Contact) error {
	// Implementation for saving contact to database if needed
	// Currently the original code doesn't store contacts, just emails them
	return nil
}
