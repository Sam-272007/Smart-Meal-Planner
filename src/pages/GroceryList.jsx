import { useMemo } from 'react';
import { useMealPlan } from '../context/MealPlanContext';
import { ShoppingCart } from 'lucide-react';

export default function GroceryList() {
  const { mealPlan } = useMealPlan();

  const aggregatedList = useMemo(() => {
    const list = {};

    Object.values(mealPlan).forEach(day => {
      Object.values(day).forEach(recipe => {
        if (recipe && recipe.ingredients) {
          recipe.ingredients.forEach(ing => {
            const cat = ing.category || 'Other';
            if (!list[cat]) {
              list[cat] = {};
            }
            
            const key = `${ing.name}_${ing.unit}`;
            if (list[cat][key]) {
              list[cat][key].amount += ing.amount;
            } else {
              list[cat][key] = {
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit
              };
            }
          });
        }
      });
    });

    return list;
  }, [mealPlan]);

  const hasItems = Object.keys(aggregatedList).length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <ShoppingCart className="w-8 h-8 text-primary-600" />
          <span>Smart Grocery List</span>
        </h1>
        <p className="text-gray-500 mt-2">Automatically generated from your weekly planner. Select items as you shop.</p>
      </div>

      {!hasItems ? (
        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your list is empty</h3>
          <p className="text-gray-500">Plan some meals to see their ingredients here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {Object.entries(aggregatedList).map(([category, items]) => (
            <div key={category} className="border-b border-gray-100 last:border-0">
              <div className="bg-gray-50 px-6 py-3">
                <h3 className="font-bold text-gray-800">{category}</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {Object.values(items).map((item, idx) => (
                  <li key={idx} className="px-6 py-4 flex items-center">
                    <label className="flex items-center space-x-4 cursor-pointer w-full group">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500 transition cursor-pointer"
                      />
                      <span className="flex-1 text-gray-800 font-medium group-hover:text-primary-700 transition">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {item.amount} {item.unit}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
