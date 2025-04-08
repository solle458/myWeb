package domain

import "time"

type Contact struct {
	ID        int64     `json:"id,omitempty"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}
