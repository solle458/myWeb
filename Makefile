# Makefile

# Variables
DC = docker compose
GO = go

# Default target
.PHONY: all
all: build

# Build the app
.PHONY: build
build:
	$(GO) build -o ./backend/app ./backend/cmd

# Run the project locally
.PHONY: run
run:
	$(GO) run ./backend/cmd

# Start docker containers
.PHONY: up
up:
	$(DC) up -d

# Stop docker containers
.PHONY: down
down:
	$(DC) down

# View logs
.PHONY: logs
logs:
	$(DC) logs -f

# Restart services
.PHONY: restart
restart:
	$(DC) restart

# Clean up
.PHONY: clean
clean:
	$(DC) down -v
	rm -f ./backend/app

# Setup environment
.PHONY: setup
setup:
	[ -f .env ] || cp .env-template .env
	@echo "Please edit .env file with your configuration"

# Build and start everything
.PHONY: start
start: setup build up
	@echo "Application started at http://localhost:$(shell grep PORT .env | cut -d= -f2)"
