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

// CORSミドルウェアを追加
func (h *ProjectHandler) CORSMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// すべてのレスポンスにCORSヘッダーを設定
		h.setHeader(w)
		
		// OPTIONSリクエストの場合は早期に返す
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		// その他のリクエストは通常の処理へ
		next(w, r)
	}
}

func (h *ProjectHandler) HandleProject(w http.ResponseWriter, r *http.Request) {
	// CORSヘッダーをここで設定するのではなく、ミドルウェアに任せる
	
	switch r.Method {
	case http.MethodGet:
		if strings.Contains(r.URL.Path, "/api/projects") {
			// パス解析を改善
			path := strings.TrimPrefix(r.URL.Path, "/api/projects")
			if path == "" || path == "/" {
				h.getProjects(w, r)
				return
			} else {
				// IDを取得するケース
				id := strings.TrimPrefix(path, "/")
				// IDを使用した処理（必要に応じて実装）
			}
		}
	case http.MethodPost:
		if r.URL.Path == "/api/projects" || r.URL.Path == "/api/projects/" {
			h.createProject(w, r)
			return
		}
	case http.MethodPut:
		if strings.Contains(r.URL.Path, "/api/projects/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/projects/")
			if idStr != "" {
				h.updateProject(w, r)
				return
			}
		}
	case http.MethodDelete:
		if strings.Contains(r.URL.Path, "/api/projects/") {
			idStr := strings.TrimPrefix(r.URL.Path, "/api/projects/")
			if idStr != "" {
				h.deleteProject(w, r)
				return
			}
		}
	case http.MethodOptions:
		// OPTIONSはミドルウェアで処理するため、ここでは何もしない
		return
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (h *ProjectHandler) getProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := h.projectHandler.GetProjects()
	if err != nil {
		// エラー時もCORSヘッダーが設定されていることを確認
		// (ミドルウェアで設定済みのはずだが念のため)
		h.setHeader(w)
		http.Error(w, fmt.Sprintf("failed to get projects: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}

func (h *ProjectHandler) createProject(w http.ResponseWriter, r *http.Request) {
	var project domain.Project
	if err := json.NewDecoder(r.Body).Decode(&project); err != nil {
		h.setHeader(w)
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	id, err := h.projectHandler.CreateProject(project)
	if err != nil {
		h.setHeader(w)
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
		h.setHeader(w)
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	if err := h.projectHandler.UpdateProject(project); err != nil {
		h.setHeader(w)
		http.Error(w, fmt.Sprintf("failed to update project: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *ProjectHandler) deleteProject(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/api/projects/")
	if id == "" {
		h.setHeader(w)
		http.Error(w, "project ID is required", http.StatusBadRequest)
		return
	}

	if err := h.projectHandler.DeleteProject(id); err != nil {
		h.setHeader(w)
		http.Error(w, fmt.Sprintf("failed to delete project: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *ProjectHandler) setHeader(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "https://solle.vercel.app")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}