package domain

import "time"

type Contact struct {
	ID        string    `json:"id,omitempty"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}
