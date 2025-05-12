package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"backend/internal/domain"
	"backend/internal/usecase"
)

type PhotoHandler struct {
	photoUseCase usecase.PhotoUseCase
}

func NewPhotoHandler(photoUseCase usecase.PhotoUseCase) *PhotoHandler {
	return &PhotoHandler{
		photoUseCase: photoUseCase,
	}
}

func (h *PhotoHandler) HandlePhoto(w http.ResponseWriter, r *http.Request) {
	h.setHeader(w)
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "Error parsing form data", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving file from form data", http.StatusBadRequest)
		return
	}
	defer file.Close()

	jsonData := r.FormValue("json")
	var photo domain.Photo
	if err := json.Unmarshal([]byte(jsonData), &photo); err != nil {
		http.Error(w, "Error unmarshalling JSON data", http.StatusBadRequest)
		return
	}
	photo.ID = strings.TrimSpace(photo.ID)

	switch r.Method {
	case http.MethodPost:
		err := h.photoUseCase.HandleSubmitPhoto(photo, file)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error uploading photo: %v", err), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		return
	case http.MethodDelete:
		err := h.photoUseCase.HandleDeletePhoto(photo.ID)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error deleting photo: %v", err), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		return
	case http.MethodGet:
		idStr := strings.TrimPrefix(r.URL.Path, "/api/photo/")
		if idStr == "" || idStr == "api/photo" {
			h.getAllPhotos(w, r)
			return
		}
		h.getPhotoById(w, r, idStr)
		return
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
		return
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

}

func (h *PhotoHandler) getPhotoById(w http.ResponseWriter, r *http.Request, id string) {
	photo, err := h.photoUseCase.GetPhotoById(id)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error fetching photo: %v", err), http.StatusInternalServerError)
		return
	}

	if photo == nil {
		http.Error(w, "Photo not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(photo)
}

func (h *PhotoHandler) getAllPhotos(w http.ResponseWriter, r *http.Request) {
	photos, err := h.photoUseCase.GetAllPhotos()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error fetching photos: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(photos)
}

func (h *PhotoHandler) setHeader(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "https://solle.vercel.app")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}
