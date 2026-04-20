import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Utensils, Moon, Sun, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Planner' },
    { path: '/discovery', label: 'Recipes' },
    { path: '/pantry', label: 'Pantry' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/grocery', label: 'Grocery List' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-secondary-200 shadow-sm dark:bg-secondary-900/95 dark:border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to={currentUser ? '/dashboard' : '/'}
            className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors group"
          >
            <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors dark:bg-primary-900 dark:group-hover:bg-primary-800">
              <Utensils className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">Smart Meal Planner</span>
          </Link>

          <div className="flex items-center space-x-1">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-400 dark:hover:text-primary-400 dark:hover:bg-primary-900/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {currentUser ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive(item.path)
                        ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                        : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-400 dark:hover:text-primary-400 dark:hover:bg-primary-900/20"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="w-px h-6 bg-secondary-200 mx-2 dark:bg-secondary-700" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-secondary-600 hover:text-red-600 hover:bg-red-50 dark:text-secondary-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-400 dark:hover:text-primary-400 dark:hover:bg-primary-900/20 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
