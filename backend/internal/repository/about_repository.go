package repository

import (
	"database/sql"
	"fmt"

	"backend/internal/domain"
)

type AboutRepository interface {
	GetAbout() (*domain.About, error)
	UpdateAbout(about domain.About) error
}

type SkillsRepository interface {
	GetSkills() ([]domain.Skills, error)
	UpdateSkills(skill domain.Skills) error
}

type EducationRepository interface {
	GetEducation() ([]domain.Education, error)
	UpdateEducation(education domain.Education) error
}

type mySQLAboutRepository struct {
	db *sql.DB
}

func NewAboutRepository(db *sql.DB) AboutRepository {
	return &mySQLAboutRepository{
		db: db,
	}
}

func (r *mySQLAboutRepository) GetAbout() (*domain.About, error) {
	query := `SELECT name, title, FROM about`
	row := r.db.QueryRow(query)

	var about domain.About
	err := row.Scan(&about.Name, &about.Title)
	if err != nil {
		return nil, fmt.Errorf("failed to get about: %w", err)
	}

	return &about, nil
}

func (r *mySQLAboutRepository) UpdateAbout(about domain.About) error {
	query := `UPDATE about SET name = ?, title = ?, bio = ?, skills = ?, education = ?`
	_, err := r.db.Exec(query, about.Name, about.Title, about.Bio, about.Skills, about.Education)
	if err != nil {
		return fmt.Errorf("failed to update about: %w", err)
	}
	return nil
}

func NewSkillsRepository(db *sql.DB) SkillsRepository {
	return &mySQLAboutRepository{
		db: db,
	}
}

func (r *mySQLAboutRepository) GetSkills() ([]domain.Skills, error) {
	query := `SELECT languages, frameworks, others FROM skills`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to get skills: %w", err)
	}
	defer rows.Close()

	var skills []domain.Skills
	for rows.Next() {
		var skill domain.Skills
		err := rows.Scan(&skill.Languages, &skill.Frameworks, &skill.Others)
		if err != nil {
			return nil, fmt.Errorf("failed to scan skill: %w", err)
		}
		skills = append(skills, skill)
	}

	return skills, nil
}

func (r *mySQLAboutRepository) UpdateSkills(skill domain.Skills) error {
	query := `UPDATE skills SET languages = ?, frameworks = ?, others = ?`
	_, err := r.db.Exec(query, skill.Languages, skill.Frameworks, skill.Others)
	if err != nil {
		return fmt.Errorf("failed to update skills: %w", err)
	}
	return nil
}

func NewEducationRepository(db *sql.DB) EducationRepository {
	return &mySQLAboutRepository{
		db: db,
	}
}

func (r *mySQLAboutRepository) GetEducation() ([]domain.Education, error) {
	query := `SELECT degree, institution, year FROM education`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to get education: %w", err)
	}
	defer rows.Close()

	var education []domain.Education
	for rows.Next() {
		var edu domain.Education
		err := rows.Scan(&edu.Degree, &edu.Institution, &edu.Year)
		if err != nil {
			return nil, fmt.Errorf("failed to scan education: %w", err)
		}
		education = append(education, edu)
	}

	return education, nil
}

func (r *mySQLAboutRepository) UpdateEducation(education domain.Education) error {
	query := `UPDATE education SET degree = ?, institution = ?, year = ?`
	_, err := r.db.Exec(query, education.Degree, education.Institution, education.Year)
	if err != nil {
		return fmt.Errorf("failed to update education: %w", err)
	}
	return nil
}
