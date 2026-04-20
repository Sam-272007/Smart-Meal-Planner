# Smart Meal Planner - Backend API

A production-ready Node.js/Express backend for the Smart Meal Planner application with PostgreSQL database and JWT authentication.

## 🚀 Features

- **JWT Authentication** - Secure user authentication with JSON Web Tokens
- **PostgreSQL Database** - Robust data persistence with user-specific data
- **RESTful API** - Clean, well-documented API endpoints
- **Security** - Helmet, CORS, rate limiting, and input validation
- **Error Handling** - Comprehensive error handling and logging
- **Environment Configuration** - Flexible configuration for different environments

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Security**: Helmet, CORS, express-rate-limit

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-meal-planner/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE smart_meal_planner;
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=smart_meal_planner
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

5. **Run database migrations**
   ```bash
   psql -U postgres -d smart_meal_planner -f schema.sql
   ```

## 🚀 Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

#### POST /api/auth/login
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Protected Routes

All other endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Meal Plans Table
```sql
CREATE TABLE meal_plans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  day VARCHAR(20) NOT NULL,
  meal_type VARCHAR(20) NOT NULL,
  recipe_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, day, meal_type)
);
```

### Pantry Items Table
```sql
CREATE TABLE pantry_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  category VARCHAR(100) DEFAULT 'Other',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

```bash
npm test
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: Server-side validation

## 📁 Project Structure

```
backend/
├── controllers/          # Route controllers
│   └── authController.js
├── middleware/           # Custom middleware
│   └── auth.js
├── routes/              # API routes
│   └── auth.js
├── db.js                # Database configuration
├── server.js            # Main application file
├── schema.sql           # Database schema
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_PASSWORD=your_secure_db_password
JWT_SECRET=your_very_secure_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Using PM2 for Production
```bash
npm install -g pm2
pm2 start server.js --name "smart-meal-planner-api"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@smartmealplanner.com or create an issue in the repository.