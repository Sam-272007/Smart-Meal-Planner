#!/bin/bash

# Smart Meal Planner - Backend Setup Script
# This script helps you set up the Node.js/Express backend with PostgreSQL

echo "🚀 Smart Meal Planner Backend Setup"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit the .env file with your database credentials"
    echo "   Default values are set for local development"
fi

# Create database
echo "🗄️  Setting up database..."
echo "Enter your PostgreSQL password when prompted:"

# Check if database exists, create if not
psql -U postgres -c "SELECT 1 FROM pg_database WHERE datname = 'smart_meal_planner';" | grep -q 1
if [ $? -ne 0 ]; then
    psql -U postgres -c "CREATE DATABASE smart_meal_planner;"
    echo "✅ Database created"
else
    echo "ℹ️  Database already exists"
fi

# Run schema
echo "📋 Running database schema..."
psql -U postgres -d smart_meal_planner -f schema.sql

if [ $? -ne 0 ]; then
    echo "❌ Failed to run database schema"
    exit 1
fi

echo "✅ Database schema applied"

echo ""
echo "🎉 Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your database credentials"
echo "2. Start the backend server: cd backend && npm run dev"
echo "3. Update your frontend to use the new API endpoints"
echo "4. Test the authentication and CRUD operations"
echo ""
echo "📚 API Documentation: Check backend/README.md"
echo "🔗 API Base URL: http://localhost:5000/api"
echo ""
echo "Happy coding! 🚀"