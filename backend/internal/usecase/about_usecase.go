package usecase

import (
	"backend/internal/domain"
	"backend/internal/repository"
	"fmt"
)

type AboutUsecase interface {
	GetAbout() (*domain.About, error)
	UpdateAbout(about domain.About) error
	GetSkills() ([]domain.Skills, error)
	UpdateSkills(skill domain.Skills) error
	GetEducation() ([]domain.Education, error)
	UpdateEducation(education domain.Education) error
}

type aboutUsecase struct {
	aboutRepo repository.AboutRepository
	skillRepo repository.SkillsRepository
	eduRepo   repository.EducationRepository
}

func NewAboutUsecase(aboutRepo repository.AboutRepository, skillRepo repository.SkillsRepository, eduRepo repository.EducationRepository) AboutUsecase {
	return &aboutUsecase{
		aboutRepo: aboutRepo,
		skillRepo: skillRepo,
		eduRepo:   eduRepo,
	}
}

func (u *aboutUsecase) GetAbout() (*domain.About, error) {
	about, err := u.aboutRepo.GetAbout()
	if err != nil {
		return nil, err
	}
	return about, nil
}

func (u *aboutUsecase) UpdateAbout(about domain.About) error {
	if err := u.aboutRepo.UpdateAbout(about); err != nil {
		return fmt.Errorf("failed to update about: %w", err)
	}
	return nil
}

func (u *aboutUsecase) GetSkills() ([]domain.Skills, error) {
	skills, err := u.skillRepo.GetSkills()
	if err != nil {
		return nil, fmt.Errorf("failed to get skills: %w", err)
	}
	return skills, nil
}

func (u *aboutUsecase) UpdateSkills(skill domain.Skills) error {
	if err := u.skillRepo.UpdateSkills(skill); err != nil {
		return fmt.Errorf("failed to update skills: %w", err)
	}
	return nil
}

func (u *aboutUsecase) GetEducation() ([]domain.Education, error) {
	education, err := u.eduRepo.GetEducation()
	if err != nil {
		return nil, fmt.Errorf("failed to get education: %w", err)
	}
	return education, nil
}

func (u *aboutUsecase) UpdateEducation(education domain.Education) error {
	if err := u.eduRepo.UpdateEducation(education); err != nil {
		return fmt.Errorf("failed to update education: %w", err)
	}
	return nil
}
