import { useMealPlan } from '../context/MealPlanContext';
import { X, Plus, Calendar, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge } from '../components/ui';

export default function Dashboard() {
  const { mealPlan, removeMeal } = useMealPlan();

  const getTotalMeals = () => {
    return Object.values(mealPlan).reduce((total, day) => {
      return total + Object.values(day).filter(meal => meal !== null).length;
    }, 0);
  };

  const getTotalCalories = () => {
    return Object.values(mealPlan).reduce((total, day) => {
      return total + Object.values(day).reduce((dayTotal, meal) => {
        return dayTotal + (meal?.calories || 0);
      }, 0);
    }, 0);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">Weekly Planner</h1>
              <p className="text-secondary-600">Organize your meals for the upcoming week</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{getTotalMeals()}</div>
              <div className="text-secondary-500">Meals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600">{getTotalCalories()}</div>
              <div className="text-secondary-500">Calories</div>
            </div>
          </div>

          <Button asChild size="lg" className="whitespace-nowrap">
            <Link to="/discovery">
              <Plus className="w-5 h-5 mr-2" />
              Add Meals
            </Link>
          </Button>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        {Object.keys(mealPlan).map(day => {
          const dayMeals = Object.values(mealPlan[day]).filter(meal => meal !== null);
          const dayCalories = dayMeals.reduce((sum, meal) => sum + (meal?.calories || 0), 0);

          return (
            <Card key={day} className="p-6 flex flex-col h-full min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-secondary-900">{day.slice(0, 3)}</h3>
                <Badge variant="secondary" className="text-xs">
                  {dayCalories} cal
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                {['breakfast', 'lunch', 'dinner'].map(mealType => {
                  const recipe = mealPlan[day][mealType];

                  return (
                    <div key={mealType} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ChefHat className="w-4 h-4 text-secondary-400" />
                        <span className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">
                          {mealType}
                        </span>
                      </div>

                      {recipe ? (
                        <div className="relative group bg-secondary-50 rounded-lg p-4 border border-secondary-200 hover:border-primary-300 transition-all duration-200 hover:shadow-sm">
                          <button
                            onClick={() => removeMeal(day, mealType)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:bg-red-600"
                            title="Remove from planner"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-secondary-900 text-sm leading-tight line-clamp-2">
                              {recipe.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-secondary-500">
                              <span>{recipe.prepTime}</span>
                              <span>{recipe.calories} kcal</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          to="/discovery"
                          className="block bg-secondary-25 rounded-lg p-4 border-2 border-dashed border-secondary-200 hover:border-primary-300 hover:bg-primary-25 transition-all duration-200 group"
                        >
                          <div className="flex flex-col items-center justify-center space-y-2 text-secondary-400 group-hover:text-primary-500">
                            <Plus className="w-6 h-6" />
                            <span className="text-xs font-medium">Add meal</span>
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {getTotalMeals() === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Start planning your week</h3>
              <p className="text-secondary-600 mb-6 max-w-md mx-auto">
                Add meals to your weekly planner to stay organized and make meal prep easier.
              </p>
              <Button asChild size="lg">
                <Link to="/discovery">
                  <Plus className="w-5 h-5 mr-2" />
                  Browse Recipes
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
