# Smart Meal Planner 🍽️

A modern, production-ready meal planning application with multiple backend implementations. Choose between Firebase (quick start) or Node.js/Express + PostgreSQL (full control).

## 🌟 Features

- **🔐 Authentication** - Secure user authentication
- **📅 Meal Planning** - Weekly meal planning with drag-and-drop
- **🏪 Pantry Management** - Track ingredients and reduce waste
- **🛒 Grocery Lists** - Auto-generate shopping lists from meal plans
- **❤️ Recipe Favorites** - Save and organize favorite recipes
- **📱 Responsive Design** - Works on all devices
- **🎨 Modern UI** - Clean, professional design with Tailwind CSS
- **⚡ Performance** - Optimized with React hooks and lazy loading

## 🏗️ Architecture Options

### Option 1: Firebase (Recommended for Quick Start)
- **Backend**: Firebase Authentication + Firestore
- **Deployment**: Vercel (automatic)
- **Setup Time**: 5 minutes
- **Best for**: Prototyping, small teams, quick deployment

### Option 2: Node.js/Express + PostgreSQL (Full Control)
- **Backend**: Custom Node.js API with PostgreSQL
- **Deployment**: Flexible (Heroku, DigitalOcean, etc.)
- **Setup Time**: 15-20 minutes
- **Best for**: Production apps, large scale, custom requirements

## 🚀 Quick Start (Firebase)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd smart-meal-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication and Firestore
   - Copy your config to `src/services/firebase.js`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🛠️ Full Setup (Node.js + PostgreSQL)

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Run the automated setup script**
   ```bash
   # On Linux/Mac
   chmod +x ../setup-backend.sh
   ../setup-backend.sh

   # Or manually:
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   # Run schema.sql in PostgreSQL
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Update environment variables**
   Create `.env.local` in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Start the frontend**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
smart-meal-planner/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Design system components
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── RecipeCard.jsx  # Recipe display component
│   │   └── ProtectedRoute.jsx
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── MealPlanContext.jsx
│   │   ├── PantryContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   └── GroceryContext.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Discovery.jsx
│   │   ├── Pantry.jsx
│   │   ├── Favorites.jsx
│   │   ├── GroceryList.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── services/           # API and utility services
│   │   ├── firebase.js     # Firebase configuration
│   │   ├── api.js          # REST API client
│   │   └── firestoreService.js
│   ├── data/               # Static data
│   │   └── recipes.js
│   ├── utils/              # Utility functions
│   └── App.jsx
├── backend/                # Node.js/Express backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   ├── db.js              # Database configuration
│   ├── server.js          # Main application file
│   ├── schema.sql         # Database schema
│   └── README.md          # Backend documentation
├── public/                # Static assets
├── setup-backend.sh       # Backend setup script
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Green (#10B981 to #059669)
- **Secondary**: Gray (#6B7280 to #374151)
- **Accent**: Orange (#F59E0B to #D97706)

### Components
- **Button**: Variants (primary, secondary, outline, ghost, danger)
- **Card**: Container with shadow and hover effects
- **Input**: Form inputs with validation states
- **Badge**: Status indicators and tags

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
npm test             # Run tests
```

## 🚀 Deployment

### Firebase Version (Vercel)
1. Connect your GitHub repo to Vercel
2. Deploy automatically on push
3. **Live URL**: https://smart-meal-planner-nine.vercel.app
4. **Deployed Demo**: https://smart-meal-planner-nine.vercel.app/login

### Full Stack Version
- **Frontend**: Deploy to Vercel/Netlify
- **Backend**: Deploy to Heroku/Railway/DigitalOcean
- **Database**: Use PostgreSQL hosting service

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/signup    # User registration
POST /api/auth/login     # User login
```

### Protected Endpoints
```
GET    /api/meal-plans   # Get user's meal plans
POST   /api/meal-plans   # Add meal to plan
DELETE /api/meal-plans/:day/:mealType

GET    /api/pantry       # Get pantry items
POST   /api/pantry       # Add pantry item
PUT    /api/pantry/:id   # Update pantry item
DELETE /api/pantry/:id   # Remove pantry item

GET    /api/grocery      # Get grocery items
POST   /api/grocery      # Add grocery item
PUT    /api/grocery/:id  # Update grocery item
PATCH  /api/grocery/:id/toggle  # Toggle purchased status
DELETE /api/grocery/:id  # Remove grocery item
DELETE /api/grocery      # Clear grocery list

GET    /api/favorites    # Get favorite recipes
POST   /api/favorites    # Add recipe to favorites
DELETE /api/favorites/:recipeId  # Remove from favorites
```

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests (if implemented)
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Firebase** - Backend-as-a-Service
- **Express.js** - Web application framework
- **PostgreSQL** - Advanced open source database

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/smart-meal-planner/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/smart-meal-planner/discussions)

---

**Built with ❤️ for meal planning enthusiasts**
