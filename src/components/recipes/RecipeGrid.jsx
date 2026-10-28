import { RecipeCard } from './RecipeCard';
import { EmptyState } from '../common/EmptyState';
import { FilterIcon } from '../common/Icons';
import { useRecipes } from '../../context/RecipeContext';

export function RecipeGrid({ onOpenMobileFilters }) {
  const { filteredRecipes, recipes, sortBy, setSortBy, clearFilters, activeFilterCount } = useRecipes();

  return (
    <div className="recipe-grid-container">
      {/* Results Header: Count, Mobile Filter Trigger, and Sort Controls */}
      <div className="recipe-grid-toolbar">
        <div className="toolbar-left">
          {/* Mobile Filter Button */}
          <button
            type="button"
            className="btn-mobile-filter-trigger"
            onClick={onOpenMobileFilters}
            aria-label="Open filter settings"
          >
            <FilterIcon size={18} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="mobile-filter-badge">{activeFilterCount}</span>
            )}
          </button>

          <p className="recipes-count-text">
            Showing <strong>{filteredRecipes.length}</strong> of {recipes.length} recipes
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="toolbar-right">
          <label htmlFor="recipe-sort-select" className="sort-label">
            Sort by:
          </label>
          <select
            id="recipe-sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Highest Rated</option>
            <option value="time">Quickest Cook Time</option>
            <option value="popular">Most Popular</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredRecipes.length > 0 ? (
        <div className="recipe-cards-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No recipes match your criteria"
          message="We couldn't find any recipes matching your current combination of search terms, ingredients, or cooking times."
          actionText="Clear all filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
}
