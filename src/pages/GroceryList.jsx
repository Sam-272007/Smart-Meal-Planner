import { useMemo, useState, useCallback } from 'react';
import { useGrocery } from '../context/GroceryContext';
import { usePantry } from '../context/PantryContext';
import { useMealPlan } from '../context/MealPlanContext';
import { ShoppingCart, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { recipes } from '../data/recipes';

export default function GroceryList() {
  const { groceryItems, addItem, removeItem, togglePurchased, clearList, loading } = useGrocery();
  const { pantryItems } = usePantry();
  const { mealPlan } = useMealPlan();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('pcs');

  const shoppingListCount = useMemo(() => groceryItems.length, [groceryItems.length]);

  const missingItems = useMemo(() => {
    const pantryNames = pantryItems.map(item => item.name.toLowerCase());
    return groceryItems.filter(item => !pantryNames.includes(item.name.toLowerCase()));
  }, [groceryItems, pantryItems]);

  const groupedByCategory = useMemo(() => {
    return groceryItems.reduce((acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [groceryItems]);

  const handleAddItem = useCallback((e) => {
    e.preventDefault();
    const trimmedName = itemName.trim();
    if (!trimmedName) return;
    addItem({ name: trimmedName, quantity, unit, category: 'Custom' });
    setItemName('');
    setQuantity('1');
    setUnit('pcs');
  }, [itemName, quantity, unit, addItem]);

  const generateFromPlanner = useCallback(() => {
    const recipesInPlan = Object.values(mealPlan)
      .flatMap(day => Object.values(day).filter(Boolean));

    const ingredientMap = {};
    recipesInPlan.forEach(recipe => {
      const sourceRecipe = recipes.find(r => r.id === recipe.id) || recipe;
      sourceRecipe.ingredients.forEach(ingredient => {
        const name = ingredient.name;
        const key = `${name}_${ingredient.unit}`;
        if (!ingredientMap[key]) {
          ingredientMap[key] = { ...ingredient };
        } else {
          ingredientMap[key].amount += ingredient.amount;
        }
      });
    });

    Object.values(ingredientMap).forEach(ingredient => {
      addItem({
        name: ingredient.name,
        quantity: ingredient.amount,
        unit: ingredient.unit,
        category: ingredient.category || 'Pantry'
      });
    });
  }, [mealPlan, addItem]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grocery List</h1>
          <p className="text-gray-500 mt-1">Track what you need and mark items when purchased.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={generateFromPlanner}
            className="bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700 transition"
          >
            Generate from Planner
          </button>
          <button
            onClick={clearList}
            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
          >
            Clear List
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleAddItem} className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Tomatoes"
              className="w-full px-3 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              step="0.5"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </button>
        </form>
      </div>

      {groceryItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-primary-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your grocery list is empty</h2>
          <p className="text-gray-500">Add an item or generate a list from your meal planner.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shopping Items</h2>
                <p className="text-sm text-gray-500">{shoppingListCount} items in your list.</p>
              </div>
              <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-3 py-2 text-sm">
                <CheckCircle2 className="w-4 h-4" /> {groceryItems.filter(item => item.purchased).length} purchased
              </div>
            </div>
            <div className="space-y-3">
              {groceryItems.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePurchased(item.id)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition ${item.purchased ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {item.purchased ? 'Purchased' : 'Mark bought'}
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Insights</h2>
            <p className="text-sm text-gray-500 mb-4">Items not found in your pantry are marked as missing.</p>
            {missingItems.length > 0 ? (
              <ul className="space-y-2">
                {missingItems.map(item => (
                  <li key={item.id} className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{item.name} • {item.quantity} {item.unit}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Everything on this list matches your pantry items.</p>
            )}

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Group by category</h3>
              {Object.entries(groupedByCategory).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{category}</p>
                  <ul className="space-y-1">
                    {items.map(item => (
                      <li key={item.id} className="text-sm text-gray-600">- {item.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
