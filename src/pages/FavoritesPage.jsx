import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, SearchIcon, TrashIcon, ChefHatIcon } from '../components/common/Icons';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { RecipeModal } from '../components/recipes/RecipeModal';
import { EmptyState } from '../components/common/EmptyState';
import { useRecipes } from '../context/RecipeContext';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favoriteRecipes, favorites, toggleFavorite } = useRecipes();
  const [favoriteSearch, setFavoriteSearch] = useState('');

  const displayedFavorites = favoriteRecipes.filter((recipe) => {
    if (!favoriteSearch.trim()) return true;
    const q = favoriteSearch.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(q) ||
      recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(q))
    );
  });

  const handleClearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite recipes?')) {
      // Toggle each off
      favorites.forEach((id) => toggleFavorite(id));
    }
  };

  return (
    <main className="page-container">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-badge favorite-badge-color">
            <HeartIcon size={26} filled={true} className="text-orange" />
          </div>
          <div>
            <h1 className="page-title">Favorite Recipes</h1>
            <p className="page-subtitle">
              Quick access to your handpicked culinary favorites ({favoriteRecipes.length} saved)
            </p>
          </div>
        </div>

        {favoriteRecipes.length > 0 && (
          <button
            type="button"
            className="btn-danger-outline"
            onClick={handleClearAllFavorites}
          >
            <TrashIcon size={16} />
            <span>Clear Favorites</span>
          </button>
        )}
      </div>

      {favoriteRecipes.length > 0 && (
        <div className="favorites-filter-bar">
          <div className="favorites-search-box">
            <SearchIcon size={18} className="search-input-icon" />
            <input
              type="text"
              placeholder="Search your saved favorites..."
              value={favoriteSearch}
              onChange={(e) => setFavoriteSearch(e.target.value)}
              className="search-input favorites-input"
            />
          </div>
          <span className="favorites-count-label">
            {displayedFavorites.length} of {favoriteRecipes.length} shown
          </span>
        </div>
      )}

      {favoriteRecipes.length === 0 ? (
        <EmptyState
          icon={<HeartIcon size={52} className="empty-heart-icon" />}
          title="No favorites saved yet"
          message="Click the orange heart icon on any recipe card to save it here for instant access."
          actionText="Discover Delicious Recipes"
          onAction={() => navigate('/')}
        />
      ) : displayedFavorites.length === 0 ? (
        <EmptyState
          title="No favorites match your search"
          message={`No saved recipes matched "${favoriteSearch}". Try a different keyword.`}
          actionText="Clear Search"
          onAction={() => setFavoriteSearch('')}
        />
      ) : (
        <div className="recipe-cards-grid">
          {displayedFavorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Recipe details modal */}
      <RecipeModal />
    </main>
  );
}
