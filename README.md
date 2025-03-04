
# Task Management Application

A full-stack task management application with a Flutter frontend and Node.js backend.

## Features

- User Authentication (Sign up/Login)
- Create and manage tasks
- Offline capability with local data persistence
- Task synchronization when online
- Color-coded tasks
- Due date scheduling

## Tech Stack

### Frontend
- Flutter for cross-platform mobile development
- Bloc pattern for state management
- SQLite for local data storage
- HTTP package for API communication

### Backend
- Node.js with Express
- PostgreSQL with Drizzle ORM
- JWT for authentication
- BCrypt for password hashing

## Getting Started

### Prerequisites
- Flutter SDK
- Node.js
- PostgreSQL

### Backend Setup
1. Navigate to backend directory:
```sh
cd backend
```

2. Install dependencies:
```sh
npm install
```

3. Run development server:
```sh
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory:
```sh
cd frontend
```

2. Install dependencies:
```sh
flutter pub get
```

3. Run the app:
```sh
flutter run
```

### Environment Setup

1. Create a `.env` file in the backend directory:
```sh
cp .env.example .env
```

2. Update the environment variables:
```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/taskdb
JWT_SECRET=your_jwt_secret
```

## Project Structure

```
task-app/
├── frontend/
│   ├── lib/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── tasks/
│   │   ├── core/
│   │   └── models/
│   ├── test/
│   └── pubspec.yaml
└── backend/
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── models/
    │   └── middleware/
    ├── package.json
    └── tsconfig.json
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/` | Get user profile with token |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Testing

### Running Backend Tests
```sh
cd backend
npm run test
```

### Running Frontend Tests
```sh
cd frontend
flutter test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/task-app](https://github.com/yourusername/task-app)