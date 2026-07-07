# ---------- Frontend Build ----------
FROM node:22-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build


# ---------- Backend Build ----------
FROM eclipse-temurin:25-jdk AS backend-build

WORKDIR /app

COPY backend/ .

# Make Maven wrapper executable
RUN chmod +x mvnw

# Copy frontend build into Spring Boot static resources
RUN mkdir -p src/main/resources/static
COPY --from=frontend-build /frontend/dist/ src/main/resources/static/

# Build Spring Boot application
RUN ./mvnw clean package -DskipTests


# ---------- Runtime ----------
FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]