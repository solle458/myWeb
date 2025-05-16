package domain

type Project struct {
	ID          string   `json:"id,omitempty"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Image       string   `json:"image"`
	Technology  []string `json:"technologies"`
	URL         string   `json:"url"`
	Github      string   `json:"github"`
	CreatedAt   string   `json:"created_at,omitempty"`
}
