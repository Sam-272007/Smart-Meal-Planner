import { useMealPlan } from '../context/MealPlanContext';
import { X, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { mealPlan, removeMeal } = useMealPlan();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Planner</h1>
          <p className="text-gray-500 mt-1">Organize your meals for the upcoming week.</p>
        </div>
        <Link 
          to="/discovery" 
          className="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Meals</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {Object.keys(mealPlan).map(day => (
          <div key={day} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-100 text-center">{day.slice(0,3)}</h3>
            
            <div className="flex-1 flex flex-col space-y-4">
              {['breakfast', 'lunch', 'dinner'].map(mealType => {
                const recipe = mealPlan[day][mealType];
                
                return (
                  <div key={mealType} className="flex-1 flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">{mealType}</span>
                    
                    {recipe ? (
                      <div className="relative group bg-gray-50 rounded-lg p-2 border border-gray-100 h-full min-h-[80px] flex flex-col justify-center transition hover:border-gray-300">
                        <button 
                          onClick={() => removeMeal(day, mealType)}
                          className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-sm"
                          title="Remove from planner"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <p className="text-xs font-semibold text-gray-800 leading-tight text-center">{recipe.title}</p>
                        <p className="text-[10px] text-gray-500 text-center mt-1">{recipe.calories} kcal</p>
                      </div>
                    ) : (
                      <Link 
                        to="/discovery"
                        className="bg-white rounded-lg p-2 border border-dashed border-gray-300 h-full min-h-[80px] flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-primary-500 hover:border-primary-300 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
