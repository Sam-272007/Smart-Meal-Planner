import { Clock, Flame, Heart, ChefHat } from 'lucide-react';
import { cn } from '../utils/cn';
import { useFavorites } from '../context/FavoritesContext';
import { Card, Button, Badge } from './ui';

export default function RecipeCard({ recipe, onSelect, actionLabel = "Add to Planner" }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(recipe.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (isFav) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="relative h-48 overflow-hidden bg-secondary-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Diet badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[70%]">
          {recipe.diets.slice(0, 2).map(diet => (
            <Badge
              key={diet}
              variant="default"
              className="bg-white/95 backdrop-blur-sm text-secondary-700 border border-white/20 text-xs shadow-sm"
            >
              {diet.replace('-', ' ')}
            </Badge>
          ))}
          {recipe.diets.length > 2 && (
            <Badge variant="default" className="bg-white/95 backdrop-blur-sm text-secondary-700 border border-white/20 text-xs shadow-sm">
              +{recipe.diets.length - 2}
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className={cn(
            "absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110",
            isFav
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/90 backdrop-blur-sm text-secondary-400 hover:text-red-500 hover:bg-white"
          )}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("w-4 h-4", isFav && "fill-current")} />
        </button>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-secondary-900 leading-tight line-clamp-2 group-hover:text-primary-700 transition-colors">
            {recipe.title}
          </h3>
        </div>

        <div className="flex items-center justify-between text-sm text-secondary-600 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-primary-500" />
            <span className="font-medium">{recipe.prepTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Flame className="w-4 h-4 text-accent-500" />
            <span className="font-medium">{recipe.calories} kcal</span>
          </div>
        </div>

        <div className="mt-auto">
          <Button
            onClick={() => onSelect(recipe)}
            variant="primary"
            className="w-full group-hover:shadow-md transition-shadow"
          >
            <ChefHat className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
