package repository

import (
	"database/sql"
	"fmt"
	"time"

	"backend/internal/domain"
)

type ContactRepository interface {
	SaveContact(contact domain.Contact) error
	GetContactById(id int64) (*domain.Contact, error)
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
	query := `INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)`

	result, err := r.db.Exec(query, contact.Name, contact.Email, contact.Message, time.Now())
	if err != nil {
		return fmt.Errorf("failed to save contact: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return fmt.Errorf("failed to get last insert id: %w", err)
	}

	contact.ID = id
	return nil
}

func (r *mySQLContactRepository) GetContactById(id int64) (*domain.Contact, error) {
	query := `SELECT id, name, email, message, created_at FROM contacts WHERE id = ?`

	var contact domain.Contact
	var createdAt time.Time

	err := r.db.QueryRow(query, id).Scan(
		&contact.ID,
		&contact.Name,
		&contact.Email,
		&contact.Message,
		&createdAt,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to get contact by id: %w", err)
	}

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
		var createdAt time.Time

		if err := rows.Scan(
			&contact.ID,
			&contact.Name,
			&contact.Email,
			&contact.Message,
			&createdAt,
		); err != nil {
			return nil, fmt.Errorf("failed to scan contact: %w", err)
		}

		contact.CreatedAt = createdAt
		contacts = append(contacts, contact)

		if err := rows.Err(); err != nil {
			return nil, fmt.Errorf("failed to iterate over contacts: %w", err)
		}

	}

	return contacts, nil
}
