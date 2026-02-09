# Online Quiz System

A complete full-stack quiz application built with Spring Boot and React.

## Features

- 🧠 **Quiz Creation** - Create quizzes with multiple-choice questions
- ⏱️ **Timed Assessments** - Set time limits for quiz completion
- 📊 **Score Evaluation** - Automatic scoring and percentage calculation
- 🏆 **Leaderboard** - Track and compare quiz results
- 📱 **Responsive UI** - Modern, mobile-friendly design

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3.2.3
- Spring Data MongoDB
- Spring Web
- Maven
- Swagger/OpenAPI for documentation

### Frontend
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

### Database
- MongoDB

## Architecture

```
Frontend (React + Vite)     Backend (Spring Boot)     Database (MongoDB)
     Port: 5173          →      Port: 8080         →      Port: 27017
                              REST API (/api/*)
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MongoDB running on localhost:27017

### 1. Clone the repository

```bash
git clone https://github.com/Adarsh0864/quiz-application.git
cd quiz-application
```

### 2. Start MongoDB

Ensure MongoDB is running on `mongodb://localhost:27017`

### 3. Start the Backend

```bash
./mvnw spring-boot:run
```

The backend will start on http://localhost:8080

### 4. Start the Frontend

```bash
cd quiz-frontend
npm install
npm run dev
```

The frontend will start on http://localhost:5173

## API Documentation

Once the backend is running, you can access:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Base URL**: http://localhost:8080/api

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quizzes` | Get all quizzes |
| POST | `/api/quizzes` | Create a new quiz |
| GET | `/api/quizzes/{id}` | Get quiz by ID |
| PUT | `/api/quizzes/{id}` | Update a quiz |
| DELETE | `/api/quizzes/{id}` | Delete a quiz |
| POST | `/api/quizzes/{id}/submit` | Submit quiz answers |
| GET | `/api/quizzes/{id}/leaderboard` | Get quiz leaderboard |

## Usage

1. **Create a Quiz**: Navigate to "Create Quiz" to add questions and set time limits
2. **Take a Quiz**: Select a quiz from the home page and enter your name to start
3. **View Results**: After submission, see your score and percentage
4. **Check Leaderboard**: View rankings and compare scores with other participants

## Project Structure

```
quiz-application/
├── src/main/java/com/example/Quiz/
│   ├── controller/         # REST controllers
│   ├── service/           # Business logic
│   ├── repository/        # Data access layer
│   ├── model/            # Entity classes
│   ├── dto/              # Data transfer objects
│   ├── config/           # Configuration classes
│   └── exception/        # Exception handling
├── quiz-frontend/
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # Reusable components
│   │   └── api.js        # API helper
│   └── package.json
└── pom.xml
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.