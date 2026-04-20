// services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  // Try JWT token first (Node.js backend)
  const jwtToken = localStorage.getItem('jwt_token');
  if (jwtToken) {
    return `Bearer ${jwtToken}`;
  }

  // Fallback to Firebase token
  const firebaseToken = localStorage.getItem('firebase_token');
  if (firebaseToken) {
    return `Bearer ${firebaseToken}`;
  }

  return null;
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  signup: (userData) => apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
};

// Meal Plans API
export const mealPlanAPI = {
  getMealPlans: () => apiRequest('/meal-plans'),

  addMeal: (mealData) => apiRequest('/meal-plans', {
    method: 'POST',
    body: JSON.stringify(mealData),
  }),

  removeMeal: (day, mealType) => apiRequest(`/meal-plans/${day}/${mealType}`, {
    method: 'DELETE',
  }),
};

// Pantry API
export const pantryAPI = {
  getPantryItems: () => apiRequest('/pantry'),

  addPantryItem: (itemData) => apiRequest('/pantry', {
    method: 'POST',
    body: JSON.stringify(itemData),
  }),

  updatePantryItem: (id, itemData) => apiRequest(`/pantry/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  }),

  removePantryItem: (id) => apiRequest(`/pantry/${id}`, {
    method: 'DELETE',
  }),
};

// Grocery API
export const groceryAPI = {
  getGroceryItems: () => apiRequest('/grocery'),

  addGroceryItem: (itemData) => apiRequest('/grocery', {
    method: 'POST',
    body: JSON.stringify(itemData),
  }),

  updateGroceryItem: (id, itemData) => apiRequest(`/grocery/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  }),

  togglePurchased: (id) => apiRequest(`/grocery/${id}/toggle`, {
    method: 'PATCH',
  }),

  removeGroceryItem: (id) => apiRequest(`/grocery/${id}`, {
    method: 'DELETE',
  }),

  clearGroceryList: () => apiRequest('/grocery', {
    method: 'DELETE',
  }),
};

// Favorites API
export const favoritesAPI = {
  getFavorites: () => apiRequest('/favorites'),

  addFavorite: (recipeData) => apiRequest('/favorites', {
    method: 'POST',
    body: JSON.stringify({ recipe: recipeData }),
  }),

  removeFavorite: (recipeId) => apiRequest(`/favorites/${recipeId}`, {
    method: 'DELETE',
  }),
};

// Health check
export const healthAPI = {
  check: () => apiRequest('/health'),
};