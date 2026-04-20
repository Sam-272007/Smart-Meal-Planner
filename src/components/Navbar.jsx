import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Utensils } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 text-primary-600">
            <Utensils className="h-6 w-6" />
            <span className="font-bold text-xl tracking-tight">Smart Meal Planner</span>
          </Link>
          
          <div className="flex space-x-4 items-center">
            {currentUser ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition">Planner</Link>
                <Link to="/discovery" className="text-gray-700 hover:text-primary-600 transition">Recipes</Link>
                <Link to="/grocery" className="text-gray-700 hover:text-primary-600 transition">Grocery List</Link>
                <button 
                  onClick={handleLogout}
                  className="ml-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">Login</Link>
                <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
