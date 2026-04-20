import { useMemo, useState, useCallback } from 'react';
import { useGrocery } from '../context/GroceryContext';
import { usePantry } from '../context/PantryContext';
import { useMealPlan } from '../context/MealPlanContext';
import { ShoppingCart, Plus, Trash2, CheckCircle2, ChefHat, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { recipes } from '../data/recipes';
import { Button } from '../components/ui';
import { Card } from '../components/ui';
import { Input } from '../components/ui';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-primary-600" />
          </div>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900">Grocery List</h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Keep track of what you need and mark items as purchased. Generate lists from your meal plans automatically.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={generateFromPlanner} size="lg" className="shadow-lg hover:shadow-xl">
          <ChefHat className="w-5 h-5 mr-2" />
          Generate from Meal Plan
        </Button>
        {groceryItems.length > 0 && (
          <Button variant="outline" onClick={clearList} size="lg">
            Clear List
          </Button>
        )}
      </div>

      {/* Add Item Form */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Plus className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-secondary-900">Add Item</h2>
        </div>

        <form onSubmit={handleAddItem} className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto] items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-700">Item Name</label>
            <Input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Organic tomatoes, Milk..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-700">Quantity</label>
            <Input
              type="number"
              min="0.1"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-700">Unit</label>
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="pcs, lbs, cups..."
            />
          </div>

          <Button type="submit" className="mb-0">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </form>
      </Card>

      {/* Grocery Items */}
      {groceryItems.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart className="w-10 h-10 text-secondary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Your grocery list is empty</h3>
              <p className="text-secondary-600 mb-6">
                Add items manually or generate a shopping list from your meal planner.
              </p>
              <Button onClick={generateFromPlanner}>
                <ChefHat className="w-4 h-4 mr-2" />
                Generate from Meal Plan
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main Shopping List */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900">Shopping Items</h2>
                <p className="text-secondary-600 text-sm">
                  {shoppingListCount} items • {groceryItems.filter(item => item.purchased).length} purchased
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>{groceryItems.filter(item => item.purchased).length} done</span>
              </div>
            </div>

            <div className="space-y-3">
              {groceryItems.map(item => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between gap-4 p-4 rounded-lg border transition-all ${
                    item.purchased
                      ? 'bg-green-50 border-green-200 opacity-75'
                      : 'bg-white border-secondary-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex-1">
                    <p className={`font-medium ${item.purchased ? 'line-through text-secondary-500' : 'text-secondary-900'}`}>
                      {item.name}
                    </p>
                    <p className="text-sm text-secondary-600">{item.quantity} {item.unit}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant={item.purchased ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePurchased(item.id)}
                      className={item.purchased ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {item.purchased ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Done
                        </>
                      ) : (
                        'Mark bought'
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-secondary-600 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Insights Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-secondary-900">Pantry Check</h3>
              </div>

              <p className="text-sm text-secondary-600 mb-4">
                Items not found in your pantry inventory:
              </p>

              {missingItems.length > 0 ? (
                <div className="space-y-2">
                  {missingItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <span className="text-sm font-medium text-amber-800">{item.name}</span>
                      <span className="text-xs text-amber-600">{item.quantity} {item.unit}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-700 font-medium">All items available!</p>
                  <p className="text-xs text-secondary-600 mt-1">Everything matches your pantry</p>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">By Category</h3>
              <div className="space-y-4">
                {Object.entries(groupedByCategory).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-sm font-medium text-secondary-700 mb-2">{category}</p>
                    <ul className="space-y-1">
                      {items.map(item => (
                        <li key={item.id} className="text-sm text-secondary-600 flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="text-xs">{item.quantity} {item.unit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
