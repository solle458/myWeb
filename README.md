# MyWeb Application

## Docker Setup Instructions

### Prerequisites
- Docker
- Docker Compose
- Make (optional, for Makefile commands)

### Quick Start

1. **Setup your environment**
   ```bash
   cp .env-template .env
   # Edit .env file with your configuration
   ```

2. **Start the services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Backend API: http://localhost:8080

### Using the Makefile

The project includes a Makefile to simplify common operations:

- **Setup environment**: `make setup`
- **Start all services**: `make start`
- **View logs**: `make logs`
- **Stop services**: `make down`
- **Restart services**: `make restart`
- **Clean up**: `make clean`

### Manual Database Management

If you need to run migrations manually:
```bash
make migrate
```

### Accessing the MySQL Database

```bash
docker-compose exec mysql mysql -u${DB_USER} -p${DB_PASSWORD} ${DB_NAME}
```

### Environment Variables

The `.env` file contains important configuration:

- `PORT`: Application port (default: 8080)
- `TO_EMAIL`: Email address to receive contact form submissions
- `DB_HOST`: MySQL host (default: mysql)
- `DB_PORT`: MySQL port (default: 3306)
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_ROOT_PASSWORD`: MySQL root password

### Project Structure

```
backend/
├── cmd/                  # Application entry point
│   ├── main.go
│
├── config/               # Configuration files
│   ├── config.go
│   ├── .env
│   ├── credentials.json
│   ├── token.json
│
├── internal/             # Business logic
│   ├── domain/           # Domain models
│   ├── usecase/          # Use cases
│   ├── repository/       # Data access
│   ├── handler/          # HTTP routing and request handling
│   ├── service/          # External services
│
├── infrastructure/       # Database and middleware setup
│   ├── db.go
│
├── db/                   # Migration files
│   ├── migration/
│       ├── 001_create_contacts.sql
```
