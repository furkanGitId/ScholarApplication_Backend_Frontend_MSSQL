# ScholarApp.WebApi

## 1. Project Overview

**ScholarApp.WebApi** is an ASP.NET Core Web API designed to manage and serve educational resources, user profiles, and academic workflows for a modern learning platform.  
The API provides endpoints for user registration, authentication, course management, and resource sharing.

**Business Purpose:**  
To enable educational institutions and learners to interact with digital content, manage courses, and track academic progress efficiently.

**Architecture Approach:**  
The project follows the **Clean Architecture** pattern, ensuring a clear separation of concerns, testability, and maintainability.

**Key Features:**
- User registration and authentication (JWT)
- Course and resource management
- Role-based authorization
- Validation and error handling
- Logging and monitoring

---

## 2. Tech Stack

- **.NET Version:** .NET 8
- **Framework:** ASP.NET Core Web API
- **ORM:** Entity Framework Core
- **Database:** SQL Server (configurable)
- **Authentication:** JWT Bearer Tokens
- **Logging:** Serilog
- **Validation:** FluentValidation
- **Mapping:** AutoMapper

---

## 3. Clean Architecture Overview

**Clean Architecture** organizes code into layers with clear boundaries:

- **Dependency Rule:**  
  Inner layers (Domain, Application) never depend on outer layers (Infrastructure, API).  
  Dependencies always point inward.

- **Separation of Concerns:**  
  Each layer has a single responsibility (e.g., business logic, data access, presentation).

- **Why Use It?**  
  - Makes code easier to test and maintain
  - Reduces coupling between business logic and frameworks
  - Supports long-term scalability

- **Dependency Flow:**  
  - Domain → Application → Infrastructure → API  
  - Only the API layer references Infrastructure and Application.  
  - Infrastructure implements interfaces defined in Application.

---

## 4. Solution Folder Structure
src/
├── ScholarApp.WebApi/ # API (Presentation Layer)
│ ├── Controllers/ # API endpoints
│ ├── Filters/ # Exception, validation filters
│ ├── Middleware/ # Custom middleware (e.g., error handling)
│ ├── Program.cs # Entry point, DI setup
│ └── appsettings.json # Configuration
│
├── ScholarApp.Application/ # Application Layer
│ ├── Interfaces/ # Service, repository contracts
│ ├── UseCases/Features/ # Business use cases (CQRS handlers)
│ ├── DTOs/ # Data transfer objects
│ ├── Validators/ # Request validators
│ ├── Mappings/ # AutoMapper profiles
│ └── Behaviors/ # Pipeline behaviors (e.g., logging, validation)
│
├── ScholarApp.Domain/ # Domain Layer
│ ├── Entities/ # Core business entities (e.g., User, Course)
│ ├── ValueObjects/ # Immutable value types
│ ├── Enums/ # Domain enums
│ ├── DomainEvents/ # Domain event classes
│ └── Interfaces/ # Domain contracts (rare, e.g., IAggregateRoot)
│
├── ScholarApp.Infrastructure/ # Infrastructure Layer
│ ├── Data/ # DbContext, migrations
│ ├── Repositories/ # Data access implementations
│ ├── ExternalServices/ # Integrations (e.g., email, storage)
│ └── Identity/ # Auth/JWT logic
│
└── ScholarApp.Shared/ # Shared Kernel (optional)
└── Common code, exceptions, utilities

### Project & Folder Details

#### ScholarApp.WebApi (API Layer)
- **Purpose:** Exposes HTTP endpoints, handles requests/responses.
- **Responsibilities:** Routing, input validation, error handling, authentication.
- **Should contain:** Controllers, filters, middleware, startup logic.
- **Should NOT contain:** Business logic, data access.
- **Example:** `UserController` handles user registration/login.

#### ScholarApp.Application (Application Layer)
- **Purpose:** Orchestrates business use cases.
- **Responsibilities:** Use case handlers, DTOs, validation, mapping.
- **Should contain:** CQRS handlers, interfaces, validators, mapping profiles.
- **Should NOT contain:** Entity Framework code, HTTP logic.
- **Example:** `RegisterUserCommandHandler` processes user registration.

