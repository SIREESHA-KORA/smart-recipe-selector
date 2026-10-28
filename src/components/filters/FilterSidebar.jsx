import { useState } from 'react';
import { FilterIcon, RefreshIcon, CheckIcon, XIcon, ClockIcon } from '../common/Icons';
import { useRecipes } from '../../context/RecipeContext';

const MEAL_TYPES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

// Most popular ingredients to highlight in the filter sidebar
const POPULAR_INGREDIENTS = [
  'Garlic',
  'Tomato',
  'Olive Oil',
  'Eggs',
  'Chicken Breast',
  'Avocado',
  'Lemon',
  'Parmesan Cheese',
  'Heavy Cream',
  'Fresh Basil',
  'Butter',
  'Soy Sauce',
  'Salmon Fillets',
  'Baby Spinach',
  'Dark Chocolate'
];

export function FilterSidebar({ mobileOpen, onCloseMobile }) {
  const {
    selectedMealType,
    setSelectedMealType,
    selectedDifficulty,
    setSelectedDifficulty,
    maxCookTime,
    setMaxCookTime,
    selectedIngredients,
    toggleIngredient,
    activeFilterCount,
    clearFilters
  } = useRecipes();

  const [ingredientSearch, setIngredientSearch] = useState('');

  // Filtered popular ingredients based on quick local text input
  const displayedIngredients = POPULAR_INGREDIENTS.filter((ing) =>
    ing.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <aside className={`filter-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Mobile Drawer Header */}
      <div className="filter-mobile-header">
        <div className="filter-title-group">
          <FilterIcon size={20} className="filter-header-icon" />
          <h2 className="filter-title">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="filter-count-badge">{activeFilterCount}</span>
          )}
        </div>
        <button
          type="button"
          className="filter-close-btn"
          onClick={onCloseMobile}
          aria-label="Close filters"
        >
          <XIcon size={20} />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="filter-header desktop-only">
        <div className="filter-title-group">
          <FilterIcon size={20} className="filter-header-icon" />
          <h2 className="filter-title">Filter Recipes</h2>
          {activeFilterCount > 0 && (
            <span className="filter-count-badge">{activeFilterCount} active</span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            className="filter-reset-link"
            onClick={clearFilters}
            title="Reset all filters"
          >
            <RefreshIcon size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="filter-sections-scroll">
        {/* Section 1: Meal Type */}
        <div className="filter-group">
          <label className="filter-group-title">Meal Type</label>
          <div className="filter-chips-grid">
            {MEAL_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={`filter-chip-btn ${selectedMealType === type ? 'active' : ''}`}
                onClick={() => setSelectedMealType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Cooking Time */}
        <div className="filter-group">
          <div className="flex-between">
            <label className="filter-group-title">
              <ClockIcon size={16} className="inline-icon" />
              Max Cook Time
            </label>
            <span className="cook-time-val">
              {maxCookTime >= 60 ? 'Any time (≤ 60m)' : `Under ${maxCookTime} mins`}
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={maxCookTime}
            onChange={(e) => setMaxCookTime(Number(e.target.value))}
            className="cook-time-slider"
            aria-label="Maximum cooking time in minutes"
          />

          <div className="cook-time-presets">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                className={`preset-btn ${maxCookTime === mins ? 'active' : ''}`}
                onClick={() => setMaxCookTime(mins)}
              >
                {mins === 60 ? 'Any' : `≤ ${mins}m`}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Difficulty */}
        <div className="filter-group">
          <label className="filter-group-title">Difficulty</label>
          <div className="difficulty-options">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDifficulty === diff;
              let dotClass = 'dot-neutral';
              if (diff === 'Easy') dotClass = 'dot-easy';
              if (diff === 'Medium') dotClass = 'dot-medium';
              if (diff === 'Hard') dotClass = 'dot-hard';

              return (
                <button
                  key={diff}
                  type="button"
                  className={`difficulty-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff !== 'All' && <span className={`difficulty-dot ${dotClass}`} />}
                  <span>{diff}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Filter by Ingredients */}
        <div className="filter-group">
          <div className="flex-between">
            <label className="filter-group-title">Key Ingredients</label>
            {selectedIngredients.length > 0 && (
              <button
                type="button"
                className="filter-clear-ing-btn"
                onClick={() => selectedIngredients.forEach((ing) => toggleIngredient(ing))}
              >
                Clear ({selectedIngredients.length})
              </button>
            )}
          </div>

          {/* Mini Search inside Ingredients */}
          <input
            type="text"
            className="filter-subsearch-input"
            placeholder="Search ingredients..."
            value={ingredientSearch}
            onChange={(e) => setIngredientSearch(e.target.value)}
          />

          <div className="ingredients-pills-list">
            {displayedIngredients.map((ingredient) => {
              const isSelected = selectedIngredients.includes(ingredient);
              return (
                <button
                  key={ingredient}
                  type="button"
                  className={`ingredient-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {isSelected && <CheckIcon size={13} className="pill-check" />}
                  <span>{ingredient}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clear Filters Button at the bottom */}
      {activeFilterCount > 0 && (
        <div className="filter-sidebar-footer">
          <button
            type="button"
            className="btn-outline-clear w-full"
            onClick={clearFilters}
          >
            <RefreshIcon size={16} />
            <span>Clear All Filters ({activeFilterCount})</span>
          </button>
        </div>
      )}
    </aside>
  );
}
