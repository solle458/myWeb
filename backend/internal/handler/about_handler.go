package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"backend/internal/domain"
	"backend/internal/usecase"
)

type AboutHandler struct {
	aboutHandler usecase.AboutUsecase
}

func NewAboutHandler(aboutHandler usecase.AboutUsecase) *AboutHandler {
	return &AboutHandler{
		aboutHandler: aboutHandler,
	}
}

func (h *AboutHandler) HandleAbout(w http.ResponseWriter, r *http.Request) {
	h.setHeader(w)
	switch r.Method {
	case http.MethodGet:
		if strings.Contains(r.URL.Path, "/api/about/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/about/")
			if idStr == "" || idStr == "api/about" {
				h.getAbout(w, r)
				return
			} else if idStr == "skills" {
				h.getSkills(w, r)
				return
			} else if idStr == "education" {
				h.getEducation(w, r)
				return
			}
		}
	case http.MethodPost:
		if strings.Contains(r.URL.Path, "/api/about/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/about/")
			if idStr == "" || idStr == "api/about" {
				h.updateAbout(w, r)
				return
			} else if idStr == "skills" {
				h.updateSkills(w, r)
				return
			} else if idStr == "education" {
				h.updateEducation(w, r)
				return
			}
		}
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *AboutHandler) getAbout(w http.ResponseWriter, r *http.Request) {
	about, err := h.aboutHandler.GetAbout()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to get about: %v", err), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(about)
}

func (h *AboutHandler) updateAbout(w http.ResponseWriter, r *http.Request) {
	var about domain.About
	if err := json.NewDecoder(r.Body).Decode(&about); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode about: %v", err), http.StatusBadRequest)
		return
	}
	if err := h.aboutHandler.UpdateAbout(about); err != nil {
		http.Error(w, fmt.Sprintf("failed to update about: %v", err), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "About updated successfully")
}

func (h *AboutHandler) getSkills(w http.ResponseWriter, r *http.Request) {
	skills, err := h.aboutHandler.GetSkills()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to get skills: %v", err), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(skills)
}

func (h *AboutHandler) updateSkills(w http.ResponseWriter, r *http.Request) {
	var skills domain.Skills
	if err := json.NewDecoder(r.Body).Decode(&skills); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode skills: %v", err), http.StatusBadRequest)
		return
	}
	if err := h.aboutHandler.UpdateSkills(skills); err != nil {
		http.Error(w, fmt.Sprintf("failed to update skills: %v", err), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Skills updated successfully")
}

func (h *AboutHandler) getEducation(w http.ResponseWriter, r *http.Request) {
	education, err := h.aboutHandler.GetEducation()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to get education: %v", err), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(education)
}

func (h *AboutHandler) updateEducation(w http.ResponseWriter, r *http.Request) {
	var education domain.Education
	if err := json.NewDecoder(r.Body).Decode(&education); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode education: %v", err), http.StatusBadRequest)
		return
	}
	if err := h.aboutHandler.UpdateEducation(education); err != nil {
		http.Error(w, fmt.Sprintf("failed to update education: %v", err), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Education updated successfully")
}

func (h *AboutHandler) setHeader(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "https://solle.vercel.app")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}
