package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"backend/internal/domain"
	"backend/internal/usecase"
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
	//Enable CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var contactForm domain.Contact
	err := json.NewDecoder(r.Body).Decode(&contactForm)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Process contact form
	err = h.contactUseCase.HandleContactForm(contactForm)
	if err != nil {
		http.Error(w, "Failed to process contact form", http.StatusInternalServerError)
		log.Println("Error processing contact form:", err)
		return
	}

	fmt.Println("Received message from:", contactForm.Email)
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Message received")
}
