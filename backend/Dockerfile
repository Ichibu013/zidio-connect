FROM eclipse-temurin:21-jdk

LABEL maintainer="Zidio Connect Team"

# Set working directory
WORKDIR /app

# Copy the jar files from each module
COPY api-gateway/target/api-gateway.jar /app/api-gateway.jar
COPY service-admin/target/service-admin.jar /app/service-admin.jar
COPY service-user/target/service-user.jar /app/service-user.jar
COPY service-application/target/service-application.jar /app/service-application.jar
COPY service-job/target/service-job.jar /app/service-job.jar
COPY service-analytics/target/service-analytics.jar /app/service-analytics.jar
COPY common/target/common.jar /app/common.jar

# Copy application configuration
COPY src/main/resources/application.yml /app/application.yml

# Create volume for temporary files
VOLUME /tmp

# Expose the ports for each service
EXPOSE 8080 8081 8082 8083 8084 8085 8086

# Set Java options
ENV JAVA_OPTS="-Djava.security.egd=file:/dev/./urandom -Xms512m -Xmx1g"

# Set the startup command
CMD ["java", "-jar", "api-gateway.jar"]

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8080/actuator/health || exit 1