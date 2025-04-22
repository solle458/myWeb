package repository

import (
	"database/sql"
	"fmt"
	"time"

	"backend/internal/domain"

	"github.com/google/uuid"
)

type ContactRepository interface {
	SaveContact(contact domain.Contact) error
	GetContactById(id uuid.UUID) (*domain.Contact, error)
	GetAllContacts() ([]domain.Contact, error)
}

type mySQLContactRepository struct {
	db *sql.DB
}

func NewContactRepository(db *sql.DB) ContactRepository {
	return &mySQLContactRepository{
		db: db,
	}
}

func (r *mySQLContactRepository) SaveContact(contact domain.Contact) error {
	query := `INSERT INTO contacts (id, name, email, message, created_at) VALUES (?, ?, ?, ?, ?)`

	// If ID is empty, generate a new one
	if contact.ID == "" {
		contact.ID = uuid.New().String()
	}

	now := time.Now()
	_, err := r.db.Exec(query, contact.ID, contact.Name, contact.Email, contact.Message, now)
	if err != nil {
		return fmt.Errorf("failed to save contact: %w", err)
	}

	contact.CreatedAt = now
	return nil
}

func (r *mySQLContactRepository) GetContactById(id uuid.UUID) (*domain.Contact, error) {
	query := `SELECT id, name, email, message, created_at FROM contacts WHERE id = ?`

	var contact domain.Contact
	var idStr string
	var createdAt time.Time

	err := r.db.QueryRow(query, id.String()).Scan(
		&idStr,
		&contact.Name,
		&contact.Email,
		&contact.Message,
		&createdAt,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to get contact by id: %w", err)
	}

	// Parse UUID from string
	contactID, err := uuid.Parse(idStr)
	if err != nil {
		return nil, fmt.Errorf("failed to parse contact UUID: %w", err)
	}

	contact.ID = contactID.String()
	contact.CreatedAt = createdAt
	return &contact, nil
}

func (r *mySQLContactRepository) GetAllContacts() ([]domain.Contact, error) {
	query := `SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to get all contacts: %w", err)
	}
	defer rows.Close()

	contacts := []domain.Contact{}

	for rows.Next() {
		var contact domain.Contact
		var idStr string
		var createdAt time.Time

		if err := rows.Scan(
			&idStr,
			&contact.Name,
			&contact.Email,
			&contact.Message,
			&createdAt,
		); err != nil {
			return nil, fmt.Errorf("failed to scan contact: %w", err)
		}

		// Parse UUID from string
		contactID, err := uuid.Parse(idStr)
		if err != nil {
			return nil, fmt.Errorf("failed to parse contact UUID: %w", err)
		}

		contact.ID = contactID.String()
		contact.CreatedAt = createdAt
		contacts = append(contacts, contact)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate over contacts: %w", err)
	}

	return contacts, nil
}
