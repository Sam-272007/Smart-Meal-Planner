import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { readUserDocument, writeUserDocument } from '../services/firestoreService';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from Firestore or localStorage
  useEffect(() => {
    const loadFavorites = async () => {
      if (currentUser) {
        const data = await readUserDocument('favorites', currentUser.uid, { recipes: [] });
        setFavorites(data.recipes || []);
      } else {
        setFavorites([]);
      }
      setLoading(false);
    };

    loadFavorites();
  }, [currentUser]);

  // Save to Firestore or localStorage whenever favorites changes
  useEffect(() => {
    const saveFavorites = async () => {
      if (currentUser && !loading) {
        await writeUserDocument('favorites', currentUser.uid, { recipes: favorites });
      }
    };

    saveFavorites();
  }, [favorites, currentUser, loading]);

  const addFavorite = useCallback((recipe) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  }, []);

  const removeFavorite = useCallback((recipeId) => {
    setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId));
  }, []);

  const isFavorite = useCallback((recipeId) => {
    return favorites.some(recipe => recipe.id === recipeId);
  }, [favorites]);

  const value = { favorites, addFavorite, removeFavorite, isFavorite, loading };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}