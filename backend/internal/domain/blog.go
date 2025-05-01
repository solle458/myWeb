package domain

import "time"

type Blog struct {
	ID            string    `json:"id,omitempty"`
	Title         string    `json:"title"`
	Content       string    `json:"body"`
	CoverImageURL string    `json:"cover_image_url"`
	CreatedAt     time.Time `json:"created_at,omitempty"`
	PublishedAt   time.Time `json:"updated_at,omitempty"`
}
