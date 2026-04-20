import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import { Heart, Sparkles } from 'lucide-react';
import { Card } from '../components/ui';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900">My Favorite Recipes</h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Your personal collection of saved recipes for quick access and meal inspiration.
        </p>
      </div>

      {/* Content */}
      {favorites.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-secondary-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">No favorites yet</h3>
              <p className="text-secondary-600 mb-6">
                Start exploring recipes and save your favorites for easy access.
              </p>
              <div className="flex items-center justify-center space-x-2 text-primary-600">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Browse recipes to get started</span>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-secondary-900">
                Your Favorites ({favorites.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {favorites.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={() => removeFavorite(recipe.id)}
                actionLabel="Remove from Favorites"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}