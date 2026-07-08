<h1 align="center">
  <br>
  JanConnect
  <br>
</h1>

<h4 align="center">A dynamic community feedback platform bridging the gap between citizens and authorities.</h4>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#folder-structure">Folder Structure</a> •
  <a href="#installation">Installation</a> •
  <a href="#api-documentation">API Documentation</a> •
  <a href="#database-design">Database Design</a> •
  <a href="#security">Security</a>
</p>

---

## 📖 Overview

JanConnect is a full-stack platform designed to facilitate secure and transparent communication between citizens and administrators. By leveraging modern web technologies, JanConnect allows users to submit feedback, vote on community issues, and participate in discussions, all while providing administrators with the tools to manage and review these interactions seamlessly.

## ✨ Features

- **🔐 Secure Authentication**: OAuth2 integration with Google and robust JWT-based session management.
- **🛡️ Role-Based Access Control**: Strict segregation between standard Users and Admins, with a dedicated Admin Dashboard.
- **📝 Feedback Management**: Users can create, view, and vote on feedback. Admins can moderate and manage submissions.
- **💬 Interactive Discussions**: A real-time commenting system on feedback with secure user-specific deletion capabilities.
- **🏆 Dynamic Leaderboards**: Gamified elements showing top contributors and trending feedback.
- **🎨 Glassmorphism UI**: A stunning, modern, and responsive user interface built without heavy frontend frameworks.

## 💻 Tech Stack

| Category        | Technology                                                                 |
|-----------------|----------------------------------------------------------------------------|
| **Backend**     | Java, Spring Boot 3, Spring Security, OAuth2, JWT                          |
| **Frontend**    | HTML5, Vanilla JavaScript, CSS3 (Glassmorphism), Vite                      |
| **Database**    | PostgreSQL, Spring Data JPA                                                |
| **Tools**       | Maven, Render (Deployment), Git, Docker (optional)                         |

## 🏗️ Architecture

JanConnect follows a robust Client-Server architecture. The frontend is a Single Page Application (SPA) built with Vanilla JS and Vite, serving as the presentation layer. It communicates asynchronously via REST APIs to the Spring Boot backend. 

The backend acts as the core processor, handling business logic, database transactions via Spring Data JPA, and security mechanisms using Spring Security and JWT.

```text
+-------------------+        HTTP/REST         +-----------------------+
|                   |   (JSON over HTTPS)      |                       |
|  Vite Frontend    | <----------------------> |  Spring Boot Backend  |
|  (Vanilla JS/CSS) |                          |  (REST API, Security) |
|                   |                          |                       |
+-------------------+                          +-----------+-----------+
                                                           |
                                                           | JDBC
                                                           v
                                               +-----------------------+
                                               |                       |
                                               | PostgreSQL Database   |
                                               |                       |
                                               +-----------------------+
```

## 📸 Screenshots

*Placeholders for your stunning UI screenshots.*

<details>
<summary><b>View Screenshots</b></summary>
<br>

![Home](docs/images/home.png)
*Homepage with Leaderboard*

![Admin Dashboard](docs/images/admin.png)
*Role-protected Admin Dashboard*

</details>

## 📁 Folder Structure

```text
JanConnect/
├── frontend/                  # Vite-based frontend
│   ├── index.html             # Main entry point
│   ├── package.json           # Frontend dependencies
│   ├── src/                   # JS and CSS source files
│   └── vite.config.js         # Vite configuration
├── src/
│   └── main/java/com/example/JanConnect/
│       ├── configs/           # Global and Security configurations
│       ├── controllers/       # REST API Endpoints
│       ├── dtos/              # Data Transfer Objects
│       ├── entities/          # JPA Models (User, Feedback, Comment)
│       ├── exceptions/        # Global Exception Handlers
│       ├── filters/           # JWT & Auth Filters
│       ├── repos/             # Spring Data JPA Repositories
│       ├── security/          # Security utilities (JWT)
│       └── services/          # Core Business Logic
├── pom.xml                    # Maven dependencies
└── README.md                  # Project Documentation
```

