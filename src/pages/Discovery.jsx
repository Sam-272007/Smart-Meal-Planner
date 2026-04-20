import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import RecipeCard from '../components/RecipeCard';
import { recipes, DIET_OPTIONS } from '../data/recipes';
import { useMealPlan } from '../context/MealPlanContext';
import { usePantry } from '../context/PantryContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { Card } from '../components/ui';
import { Input } from '../components/ui';
import { Search, Filter, Sparkles } from 'lucide-react';

export default function Discovery() {
  const [selectedDiets, setSelectedDiets] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const searchInputRef = useRef(null);

  const { addMeal } = useMealPlan();
  const { pantryItems } = usePantry();
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

  // Recommendation logic based on pantry items
  const recommendedRecipes = useMemo(() => {
    if (pantryItems.length === 0) return [];

    return recipes.filter(recipe => {
      // Check if recipe can be made with available pantry items
      const pantryNames = pantryItems.map(item => item.name.toLowerCase());
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());

      // At least 50% of ingredients should be available in pantry
      const availableIngredients = recipeIngredients.filter(ing =>
        pantryNames.some(pantryItem => pantryItem.includes(ing) || ing.includes(pantryItem))
      );

      return availableIngredients.length / recipeIngredients.length >= 0.5;
    }).slice(0, 6); // Limit to 6 recommendations
  }, [pantryItems]);

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900">Discover Recipes</h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Explore our collection of delicious recipes and find the perfect meal for any occasion.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <Card className="p-6 sticky top-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">Search Recipes</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="e.g. Chicken salad, pasta..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">Dietary Preferences</label>
                <div className="space-y-3">
                  {DIET_OPTIONS.map(option => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 bg-secondary-50 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer"
                        checked={!!selectedDiets[option.id]}
                        onChange={() => handleDietChange(option.id)}
                      />
                      <span className="text-secondary-700 text-sm font-medium group-hover:text-primary-600 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {pantryItems.length > 0 && (
                <div className="pt-4 border-t border-secondary-200">
                  <Button
                    onClick={() => setShowRecommendations(!showRecommendations)}
                    variant={showRecommendations ? "outline" : "default"}
                    className="w-full"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {showRecommendations ? 'Hide' : 'Show'} Recommendations
                  </Button>
                  <p className="text-xs text-secondary-500 mt-2">
                    Based on your pantry items
                  </p>
                </div>
              )}
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {showRecommendations && recommendedRecipes.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-5 h-5 text-accent-600" />
                <h2 className="text-2xl font-bold text-secondary-900">Recommended for You</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} onSelect={handleAddMeal} />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-secondary-900">All Recipes</h2>
              <p className="text-secondary-600 text-sm">
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
              </p>
            </div>
            {(Object.values(selectedDiets).some(Boolean) || searchTerm) && (
              <Button
                variant="ghost"
                onClick={() => {setSearchTerm(''); setSelectedDiets({});}}
                className="text-secondary-600 hover:text-secondary-900"
              >
                Clear filters
              </Button>
            )}
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} onSelect={handleAddMeal} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">No recipes found</h3>
                  <p className="text-secondary-600 mb-4">
                    Try adjusting your search terms or removing some dietary filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {setSearchTerm(''); setSelectedDiets({});}}
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
