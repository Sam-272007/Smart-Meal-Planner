import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import RecipeCard from '../components/RecipeCard';
import { recipes, DIET_OPTIONS } from '../data/recipes';
import { useMealPlan } from '../context/MealPlanContext';
import { useNavigate } from 'react-router-dom';

export default function Discovery() {
  const [selectedDiets, setSelectedDiets] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  
  const { addMeal } = useMealPlan();
  const navigate = useNavigate();

  useEffect(() => {
    // Focus search input on mount
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Controlled component handler for diet filters
  const handleDietChange = useCallback((dietId) => {
    setSelectedDiets(prev => ({
      ...prev,
      [dietId]: !prev[dietId]
    }));
  }, []);

  const handleAddMeal = (recipe) => {
    // Basic assignment logic via prompt for demo sake, ideally a modal.
    const day = window.prompt("Which day? (Monday, Tuesday, Wednesday...)", "Monday");
    const type = window.prompt("Which meal? (breakfast, lunch, dinner)", "dinner");
    
    if (day && type) {
      // capitalizes day, lowercases type to match schema loosely
      const formattedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
      addMeal(formattedDay, type.toLowerCase(), recipe);
      navigate('/'); // Go back to dashboard to see it
    }
  };

  // Complex filtering logic using useMemo to optimize re-renders
  const filteredRecipes = useMemo(() => {
    const activeFilters = Object.keys(selectedDiets).filter(k => selectedDiets[k]);
    
    return recipes.filter(recipe => {
      // Text Search
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Diet restrictions (All active filters must be present in recipe's diets array)
      const matchesDiets = activeFilters.every(filter => recipe.diets.includes(filter));

      return matchesSearch && matchesDiets;
    });
  }, [searchTerm, selectedDiets]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-fit flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Name</label>
          <input 
            type="text" 
            ref={searchInputRef}
            placeholder="e.g. Salad"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
          <div className="space-y-3">
            {DIET_OPTIONS.map(option => (
              <label key={option.id} className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 cursor-pointer"
                  checked={!!selectedDiets[option.id]}
                  onChange={() => handleDietChange(option.id)}
                />
                <span className="text-gray-700 text-sm font-medium group-hover:text-primary-600 transition">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Discover Recipes</h1>
            <p className="text-gray-500 text-sm mt-1">Showing {filteredRecipes.length} results</p>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onSelect={handleAddMeal} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try removing some filters or change your search term.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedDiets({});}}
              className="mt-4 text-primary-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
