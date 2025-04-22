package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"backend/internal/domain"
	"backend/internal/usecase"

	"github.com/google/uuid"
)

type ContactHandler struct {
	contactUseCase usecase.ContactUseCase
}

func NewContactHandler(contactUseCase usecase.ContactUseCase) *ContactHandler {
	return &ContactHandler{
		contactUseCase: contactUseCase,
	}
}

func (h *ContactHandler) HandleContact(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		h.createContact(w, r)
	case http.MethodGet:
		if strings.Contains(r.URL.Path, "/api/contact/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/contact/")
			if idStr == "" || idStr == "api/contact" {
				h.getAllContacts(w, r)
				return
			}

			id, err := uuid.Parse(idStr)
			if err != nil {
				http.Error(w, "Invalid contact ID: must be a valid UUID", http.StatusBadRequest)
				return
			}
			h.getContactById(w, r, id)
		} else {
			h.getAllContacts(w, r)
		}
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *ContactHandler) createContact(w http.ResponseWriter, r *http.Request) {
	//Enable CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	var contactForm domain.Contact
	err := json.NewDecoder(r.Body).Decode(&contactForm)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Generate a new UUID if not provided in the request
	if contactForm.ID == "" {
		contactForm.ID = uuid.New().String()
	}

	err = h.contactUseCase.HandleContactForm(contactForm)
	if err != nil {
		http.Error(w, "Failed to process contact form", http.StatusInternalServerError)
		log.Println("Error processing contact form:", err)
		return
	}

	fmt.Println("Received message from:", contactForm.Email)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Message received",
		"id":      contactForm.ID,
	})
}

func (h *ContactHandler) getContactById(w http.ResponseWriter, r *http.Request, id uuid.UUID) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	contact, err := h.contactUseCase.GetContactById(id)
	if err != nil {
		http.Error(w, "Contact not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contact)
}

func (h *ContactHandler) getAllContacts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	contacts, err := h.contactUseCase.GetAllContacts()
	if err != nil {
		http.Error(w, "Failed to get contacts", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contacts)
}
