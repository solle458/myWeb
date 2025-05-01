package service

import (
	"context"
	"log"
	"mime/multipart"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

type CloudinaryService interface {
	UploadImage(ctx context.Context, file multipart.File, fileName string) (string, error)
	DeleteImage(ctx context.Context, publicID string) error
}

type cloudinaryService struct {
	cloudinary *cloudinary.Cloudinary
}

func NewCloudinaryService(cld *cloudinary.Cloudinary) CloudinaryService {
	return &cloudinaryService{
		cloudinary: cld,
	}
}

func (c *cloudinaryService) UploadImage(ctx context.Context, file multipart.File, fileName string) (string, error) {
	uploadParams := uploader.UploadParams{
		PublicID: fileName,
	}

	uploadResult, err := c.cloudinary.Upload.Upload(ctx, file, uploadParams)
	if err != nil {
		log.Printf("Failed to upload image: %v", err)
		return "", err
	}
	return uploadResult.SecureURL, nil
}

func (c *cloudinaryService) DeleteImage(ctx context.Context, publicID string) error {
	_, err := c.cloudinary.Upload.Destroy(ctx, uploader.DestroyParams{
		PublicID: publicID,
	})
	if err != nil {
		log.Printf("Failed to delete image: %v", err)
		return err
	}
	return nil
}
