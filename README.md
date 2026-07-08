# JanConnect

JanConnect is a full-stack web application designed with a modern glassmorphism aesthetic. It provides a platform for users to connect, featuring secure Google OAuth authentication, role-based access control, user feedback, and interactive elements like a leaderboard.

## Features

- **Modern UI/UX**: Responsive glassmorphism design (optimized up to 1500px wide) with a sticky header, integrated search, and dynamic mini-leaderboard sidebar.
- **Authentication**: Secure Google OAuth integration using Spring Security and JWT for session management.
- **Role-Based Access Control**: Protected Admin Dashboard for elevated user roles to manage feedback and administrative tasks.
- **Interactive Community**: Commenting system with user-specific deletion capabilities and a persistent leaderboard.
- **Responsive Design**: Tailored for both desktop and mobile viewing with collapsible elements (e.g., developer tools).

## Tech Stack

### Frontend
- HTML5, Vanilla JavaScript, CSS3
- **Vite** for fast, modern frontend build tooling
- Dynamic environment variable configuration for API routing

### Backend
- **Java Spring Boot 3**
- **Spring Security** (OAuth2 Client) & **JWT** (jjwt) for robust authentication
- **Spring Data JPA** & **PostgreSQL** for data persistence

## Prerequisites

- **Java 17+** (Spring Boot requirement)
- **Node.js 18+** (for Vite frontend)
- **PostgreSQL** database

## Getting Started

### Backend Setup

1. Navigate to the root directory.
2. Ensure you have your PostgreSQL database running and update the `application.yml` or `application.properties` with your database credentials and Google OAuth client ID/secret.
3. Build and run the Spring Boot application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Create a `.env` file in the `frontend` directory with your backend URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```
4. Run the Vite development server:
   ```bash
   npm run dev
   ```

## Deployment

The application is configured to easily transition between local development and production environments. 
- The backend is optimized for deployment on platforms like **Render**.
- Ensure the `VITE_API_BASE_URL` in your production frontend is pointed to the deployed backend URL (e.g., `https://janconnect-bre5.onrender.com`).
- CORS and `withCredentials: true` are configured to handle cross-origin authentication seamlessly.

## License

This project is licensed under the MIT License.