#### ScholarApp.Domain (Domain Layer)
- **Purpose:** Core business logic and rules.
- **Responsibilities:** Entities, value objects, domain events.
- **Should contain:** Business entities, value objects, enums.
- **Should NOT contain:** Data access, framework dependencies.
- **Example:** `User` entity with validation logic.

#### ScholarApp.Infrastructure (Infrastructure Layer)
- **Purpose:** Implements data access and external integrations.
- **Responsibilities:** Repositories, DbContext, migrations, external services.
- **Should contain:** EF Core repositories, DbContext, JWT logic.
- **Should NOT contain:** Business logic, controllers.
- **Example:** `UserRepository` implements `IUserRepository`.

#### ScholarApp.Shared (Shared Kernel)
- **Purpose:** Common code shared across layers.
- **Responsibilities:** Shared exceptions, utilities.
- **Should contain:** Cross-cutting concerns.
- **Example:** `AppException` for consistent error handling.

---

## 5. Dependency Flow Explanation

- **Allowed References:**
  - API → Application, Infrastructure, Shared
  - Application → Domain, Shared
  - Infrastructure → Application, Domain, Shared
  - Shared → (no references)

- **Forbidden References:**
  - Domain cannot reference Application, Infrastructure, or API
  - Application cannot reference Infrastructure or API

- **Dependency Injection:**  
  All dependencies are registered in `Program.cs` (API layer) using built-in DI.  
  Infrastructure implementations are injected via interfaces defined in Application.

---

## 6. API Setup Instructions

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- SQL Server (or your configured database)

### Steps

1. **Clone the repository**
```bash
git clone <repo-url>
cd ScholarApp.WebApi

2. **Restore packages**
```bash
dotnet restore

3. **Configure connection strings**
   - Edit `appsettings.json` in `ScholarApp.WebApi` to set your database connection.

4. **Run database migrations**
```bash
dotnet ef database update --project ../ScholarApp.Infrastructure --startup-project .

5. **Run the API locally**
```bash
dotnet run --project ScholarApp.WebApi

6. **Environment-based configuration**
- Use `appsettings.Development.json` for local overrides.
- Set `ASPNETCORE_ENVIRONMENT` to `Development` for local development.

---

## 7. Configuration & Environment Management

- **appsettings.json:** Main configuration (connection strings, JWT settings,etc.)
- **appsettings.Development.json:** Local overrides (ignored by source control)
- **Secrets Management:** Use [dotnet user-secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets) for sensitive data in development.
- **Environment Variables:** Override settings for different environments (e.g., production).

---

## 8. Authentication & Authorization

- **Implementation:** JWT Bearer authentication via ASP.NET Core Identity (or custom JWT logic in Infrastructure).
- **JWT Logic Location:** `ScholarApp.Infrastructure/Identity/`
- **Protecting Endpoints:**  
- Use `[Authorize]` attribute on controllers/actions.
- Configure policies for role-based access.

---

## 9. Common Commands
```bash
dotnet restore                       
# Restore NuGet packages dotnet build                         
# Build the solution
```bash
dotnet run --project ScholarApp.WebApi   
# Run the API 
```bash
dotnet ef migrations add <Name> --project ../ScholarApp.Infrastructure --startup-project .   
# Add EF migration 
```bash
dotnet ef database update --project ../ScholarApp.Infrastructure --startup-project .         
# Apply migrations

---

## 10. Best Practices

- **Thin Controllers:**  
  Controllers should delegate to Application layer (use cases/handlers).

- **Business Logic Placement:**  
  All business rules go in Domain or Application layers, not in controllers or repositories.

- **Validation Strategy:**  
  Use FluentValidation in Application layer for request validation.

- **Exception Handling:**  
  Centralized error handling via middleware in API layer.

- **Logging:**  
  Use Serilog for structured logging. Log only necessary information.

- **API Versioning:**  
  Use ASP.NET Core API versioning if supporting multiple versions.

---

## 11. Contributing

Please see `CONTRIBUTING.md` for guidelines on code style, pull requests, and issue reporting.

---

## 12. License

This project is licensed under the MIT License.






