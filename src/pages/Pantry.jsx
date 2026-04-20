import { useState } from 'react';
import { usePantry } from '../context/PantryContext';
import { Plus, Trash2, Edit2, Package, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui';
import { Card } from '../components/ui';
import { Input } from '../components/ui';

export default function Pantry() {
  const { pantryItems, addPantryItem, removePantryItem, updatePantryItem, loading } = usePantry();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', quantity: '', unit: '', category: 'Pantry' });

  const categories = ['Pantry', 'Produce', 'Meat', 'Dairy/Alt', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updatePantryItem(editingId, formData);
      setEditingId(null);
    } else {
      addPantryItem(formData);
      setIsAdding(false);
    }
    setFormData({ name: '', quantity: '', unit: '', category: 'Pantry' });
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name, quantity: item.quantity, unit: item.unit, category: item.category });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', quantity: '', unit: '', category: 'Pantry' });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Pantry': 'bg-blue-100 text-blue-700',
      'Produce': 'bg-green-100 text-green-700',
      'Meat': 'bg-red-100 text-red-700',
      'Dairy/Alt': 'bg-yellow-100 text-yellow-700',
      'Other': 'bg-secondary-100 text-secondary-700'
    };
    return colors[category] || colors['Other'];
  };

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
        <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900">Pantry Management</h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Keep track of your ingredients, reduce food waste, and get smart recipe recommendations.
        </p>
      </div>

      {/* Add Item Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setIsAdding(true)}
          size="lg"
          className="shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Pantry Item
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Package className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-secondary-900">
              {editingId ? 'Edit Item' : 'Add New Item'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Item Name</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g., Chicken breast, Rice, Milk"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Quantity</label>
                <Input
                  type="number"
                  step="0.1"
                  required
                  placeholder="e.g., 2.5"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Unit</label>
                <Input
                  type="text"
                  required
                  placeholder="e.g., lbs, cups, pieces"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700">Category</label>
                <select
                  className="w-full px-3 py-2 bg-secondary-50 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit">
                {editingId ? 'Update Item' : 'Add Item'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  cancelEdit();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Pantry Items */}
      {pantryItems.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 text-secondary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Your pantry is empty</h3>
              <p className="text-secondary-600 mb-6">
                Start by adding some ingredients to get personalized recipe recommendations.
              </p>
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Item
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              Your Pantry ({pantryItems.length} items)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pantryItems.map(item => (
              <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900 text-lg mb-1">{item.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(item)}
                      className="text-secondary-600 hover:text-primary-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePantryItem(item.id)}
                      className="text-secondary-600 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary-600">
                    {item.quantity} <span className="text-sm font-normal text-secondary-600">{item.unit}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}