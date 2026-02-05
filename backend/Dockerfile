# Use the official .NET 8 SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution file
COPY ["ScholarApp.sln", "./"]

# Copy all csproj files
COPY ["ScholarApp.WebApi/*.csproj", "ScholarApp.WebApi/"]
COPY ["ScholarApp.Application/*.csproj", "ScholarApp.Application/"]
COPY ["ScholarApp.Domain/*.csproj", "ScholarApp.Domain/"]
COPY ["ScholarApp.Infrastructure/*.csproj", "ScholarApp.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "ScholarApp.sln"

# Copy the rest of the source code
COPY . .

# Build and publish the WebApi project
WORKDIR /src/ScholarApp.WebApi
RUN dotnet publish "ScholarApp.WebApi.csproj" -c Release -o /app/publish

# Use the official .NET 8 runtime image for the final container
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Set environment variable to listen on port 80
ENV ASPNETCORE_URLS=http://+:80

# Expose port 80
EXPOSE 80

# Set the entry point
ENTRYPOINT ["dotnet", "ScholarApp.WebApi.dll"]