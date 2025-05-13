package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"backend/internal/domain"
	"backend/internal/usecase"
)

type ProjectHandler struct {
	projectHandler usecase.ProjectUsecase
}

func NewProjectHandler(projectHandler usecase.ProjectUsecase) *ProjectHandler {
	return &ProjectHandler{
		projectHandler: projectHandler,
	}
}

func (h *ProjectHandler) HandleProject(w http.ResponseWriter, r *http.Request) {
	h.setHeader(w)
	switch r.Method {
	case http.MethodGet:
		if strings.Contains(r.URL.Path, "/api/projects/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/projects/")
			if idStr == "" || idStr == "api/projects" {
				h.getProjects(w, r)
				return
			}
		}
	case http.MethodPost:
		if strings.Contains(r.URL.Path, "/api/projects/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/projects/")
			if idStr == "" || idStr == "api/projects" {
				h.createProject(w, r)
				return
			}
		}
	case http.MethodPut:
		if strings.Contains(r.URL.Path, "/api/projects/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/projects/")
			if idStr == "" || idStr == "api/projects" {
				h.updateProject(w, r)
				return
			}
		}
	case http.MethodDelete:
		if strings.Contains(r.URL.Path, "/api/projects/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/projects/")
			if idStr != "" && idStr != "api/projects" {
				h.deleteProject(w, r)
				return
			}
		}
	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *ProjectHandler) getProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := h.projectHandler.GetProjects()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to get projects: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}

func (h *ProjectHandler) createProject(w http.ResponseWriter, r *http.Request) {
	var project domain.Project
	if err := json.NewDecoder(r.Body).Decode(&project); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	id, err := h.projectHandler.CreateProject(project)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to create project: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": id})
}

func (h *ProjectHandler) updateProject(w http.ResponseWriter, r *http.Request) {
	var project domain.Project
	if err := json.NewDecoder(r.Body).Decode(&project); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	if err := h.projectHandler.UpdateProject(project); err != nil {
		http.Error(w, fmt.Sprintf("failed to update project: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *ProjectHandler) deleteProject(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/api/projects/")
	if id == "" {
		http.Error(w, "project ID is required", http.StatusBadRequest)
		return
	}

	if err := h.projectHandler.DeleteProject(id); err != nil {
		http.Error(w, fmt.Sprintf("failed to delete project: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *ProjectHandler) setHeader(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