## 🚀 Installation

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/JanConnect.git
cd JanConnect
```

### 2. Backend Setup

Configure your PostgreSQL database and update your credentials in the Spring Boot `application.yml` or `application.properties`. You also need to set up Google OAuth credentials.

Run the backend:
```bash
./mvnw spring-boot:run
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

## 🌍 Environment Variables

Create a `.env` file in the `frontend` directory:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | The base URL of the Spring Boot backend API. | `http://localhost:8080` |

## 🔌 API Documentation

Here is an overview of the core REST controllers and their endpoints:

### Authentication & Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/auth/token` | Retrieve current JWT access token |
| `POST` | `/api/login/usernamepassword` | Standard login with credentials |
| `POST` | `/api/logout` | Invalidate current session/token |
| `POST` | `/api/changepassword` | Securely change user password |

### Feedback (`FeedbackController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/feedback` | Retrieve paginated feedback |
| `GET` | `/feedback/{feedbackId}` | Retrieve a specific feedback by ID |
| `GET` | `/feedback/title` | Search feedback by title |
| `POST` | `/feedback` | Create new feedback (multipart for attachments) |
| `GET` | `/feedback/Allfeedback` | Retrieve all feedback (Admin) |

### Comments (`CommentController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/comments` | Retrieve comments for a feedback |
| `POST` | `/comments/add` | Add a new comment |
| `DELETE` | `/comments` | Delete a comment (must be owner or Admin) |

### Votes (`VoteController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/vote/{feedbackId}` | Upvote/Downvote a specific feedback |

### Admin (`AdminController`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/all` | Get all admin-level statistics/data |
| `POST` | `/admin/create` | Create a new admin account |
| `DELETE` | `/admin/delete` | Delete an entity administratively |

## 🗄️ Database Design

Core entities mapped via Spring Data JPA to PostgreSQL:

- **User**: Core entity managing identity, roles (`ROLE_USER`, `ROLE_ADMIN`), and OAuth details.
- **Feedback**: Represents a user-submitted issue or suggestion. Links to `User` (author) and `Attachment`.
- **Comment**: Represents discussions on a `Feedback`.
- **FeedbackVote**: Tracks upvotes/downvotes by `User` on `Feedback`.
- **Message**: Represents direct communications or notifications.

## 🔒 Security

JanConnect takes security seriously:
- **Stateless Sessions**: Employs robust JWT (JSON Web Tokens) for authenticating API requests.
- **OAuth2**: Supports secure Google Login via Spring Security OAuth2 client.
- **Role-Based Filtering**: Custom Spring Security filters intercept requests to ensure endpoints like `/admin/**` are strictly inaccessible to standard users.
- **CORS Configuration**: Explicitly configured for secure cross-origin interaction between the separated Vite frontend and Spring Boot backend using `withCredentials: true`.

## ⚡ Performance Optimizations

- **Vite Bundling**: Frontend assets are efficiently bundled and minified for rapid loading.
- **JPA Fetch Strategies**: Optimized lazy loading of related database entities to prevent N+1 query issues.
- **Stateless Auth**: Reducing database hits on every request by validating signed JWTs in-memory.

## 🛤️ Future Improvements

- [ ] Implement Redis caching for the Leaderboard and top Feedback.
- [ ] Add WebSocket support for real-time comment and vote updates.
- [ ] Migrate the frontend Vanilla JS to a structured framework like React or Vue for scalability.
- [ ] Implement an automated CI/CD pipeline using GitHub Actions.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](#).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## ✍️ Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgements

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Vite](https://vitejs.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Render](https://render.com/)

---
<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
</p>
<p align="center">
  <img src="https://img.shields.io/github/license/yourusername/JanConnect?style=flat-square" />
  <img src="https://img.shields.io/github/stars/yourusername/JanConnect?style=flat-square" />
  <img src="https://img.shields.io/github/forks/yourusername/JanConnect?style=flat-square" />
</p>
