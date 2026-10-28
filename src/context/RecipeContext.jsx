import { createContext, useContext, useState, useMemo } from 'react';
import recipesData from '../data/recipes.json';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  // All recipes from local JSON
  const [recipes] = useState(recipesData);

  // Favorites stored persistently in LocalStorage
  const [favorites, setFavorites] = useLocalStorage('smart_recipes_favorites', [
    'recipe-1',
    'recipe-2'
  ]);

  // User settings stored persistently in LocalStorage
  const [settings, setSettings] = useLocalStorage('smart_recipes_settings', {
    defaultServings: 2,
    measurementUnit: 'Metric', // 'Metric' | 'US Imperial'
    dietaryPreference: 'All'
  });

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [maxCookTime, setMaxCookTime] = useState(60); // minutes slider/cap
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'time' | 'popular' | 'title'

  // Selected recipe for the detail modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Toggle favorite status
  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  const isFavorite = (recipeId) => favorites.includes(recipeId);

  // Clear all filters back to default
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMealType('All');
    setSelectedDifficulty('All');
    setMaxCookTime(60);
    setSelectedIngredients([]);
    setSortBy('rating');
  };

  // Toggle ingredient selection in filter
  const toggleIngredient = (ingredientName) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((item) => item !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  // List of all unique ingredients present across all recipes for the filter sidebar
  const allIngredients = useMemo(() => {
    const set = new Set();
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        set.add(ing.name.trim());
      });
    });
    return Array.from(set).sort();
  }, [recipes]);

  // Count active filters (for badge / indicator)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim() !== '') count++;
    if (selectedMealType !== 'All') count++;
    if (selectedDifficulty !== 'All') count++;
    if (maxCookTime < 60) count++;
    if (selectedIngredients.length > 0) count += selectedIngredients.length;
    return count;
  }, [searchTerm, selectedMealType, selectedDifficulty, maxCookTime, selectedIngredients]);

  // Filtered & Sorted recipes calculation
  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // 1. Text Search (title, description, or ingredient names)
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchesTitle = recipe.title.toLowerCase().includes(query);
          const matchesDesc = recipe.description.toLowerCase().includes(query);
          const matchesIngredient = recipe.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(query)
          );
          const matchesTag = recipe.tags.some((t) => t.toLowerCase().includes(query));

          if (!matchesTitle && !matchesDesc && !matchesIngredient && !matchesTag) {
            return false;
          }
        }

        // 2. Meal Type filter
        if (selectedMealType !== 'All' && recipe.mealType !== selectedMealType) {
          return false;
        }

        // 3. Difficulty filter
        if (selectedDifficulty !== 'All' && recipe.difficulty !== selectedDifficulty) {
          return false;
        }

        // 4. Cooking Time filter
        if (recipe.cookTime > maxCookTime) {
          return false;
        }

        // 5. Selected Ingredients filter (recipe must contain any of selected ingredients, or all depending on filter)
        if (selectedIngredients.length > 0) {
          const recipeIngNames = recipe.ingredients.map((ing) =>
            ing.name.toLowerCase()
          );
          const matchesAnyIngredient = selectedIngredients.some((sel) =>
            recipeIngNames.some((rIng) => rIng.includes(sel.toLowerCase()))
          );
          if (!matchesAnyIngredient) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'time') return a.cookTime - b.cookTime;
        if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [
    recipes,
    searchTerm,
    selectedMealType,
    selectedDifficulty,
    maxCookTime,
    selectedIngredients,
    sortBy
  ]);

  // Favorite recipes list
  const favoriteRecipes = useMemo(() => {
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  }, [recipes, favorites]);

  const value = {
    recipes,
    filteredRecipes,
    favoriteRecipes,
    favorites,
    toggleFavorite,
    isFavorite,
    settings,
    setSettings,
    // Filters
    searchTerm,
    setSearchTerm,
    selectedMealType,
    setSelectedMealType,
    selectedDifficulty,
    setSelectedDifficulty,
    maxCookTime,
    setMaxCookTime,
    selectedIngredients,
    toggleIngredient,
    allIngredients,
    activeFilterCount,
    clearFilters,
    sortBy,
    setSortBy,
    // Modal
    selectedRecipe,
    setSelectedRecipe
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
