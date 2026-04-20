import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { favorites, removeFavorite, loading } = useFavorites();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Heart className="w-8 h-8 text-red-500" />
          <span>My Favorite Recipes</span>
        </h1>
        <p className="text-gray-500 mt-2">Your saved recipes for quick access.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500">Browse recipes and save your favorites.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={() => removeFavorite(recipe.id)}
              actionLabel="Remove from Favorites"
            />
          ))}
        </div>
      )}
    </div>
  );
}