# ScholarApplication_Backend_Frontend_MSSQL

A full-stack scholarship application system consisting of a Backend API, Frontend client, and Microsoft SQL Server (MSSQL) database. This repository contains both backend and frontend code and database artifacts required to run the application locally and in production.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started (Local Development)](#getting-started-local-development)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Configure environment variables](#2-configure-environment-variables)
  - [3. Start MSSQL (Docker)](#3-start-mssql-docker)
  - [4. Run Backend](#4-run-backend)
  - [5. Run Frontend](#5-run-frontend)
- [Database setup & migrations](#database-setup--migrations)
- [Running with Docker Compose (recommended)](#running-with-docker-compose-recommended)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

This application streamlines scholarship applications: applicants can register, submit applications, upload supporting documents, and administrators can review, shortlist, and award scholarships. The backend exposes a RESTful API and handles authentication, validation, and persistence in MSSQL. The frontend is a single-page application for applicants and admins.

## Key Features

- Applicant registration & authentication
- Application form with file uploads
- Admin dashboard for reviewing and managing applications
- Role-based access control (applicant, reviewer, admin)
- Email notifications (configurable)
- Database migrations and seed data

## Architecture & Tech Stack

- Backend: (e.g., Node.js + Express or ASP.NET Core) — replace with actual framework used
- Frontend: (e.g., React, Angular, or Vue) — replace with actual framework used
- Database: Microsoft SQL Server (MSSQL)
- Authentication: JWT or session-based (customize to your implementation)
- Optional: Docker and Docker Compose for local and production deployments

> NOTE: Replace the placeholder framework names above with the actual technologies used in this repository.

## Prerequisites

- Git >= 2.20
- Node.js >= 14 (if frontend/backend use Node) or .NET SDK (if backend is .NET)
- Docker & Docker Compose (recommended for MSSQL)
- An MSSQL client (optional) like Azure Data Studio or SQL Server Management Studio

## Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/furkanGitId/ScholarApplication_Backend_Frontend_MSSQL.git
cd ScholarApplication_Backend_Frontend_MSSQL
```

### 2. Configure environment variables

Create `.env` files for each service (backend and frontend) using the example templates below.

Backend `.env.example` (adjust keys to your project):

```env
# Backend environment variables
NODE_ENV=development
PORT=4000
DATABASE_HOST=localhost
DATABASE_PORT=1433
DATABASE_USER=sa
DATABASE_PASSWORD=YourStrong!Passw0rd
DATABASE_NAME=ScholarDb
JWT_SECRET=replace_this_with_a_secure_secret
EMAIL_PROVIDER=smtp
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=example@example.com
EMAIL_PASS=supersecret
```

Frontend `.env.example` (adjust keys to your project):

```env
REACT_APP_API_URL=http://localhost:4000/api
```

### 3. Start MSSQL (Docker)

This will start a local SQL Server instance with default credentials. Update credentials to match your `.env` if different.

```bash
# Start a local MSSQL container
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Passw0rd" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

Or use Docker Compose (see the `docker-compose.yml` below).

### 4. Run Backend

Navigate to the backend folder and follow the commands used by your stack. Example for a Node.js Express backend:

```bash
cd backend
npm install
npm run migrate   # run DB migrations (if configured)
npm run dev       # start development server
```

For .NET backend example:

```bash
cd backend
dotnet restore
dotnet ef database update   # apply migrations
dotnet watch run            # run development server
```

### 5. Run Frontend

Navigate to the frontend folder and run the dev server. Example for React:

```bash
cd frontend
npm install
npm start
```

Open your browser at http://localhost:3000 (or the port your frontend uses).

## Database setup & migrations

If your backend uses a migration tool (TypeORM, Sequelize, EF Core, Flyway, Liquibase, etc.), run the migrations after the database is available.

Example commands:

- TypeORM/Sequelize: `npm run migrate` or `npx sequelize db:migrate`
- EF Core: `dotnet ef database update`

Seed data: Add commands or scripts used to seed initial roles and admin accounts.

## Running with Docker Compose (recommended)

Create a `docker-compose.yml` that defines `backend`, `frontend`, and `mssql` services. Example snippet to get started:

```yaml
version: '3.8'
services:
  mssql:
    image: mcr.microsoft.com/mssql/server:2019-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong!Passw0rd
    ports:
      - "1433:1433"
    healthcheck:
      test: ["CMD-SHELL", "/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $${SA_PASSWORD} -Q \"SELECT 1\""]
      interval: 10s
      timeout: 10s
      retries: 10

  backend:
    build: ./backend
    environment:
      - DATABASE_HOST=mssql
      - DATABASE_USER=sa
      - DATABASE_PASSWORD=YourStrong!Passw0rd
      - DATABASE_NAME=ScholarDb
    ports:
      - "4000:4000"
    depends_on:
      mssql:
        condition: service_healthy

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:4000/api
```

Adjust paths, ports, and build contexts to match your repository structure.

## Testing

Describe how to run unit, integration, and e2e tests. Example:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

Add any test coverage commands and badges if desired.

## Linting & Formatting

Add instructions for linting and formatting. Example:

```bash
# Lint
npm run lint

# Format
npm run format
```

## API Documentation

If you use Swagger/OpenAPI, include instructions to view it. Example:

- Start the backend and open http://localhost:4000/api/docs or http://localhost:4000/swagger
- Or point to the `openapi.yaml`/`swagger.json` in the repo

## Deployment

High-level steps for deploying to production:

- Build frontend (e.g., `npm run build`) and serve via CDN or static host
- Build backend into a Docker image and deploy to your cloud provider (AKS, ECS, GKE, or VM)
- Use managed MSSQL (Azure SQL or AWS RDS for SQL Server) or a secure self-managed cluster
- Configure environment variables and secrets in your deployment environment

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes and push to your fork
4. Open a pull request with a clear description of your changes

Add any code style, commit message, and testing requirements specific to the project.

## License

Specify the project license here (e.g., MIT). If you want me to add a license file, I can create one.

## Contact

Maintainer: furkanGitId

If you'd like, I can:
- Customize the README with exact commands for the backend and frontend frameworks used in this repo
- Add badges (build, coverage, license)
- Create a Docker Compose file and sample `.env` files and push them to the repository