import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { readUserDocument, writeUserDocument } from '../services/firestoreService';

const PantryContext = createContext();

export function usePantry() {
  return useContext(PantryContext);
}

export function PantryProvider({ children }) {
  const { currentUser } = useAuth();
  const [pantryItems, setPantryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load pantry from Firestore or localStorage
  useEffect(() => {
    const loadPantry = async () => {
      if (currentUser) {
        const data = await readUserDocument('pantries', currentUser.uid, { items: [] });
        setPantryItems(data.items || []);
      } else {
        setPantryItems([]);
      }
      setLoading(false);
    };

    loadPantry();
  }, [currentUser]);

  // Save to Firestore or localStorage whenever pantryItems changes
  useEffect(() => {
    const savePantry = async () => {
      if (currentUser && !loading) {
        await writeUserDocument('pantries', currentUser.uid, { items: pantryItems });
      }
    };

    savePantry();
  }, [pantryItems, currentUser, loading]);

  const addPantryItem = useCallback((item) => {
    setPantryItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
  }, []);

  const removePantryItem = useCallback((id) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updatePantryItem = useCallback((id, updatedItem) => {
    setPantryItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  }, []);

  const value = { pantryItems, addPantryItem, removePantryItem, updatePantryItem, loading };

  return (
    <PantryContext.Provider value={value}>
      {children}
    </PantryContext.Provider>
  );
}