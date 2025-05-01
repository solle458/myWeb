package infrastructure

import (
	"github.com/cloudinary/cloudinary-go/v2"

	"backend/config"
)

func NewCloudinary(cfg *config.CloudinaryConfig) (*cloudinary.Cloudinary, error) {
	return cloudinary.NewFromParams(cfg.CLOUD_NAME, cfg.API_KEY, cfg.API_SECRET)
}
