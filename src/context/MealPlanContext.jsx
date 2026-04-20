import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { readUserDocument, writeUserDocument } from '../services/firestoreService';

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
  const [loading, setLoading] = useState(true);

  // Load from Firestore or localStorage
  useEffect(() => {
    const loadMealPlan = async () => {
      if (!currentUser) {
        setMealPlan(DEFAULT_PLAN);
        setLoading(false);
        return;
      }

      const data = await readUserDocument('mealPlans', currentUser.uid, { plan: DEFAULT_PLAN });
      setMealPlan(data.plan || DEFAULT_PLAN);
      setLoading(false);
    };

    loadMealPlan();
  }, [currentUser]);

  useEffect(() => {
    const saveMealPlan = async () => {
      if (currentUser && !loading) {
        await writeUserDocument('mealPlans', currentUser.uid, { plan: mealPlan });
      }
    };

    saveMealPlan();
  }, [mealPlan, currentUser, loading]);

  const addMeal = useCallback((day, mealType, recipe) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipe
      }
    }));
  }, []);

  const removeMeal = useCallback((day, mealType) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null
      }
    }));
  }, []);

  const value = { mealPlan, addMeal, removeMeal, loading };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
}
