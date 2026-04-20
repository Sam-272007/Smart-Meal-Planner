import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MealPlanContext = createContext();

export function useMealPlan() {
  return useContext(MealPlanContext);
}

const DEFAULT_PLAN = {
  Monday: { breakfast: null, lunch: null, dinner: null },
  Tuesday: { breakfast: null, lunch: null, dinner: null },
  Wednesday: { breakfast: null, lunch: null, dinner: null },
  Thursday: { breakfast: null, lunch: null, dinner: null },
  Friday: { breakfast: null, lunch: null, dinner: null },
  Saturday: { breakfast: null, lunch: null, dinner: null },
  Sunday: { breakfast: null, lunch: null, dinner: null },
};

export function MealPlanProvider({ children }) {
  const { currentUser } = useAuth();
  const [mealPlan, setMealPlan] = useState(DEFAULT_PLAN);

  // Load from local storage when user changes (simulate DB fetch)
  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`mealPlan_${currentUser.uid}`);
      if (stored) {
        setMealPlan(JSON.parse(stored));
      } else {
        setMealPlan(DEFAULT_PLAN);
      }
    } else {
      setMealPlan(DEFAULT_PLAN); // Clear if logged out
    }
  }, [currentUser]);

  // Persist to local storage whenever mealPlan changes (simulate DB save)
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`mealPlan_${currentUser.uid}`, JSON.stringify(mealPlan));
    }
  }, [mealPlan, currentUser]);

  const addMeal = (day, mealType, recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipe
      }
    }));
  };

  const removeMeal = (day, mealType) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null
      }
    }));
  };

  const value = { mealPlan, addMeal, removeMeal };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
}
