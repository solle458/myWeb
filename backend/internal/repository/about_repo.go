package repository

import (
	"database/sql"
	"fmt"

	"backend/internal/domain"

	"github.com/google/uuid"
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
	query := `SELECT name, type FROM technologies`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to get skills: %w", err)
	}
	defer rows.Close()

	var skills []domain.Skills

	for rows.Next() {
		var name string
		var typ string
		if err := rows.Scan(&name, &typ); err != nil {
			return nil, fmt.Errorf("failed to scan skill: %w", err)
		}

		skill := domain.Skills{}
		switch typ {
		case "languages":
			skill.Languages = append(skill.Languages, name)
		case "frameworks":
			skill.Frameworks = append(skill.Frameworks, name)
		case "others":
			skill.Others = append(skill.Others, name)
		default:
			return nil, fmt.Errorf("unknown skill type: %s", typ)
		}
		skills = append(skills, skill)
	}
	return skills, nil
}

func (r *mySQLAboutRepository) UpdateSkills(skill domain.Skills) error {
	tx, err := r.db.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()
	_, err = tx.Exec(`DELETE FROM technologies`)
	if err != nil {
		return fmt.Errorf("failed to delete old skills: %w", err)
	}
	stmt, err := tx.Prepare(`INSERT INTO technologies (id, name, type) VALUES (?, ?, ?)`)
	if err != nil {
		return fmt.Errorf("failed to prepare insert: %w", err)
	}
	defer stmt.Close()
	for _, name := range skill.Languages {
		if _, err = stmt.Exec(uuid.New().String(), name, "languages"); err != nil {
			return fmt.Errorf("failed to insert language skill: %w", err)
		}
	}
	for _, name := range skill.Frameworks {
		if _, err = stmt.Exec(uuid.New().String(), name, "frameworks"); err != nil {
			return fmt.Errorf("failed to insert framework skill: %w", err)
		}
	}
	for _, name := range skill.Others {
		if _, err = stmt.Exec(uuid.New().String(), name, "others"); err != nil {
			return fmt.Errorf("failed to insert other skill: %w", err)
		}
	}
	if err = tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
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
