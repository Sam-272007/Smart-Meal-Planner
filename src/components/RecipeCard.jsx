import { Clock, Flame, Info } from 'lucide-react';
import { cn } from '../utils/cn';

export default function RecipeCard({ recipe, onSelect, actionLabel = "Add to Planner" }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col h-full group">
      <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          loading="lazy" 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end max-w-[80%]">
          {recipe.diets.map(diet => (
            <span key={diet} className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-md text-gray-700 shadow-sm capitalize border border-gray-100">
              {diet.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{recipe.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-primary-500" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{recipe.calories} kcal</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <button 
            onClick={() => onSelect(recipe)}
            className="w-full flex items-center justify-center space-x-2 bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium py-2 rounded-lg transition"
          >
            <span>{actionLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
