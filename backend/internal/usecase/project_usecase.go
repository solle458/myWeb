package usecase

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"fmt"
)

type ProjectUsecase interface {
	GetProjects() ([]domain.Project, error)
	CreateProject(project domain.Project) (string, error)
	UpdateProject(project domain.Project) error
	DeleteProject(id string) error
}

type projectUsecase struct {
	projectRepo repository.ProjectRepository
}

func NewProjectUsecase(projectRepo repository.ProjectRepository) ProjectUsecase {
	return &projectUsecase{
		projectRepo: projectRepo,
	}
}

func (u *projectUsecase) GetProjects() ([]domain.Project, error) {
	projects, err := u.projectRepo.GetProjects()
	if err != nil {
		return nil, fmt.Errorf("failed to get projects: %w", err)
	}
	return projects, nil
}

func (u *projectUsecase) CreateProject(project domain.Project) (string, error) {
	id, err := u.projectRepo.CreateProject(project)
	if err != nil {
		return "", fmt.Errorf("failed to create project: %w", err)
	}
	return id, nil
}

func (u *projectUsecase) UpdateProject(project domain.Project) error {
	if err := u.projectRepo.UpdateProject(project); err != nil {
		return fmt.Errorf("failed to update project: %w", err)
	}
	return nil
}

func (u *projectUsecase) DeleteProject(id string) error {
	if err := u.projectRepo.DeleteProject(id); err != nil {
		return fmt.Errorf("failed to delete project: %w", err)
	}
	return nil
}
