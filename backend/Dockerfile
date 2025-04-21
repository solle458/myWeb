# backend/Dockerfile
FROM golang:1.23-alpine AS builder

# Set working directory
WORKDIR /build

# Install necessary packages
RUN apk add --no-cache git

# Copy go.mod and go.sum files first to leverage Docker layer caching
COPY go.mod go.sum ./
RUN go mod tidy

# Copy the source code
COPY . .

# Build the application
ENV CGO_ENABLED=0 \
    GOOS=linux

RUN go build -o app ./cmd

# Create a minimal production image
FROM alpine:3.18

# Add ca-certificates for secure connections
RUN apk --no-cache add ca-certificates tzdata

# Set the working directory
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /build/app .

# ★★★ 修正点: ビルドステージから config ディレクトリをコピー ★★★
COPY --from=builder /build/config ./config
# ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

# Set executable permissions
RUN chmod +x /app/app

# Expose the port the app will run on (ポート番号を環境変数や .env に合わせる)
EXPOSE 8080

# Command to run the executable
CMD ["./app"]
