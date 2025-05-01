package repository

import (
	"database/sql"
	"fmt"
	"time"

	"backend/internal/domain"
)

type PhotoRepository interface {
	SavePhoto(photo domain.Photo) error
	DeletePhoto(id string) error
	GetPhotoById(id string) (*domain.Photo, error)
	GetAllPhotos() ([]domain.Photo, error)
}

type mySQLPhotoRepository struct {
	db *sql.DB
}

func NewPhotoRepository(db *sql.DB) PhotoRepository {
	return &mySQLPhotoRepository{
		db: db,
	}
}

func (r *mySQLPhotoRepository) SavePhoto(photo domain.Photo) error {
	query := `INSERT INTO photos (id, title, description, location, image_url, created_at, taken_at) VALUES (?, ?, ?, ?, ?, ?)`
	now := time.Now()
	photo.CreatedAt = now
	_, err := r.db.Exec(query, photo.ID, photo.Title, photo.Description, photo.Location, photo.ImageURL, photo.CreatedAt, photo.TakenAt)
	if err != nil {
		return fmt.Errorf("failed to save photo: %w", err)
	}
	return nil
}

func (r *mySQLPhotoRepository) DeletePhoto(id string) error {
	query := `DELETE FROM photos WHERE id = ?`
	_, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete photo: %w", err)
	}
	return nil
}

func (r *mySQLPhotoRepository) GetPhotoById(id string) (*domain.Photo, error) {
	query := `SELECT id, title, description, location, image_url, created_at, taken_at FROM photos WHERE id = ?`
	row := r.db.QueryRow(query, id)

	var photo domain.Photo
	err := row.Scan(&photo.ID, &photo.Title, &photo.Description, &photo.Location, &photo.ImageURL, &photo.CreatedAt, &photo.TakenAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get photo by id: %w", err)
	}
	return &photo, nil
}

func (r *mySQLPhotoRepository) GetAllPhotos() ([]domain.Photo, error) {
	query := `SELECT id, title, description, location, image_url, created_at, taken_at FROM photos`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to get all photos: %w", err)
	}
	defer rows.Close()

	var photos []domain.Photo
	for rows.Next() {
		var photo domain.Photo
		err := rows.Scan(&photo.ID, &photo.Title, &photo.Description, &photo.Location, &photo.ImageURL, &photo.CreatedAt, &photo.TakenAt)
		if err != nil {
			return nil, fmt.Errorf("failed to scan photo: %w", err)
		}
		photos = append(photos, photo)
	}
	return photos, nil
}
