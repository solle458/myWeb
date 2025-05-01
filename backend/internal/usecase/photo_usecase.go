package usecase

import (
	"context"
	"mime/multipart"

	"backend/internal/domain"
	"backend/internal/repository"
	"backend/internal/service"
)

type PhotoUseCase interface {
	HandleSubmitPhoto(photo domain.Photo, file multipart.File) error
	HandleDeletePhoto(id string) error
	GetPhotoById(id string) (*domain.Photo, error)
	GetAllPhotos() ([]domain.Photo, error)
}

type photoUseCase struct {
	photoRepo         repository.PhotoRepository
	cloudinaryService service.CloudinaryService
}

func NewPhotoUseCase(photoRepo repository.PhotoRepository, cloudinaryService service.CloudinaryService) PhotoUseCase {
	return &photoUseCase{
		photoRepo:         photoRepo,
		cloudinaryService: cloudinaryService,
	}
}

func (u *photoUseCase) HandleSubmitPhoto(photo domain.Photo, file multipart.File) error {
	// Upload photo to Cloudinary
	ctx := context.Background()
	uploadedURL, err := u.cloudinaryService.UploadImage(ctx, file, photo.ID)
	if err != nil {
		return err
	}

	// Save photo to repository
	photo.ImageURL = uploadedURL
	if err := u.photoRepo.SavePhoto(photo); err != nil {
		return err
	}

	return nil
}

func (u *photoUseCase) HandleDeletePhoto(id string) error {
	// Delete photo from Cloudinary
	ctx := context.Background()
	if err := u.cloudinaryService.DeleteImage(ctx, id); err != nil {
		return err
	}

	// Delete photo from repository
	if err := u.photoRepo.DeletePhoto(id); err != nil {
		return err
	}

	return nil
}

func (u *photoUseCase) GetPhotoById(id string) (*domain.Photo, error) {
	photo, err := u.photoRepo.GetPhotoById(id)
	if err != nil {
		return nil, err
	}
	return photo, nil
}

func (u *photoUseCase) GetAllPhotos() ([]domain.Photo, error) {
	photos, err := u.photoRepo.GetAllPhotos()
	if err != nil {
		return nil, err
	}
	return photos, nil
}
