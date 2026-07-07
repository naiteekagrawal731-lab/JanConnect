# ---------- Build Frontend ----------
FROM node:22 AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build


# ---------- Build Backend ----------
FROM maven:3.9.9-eclipse-temurin-25 AS backend-build

WORKDIR /backend

COPY backend/pom.xml .
COPY backend/.mvn .mvn
COPY backend/mvnw .
RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline

COPY backend/src src

# Copy frontend build into Spring Boot static folder
COPY --from=frontend-build /frontend/dist src/main/resources/static

RUN ./mvnw clean package -DskipTests


# ---------- Runtime ----------
FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=backend-build /backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]