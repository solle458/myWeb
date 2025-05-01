package domain

import "time"

type Photo struct {
	ID          string    `json:"id,omitempty"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Location    string    `json:"location"`
	ImageURL    string    `json:"image_url"`
	CreatedAt   time.Time `json:"created_at,omitempty"`
	TakenAt     time.Time `json:"updated_at,omitempty"`
}
