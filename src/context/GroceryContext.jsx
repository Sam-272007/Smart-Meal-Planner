import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { readUserDocument, writeUserDocument } from '../services/firestoreService';

const GroceryContext = createContext();

export function useGrocery() {
  return useContext(GroceryContext);
}

export function GroceryProvider({ children }) {
  const { currentUser } = useAuth();
  const [groceryItems, setGroceryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGroceryList = async () => {
      setLoading(true);
      if (!currentUser) {
        setGroceryItems([]);
        setLoading(false);
        return;
      }

      const data = await readUserDocument('groceryLists', currentUser.uid, { items: [] });
      setGroceryItems(data.items || []);
      setLoading(false);
    };

    loadGroceryList();
  }, [currentUser]);

  useEffect(() => {
    const saveGroceryList = async () => {
      if (!currentUser) return;
      await writeUserDocument('groceryLists', currentUser.uid, { items: groceryItems });
    };

    saveGroceryList();
  }, [groceryItems, currentUser]);

  const addItem = useCallback((item) => {
    setGroceryItems(prev => [...prev, { ...item, id: Date.now().toString(), purchased: false }]);
  }, []);

  const removeItem = useCallback((id) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const togglePurchased = useCallback((id) => {
    setGroceryItems(prev => prev.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  }, []);

  const clearList = useCallback(() => {
    setGroceryItems([]);
  }, []);

  const value = {
    groceryItems,
    addItem,
    removeItem,
    togglePurchased,
    clearList,
    loading
  };

  return (
    <GroceryContext.Provider value={value}>
      {children}
    </GroceryContext.Provider>
  );
}
