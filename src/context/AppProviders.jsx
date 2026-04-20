import { AuthProvider } from './AuthContext';
import { MealPlanProvider } from './MealPlanContext';
import { PantryProvider } from './PantryContext';
import { FavoritesProvider } from './FavoritesContext';
import { GroceryProvider } from './GroceryContext';
import { ThemeProvider } from './ThemeContext';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MealPlanProvider>
          <PantryProvider>
            <FavoritesProvider>
              <GroceryProvider>{children}</GroceryProvider>
            </FavoritesProvider>
          </PantryProvider>
        </MealPlanProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
