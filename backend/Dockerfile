# STAGE 1: Build all Maven modules
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
COPY common/pom.xml ./common/pom.xml
COPY api-gateway/pom.xml ./api-gateway/pom.xml
COPY service-admin/pom.xml ./service-admin/pom.xml
COPY service-user/pom.xml ./service-user/pom.xml
COPY service-application/pom.xml ./service-application/pom.xml
COPY service-job/pom.xml ./service-job/pom.xml
COPY service-analytics/pom.xml ./service-analytics/pom.xml
RUN mvn dependency:go-offline -B
COPY . .
RUN mvn clean install -DskipTests

# STAGE 2: Create image for api-gateway
FROM eclipse-temurin:21-jre-alpine AS api-gateway
WORKDIR /app
COPY --from=builder /app/api-gateway/target/api-gateway.jar .
ENTRYPOINT ["java", "-jar", "api-gateway.jar"]

# STAGE 3: Create image for service-admin
FROM eclipse-temurin:21-jre-alpine AS service-admin
WORKDIR /app
COPY --from=builder /app/service-admin/target/service-admin.jar .
ENTRYPOINT ["java", "-jar", "service-admin.jar"]

# STAGE 4: Create image for service-user
FROM eclipse-temurin:21-jre-alpine AS service-user
WORKDIR /app
COPY --from=builder /app/service-user/target/service-user.jar .
ENTRYPOINT ["java", "-jar", "service-user.jar"]

# STAGE 5: Create image for service-application
FROM eclipse-temurin:21-jre-alpine AS service-application
WORKDIR /app
COPY --from=builder /app/service-application/target/service-application.jar .
ENTRYPOINT ["java", "-jar", "service-application.jar"]

# STAGE 6: Create image for service-job
FROM eclipse-temurin:21-jre-alpine AS service-job
WORKDIR /app
COPY --from=builder /app/service-job/target/service-job.jar .
ENTRYPOINT ["java", "-jar", "service-job.jar"]

# STAGE 7: Create image for service-analytics
FROM eclipse-temurin:21-jre-alpine AS service-analytics
WORKDIR /app
COPY --from=builder /app/service-analytics/target/service-analytics.jar .
ENTRYPOINT ["java", "-jar", "service-analytics.jar"]
