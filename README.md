## Docker Compose — Useful commands

Below are common docker-compose commands you'll use during development and troubleshooting along with examples tailored to this repository.

Notes:
- Replace service names (`backend`, `frontend`, `mssql`) and command details with the actual names used in your `docker-compose.yml` if they differ.
- Commands assume you're running them from the repository root where `docker-compose.yml` is located.

1. Start everything (build images if needed) in detached mode

   ```bash
docker-compose up --build -d
```  

2. Start a single service (useful for only running the database or backend)

   ```bash
docker-compose up -d mssql
```  

3. Rebuild a single service and restart it

   ```bash
docker-compose up -d --build backend
```  

4. Follow logs for one or more services

   ```bash
docker-compose logs -f backend
# or multiple

docker-compose logs -f backend frontend
```  

5. Show running containers for the compose project

   ```bash
docker-compose ps
```  

6. Execute a shell inside a running container (use `bash` if available, otherwise `sh`)

   ```bash
docker-compose exec backend sh
# or bash

docker-compose exec backend bash
```  

7. Run a one-off command in a new container (useful for migrations or seed scripts)

   ```bash
docker-compose run --rm backend npm run migrate
# or for .NET EF Core

docker-compose run --rm backend dotnet ef database update
```  

8. Apply database migrations safely from your host by running the migration command inside the backend container

   ```bash
# Start the compose stack (ensure mssql is up), then:
 docker-compose exec backend npm run migrate
```

9. Run SQL commands directly against the MSSQL container (useful for quick checks)

   ```bash
docker-compose exec mssql /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "YourStrong!Passw0rd" -Q "SELECT name FROM sys.databases;"
```  

10. Stop and remove containers, networks, images created by up

   ```bash
docker-compose down
```  

11. Stop and remove containers, networks, AND volumes (useful to reset DB state)

   ```bash
docker-compose down --volumes --remove-orphans
```  

12. Pull latest images for services that use public images

   ```bash
docker-compose pull
```  

13. Build images without using cache (useful when Docker caches cause issues)

   ```bash
docker-compose build --no-cache
```  

14. Restart a service

   ```bash
docker-compose restart backend
```  

15. Scale a service (legacy local feature; for production use Swarm/Kubernetes)

   ```bash
docker-compose up -d --scale worker=3
```  

16. Common troubleshooting tips

- Use `docker-compose logs -f service` to tail logs and identify issues.
- Use `docker-compose exec service ps aux` to inspect running processes inside a container.
- If a service depends on the DB, check the DB health with the healthcheck command or `sqlcmd` above.
- If migrations fail due to timing, ensure the DB container has fully started before running migration commands (use a small script or wait-for-it utility).

17. Optional: Add handy Makefile targets

   ```makefile
.PHONY: up down build logs migrate shell

up:
	@docker-compose up --build -d

down:
	@docker-compose down --volumes --remove-orphans

build:
	@docker-compose build

logs:
	@docker-compose logs -f

migrate:
	@docker-compose run --rm backend npm run migrate

shell:
	@docker-compose exec backend sh
``` 

Add these targets in a `Makefile` at the repository root to simplify common workflows.
