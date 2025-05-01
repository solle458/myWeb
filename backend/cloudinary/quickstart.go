package main

import (
	"context"
	"log"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func main() {
	cld, err := cloudinary.NewFromParams("<your-cloud-name>", "<your-api-key>", "<your-api-secret>")
	if err != nil {
		log.Fatalf("Failed to initialize Cloudinary client: %v", err)
	}

	ctx := context.Background()
	resp, err := cld.Upload.Upload(ctx, "my_picture.png", uploader.UploadParams{
		PublicID: "my_image",
	})
	if err != nil {
		log.Fatalf("Failed to upload image: %v", err)
	}

	log.Printf("Image uploaded successfully: %+v\n", resp)
	log.Printf("Secure URL: %s\n", resp.SecureURL)
}
