# Zidio Connect Backend - Docker Setup

This document explains how to build and run the Zidio Connect Backend microservices using Docker.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Java 21 (for local development)
- Maven (for building the project)

## Project Structure

The Zidio Connect Backend consists of the following microservices:

- API Gateway
- Service Admin
- Service User
- Service Application
- Service Job
- Service Analytics
- Common (shared library)

## Building the Project

Before running the Docker containers, you need to build the project with Maven:

```bash
cd backend
mvn clean package
```

This will create JAR files for each microservice in their respective `target` directories.

## Docker Setup

### Using Docker Compose (Recommended)

The easiest way to run all microservices is using Docker Compose:

```bash
cd backend
docker-compose up -d
```

This will:
1. Build Docker images for all services
2. Start containers for each microservice
3. Set up the network between services
4. Map the ports to your host machine

To stop all services:

```bash
docker-compose down
```

### Using Docker Directly

If you prefer to run services individually:

1. Build the Docker image:
   ```bash
   cd backend
   docker build -t zidio-connect-backend .
   ```

2. Run individual services:
   ```bash
   # API Gateway
   docker run -p 8080:8080 -e SERVER_PORT=8080 zidio-connect-backend java -jar /app/api-gateway.jar
   
   # Service Admin
   docker run -p 8081:8081 -e SERVER_PORT=8081 zidio-connect-backend java -jar /app/service-admin.jar
   
   # Service User
   docker run -p 8082:8082 -e SERVER_PORT=8082 zidio-connect-backend java -jar /app/service-user.jar
   
   # Service Application
   docker run -p 8083:8083 -e SERVER_PORT=8083 zidio-connect-backend java -jar /app/service-application.jar
   
   # Service Job
   docker run -p 8084:8084 -e SERVER_PORT=8084 zidio-connect-backend java -jar /app/service-job.jar
   
   # Service Analytics
   docker run -p 8085:8085 -e SERVER_PORT=8085 zidio-connect-backend java -jar /app/service-analytics.jar
   ```

## Accessing the Services

Once running, the services will be available at:

- API Gateway: http://localhost:8080
- Service Admin: http://localhost:8081
- Service User: http://localhost:8082
- Service Application: http://localhost:8083
- Service Job: http://localhost:8084
- Service Analytics: http://localhost:8085

## Health Checks

The API Gateway has a health check endpoint at:
```
http://localhost:8080/actuator/health
```

## Troubleshooting

If you encounter issues:

1. Check container logs:
   ```bash
   docker logs <container_id>
   ```

2. Ensure all required ports are available on your host machine

3. Verify that the JAR files were built correctly before running Docker

4. Check network connectivity between containers:
   ```bash
   docker network inspect zidio-network
   ```