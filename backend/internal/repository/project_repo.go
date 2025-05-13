package repository

import (
	"database/sql"
	"fmt"

	"backend/internal/domain"

	"github.com/google/uuid"
)

type ProjectRepository interface {
	GetProjects() ([]domain.Project, error)
	CreateProject(project domain.Project) (string, error)
	UpdateProject(project domain.Project) error
	DeleteProject(id string) error
	getTechnologyID(technology string) (string, error)
}

type mySQLProjectRepository struct {
	db *sql.DB
}

func NewProjectRepository(db *sql.DB) ProjectRepository {
	return &mySQLProjectRepository{
		db: db,
	}
}

func (r *mySQLProjectRepository) GetProjects() ([]domain.Project, error) {
	query := `
		SELECT p.id, p.title, p.description, p.image, p.url, p.github,
    	GROUP_CONCAT(t.name ORDER BY t.name SEPARATOR '||') AS technologies
		FROM projects p
		LEFT JOIN project_technologies pt ON p.id = pt.project_id
		LEFT JOIN technologies t ON pt.technology_id = t.id
		GROUP BY p.id, p.title, p.description, p.image, p.url, p.github;
	`
	row := r.db.QueryRow(query)

	var projects []domain.Project
	err := row.Scan(&projects)
	if err != nil {
		return nil, fmt.Errorf("failed to get projects: %w", err)
	}
	return projects, nil
}

func (r *mySQLProjectRepository) CreateProject(project domain.Project) (string, error) {
	id := uuid.New().String()
	query := `INSERT INTO projects (id, title, description, image, url, github) VALUES (?, ?, ?, ?, ?, ?)`
	_, err := r.db.Exec(query, id, project.Title, project.Description, project.Image, project.URL, project.Github)
	if err != nil {
		return "", fmt.Errorf("failed to create project: %w", err)
	}
	for _, tech := range project.Technology {
		techID, err := r.getTechnologyID(tech)
		if err != nil {
			return "", fmt.Errorf("failed to get technology ID: %w", err)
		}
		query = `INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)`
		_, err = r.db.Exec(query, id, techID)
		if err != nil {
			return "", fmt.Errorf("failed to create project_technologies: %w", err)
		}
	}
	return id, nil
}

func (r *mySQLProjectRepository) UpdateProject(project domain.Project) error {
	query := `UPDATE projects SET title = ?, description = ?, image = ?, url = ?, github = ? WHERE id = ?`
	_, err := r.db.Exec(query, project.Title, project.Description, project.Image, project.URL, project.Github, project.ID)
	if err != nil {
		return fmt.Errorf("failed to update project: %w", err)
	}
	query = `DELETE FROM project_technologies WHERE project_id = ?`
	_, err = r.db.Exec(query, project.ID)
	if err != nil {
		return fmt.Errorf("failed to delete project_technologies: %w", err)
	}
	for _, tech := range project.Technology {
		techID, err := r.getTechnologyID(tech)
		if err != nil {
			return fmt.Errorf("failed to get technology ID: %w", err)
		}
		query = `INSERT INTO project_technologies (project_id, technology_id) VALUES (?, ?)`
		_, err = r.db.Exec(query, project.ID, techID)
		if err != nil {
			return fmt.Errorf("failed to create project_technologies: %w", err)
		}
	}
	return nil
}

func (r *mySQLProjectRepository) DeleteProject(id string) error {
	query := `DELETE FROM projects WHERE id = ?`
	_, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete project: %w", err)
	}
	query = `DELETE FROM project_technologies WHERE project_id = ?`
	_, err = r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete project_technologies: %w", err)
	}
	return nil
}

func (r *mySQLProjectRepository) getTechnologyID(technology string) (string, error) {
	query := `SELECT id FROM technologies WHERE name = ?`
	row := r.db.QueryRow(query, technology)
	var id string
	err := row.Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", fmt.Errorf("technology not found: %s", technology)
		}
		return "", fmt.Errorf("failed to get technology ID: %w", err)
	}
	return id, nil
}
