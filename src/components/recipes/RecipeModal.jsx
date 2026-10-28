import { useState, useEffect } from 'react';
import {
  XIcon,
  HeartIcon,
  StarIcon,
  ClockIcon,
  FlameIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon
} from '../common/Icons';
import { useRecipes } from '../../context/RecipeContext';

export function RecipeModal() {
  const { selectedRecipe, setSelectedRecipe, isFavorite, toggleFavorite, settings } = useRecipes();

  // Local state for interactive serving size scaling
  const [servings, setServings] = useState(4);
  // Checked items checklist for interactive cooking
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    if (selectedRecipe) {
      setServings(settings?.defaultServings || selectedRecipe.servings || 4);
      setCheckedIngredients({});
      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRecipe, settings]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRecipe(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedRecipe]);

  if (!selectedRecipe) return null;

  const favorited = isFavorite(selectedRecipe.id);
  const baseServings = selectedRecipe.servings || 4;
  const ratio = servings / baseServings;

  const toggleCheck = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Format scaled ingredient amount nicely (e.g. 1.5 -> 1.5, 0.5 -> 1/2 or 0.5)
  const formatAmount = (baseAmount) => {
    if (typeof baseAmount !== 'number') return baseAmount;
    const scaled = baseAmount * ratio;
    // Format to 2 decimal places max, omitting trailing zeroes
    return Math.round(scaled * 100) / 100;
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setSelectedRecipe(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-recipe-title"
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => setSelectedRecipe(null)}
          aria-label="Close recipe details"
        >
          <XIcon size={20} />
        </button>

        {/* Modal Hero Banner & Image */}
        <div className="modal-hero-image-wrap">
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            className="modal-hero-img"
          />
          <div className="modal-hero-overlay"></div>

          {/* Floating Favorite Button inside Modal */}
          <button
            type="button"
            className={`modal-favorite-btn ${favorited ? 'is-favorite' : ''}`}
            onClick={() => toggleFavorite(selectedRecipe.id)}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon size={22} filled={favorited} />
            <span>{favorited ? 'Favorited' : 'Favorite'}</span>
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="modal-body-scroll">
          {/* Header Info */}
          <div className="modal-header-info">
            <div className="modal-tags-row">
              <span className="tag-pill tag-meal">{selectedRecipe.mealType}</span>
              <span className="tag-pill tag-diff">{selectedRecipe.difficulty}</span>
              {selectedRecipe.tags?.map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>

            <h2 id="modal-recipe-title" className="modal-title">
              {selectedRecipe.title}
            </h2>
            <p className="modal-description">{selectedRecipe.description}</p>

            {/* Quick Metrics Bar */}
            <div className="modal-metrics-bar">
              <div className="metric-box">
                <StarIcon size={18} className="star-icon-yellow" filled={true} />
                <div>
                  <span className="metric-val">{selectedRecipe.rating}</span>
                  <span className="metric-sub">({selectedRecipe.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="metric-box">
                <ClockIcon size={18} className="metric-icon-green" />
                <div>
                  <span className="metric-val">{selectedRecipe.prepTime}m prep</span>
                  <span className="metric-sub">{selectedRecipe.cookTime}m cook</span>
                </div>
              </div>

              <div className="metric-box">
                <FlameIcon size={18} className="flame-icon" />
                <div>
                  <span className="metric-val">{selectedRecipe.calories}</span>
                  <span className="metric-sub">Calories / serving</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="modal-divider" />

          {/* Servings Adjuster Bar */}
          <div className="servings-bar">
            <div>
              <h3 className="section-title">Ingredients</h3>
              <p className="section-subtitle">
                Adjust serving size to scale ingredient amounts automatically
              </p>
            </div>

            <div className="servings-counter">
              <span className="servings-label">Servings:</span>
              <button
                type="button"
                className="btn-serving-step"
                disabled={servings <= 1}
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                aria-label="Decrease servings"
              >
                <MinusIcon size={14} />
              </button>
              <span className="servings-number">{servings}</span>
              <button
                type="button"
                className="btn-serving-step"
                disabled={servings >= 12}
                onClick={() => setServings((s) => Math.min(12, s + 1))}
                aria-label="Increase servings"
              >
                <PlusIcon size={14} />
              </button>
            </div>
          </div>

          {/* Interactive Ingredients Checklist */}
          <ul className="modal-ingredients-list">
            {selectedRecipe.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              const scaledAmount = formatAmount(ing.amount);

              return (
                <li
                  key={idx}
                  className={`ingredient-check-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleCheck(idx)}
                >
                  <button
                    type="button"
                    className={`checkbox-circle ${isChecked ? 'active' : ''}`}
                    aria-label={`Toggle ${ing.name}`}
                  >
                    {isChecked && <CheckIcon size={12} />}
                  </button>
                  <span className="ingredient-qty">
                    {scaledAmount} {ing.unit}
                  </span>
                  <span className="ingredient-name">{ing.name}</span>
                </li>
              );
            })}
          </ul>

          <hr className="modal-divider" />

          {/* Step-by-Step Cooking Instructions */}
          <div className="modal-instructions-section">
            <h3 className="section-title">Step-by-Step Instructions</h3>
            <ol className="instructions-list">
              {selectedRecipe.instructions.map((step, idx) => (
                <li key={idx} className="instruction-step">
                  <span className="step-number">{idx + 1}</span>
                  <p className="step-text">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setSelectedRecipe(null)}
          >
            Close
          </button>
          <button
            type="button"
            className={`btn-primary ${favorited ? 'btn-fav-active' : ''}`}
            onClick={() => toggleFavorite(selectedRecipe.id)}
          >
            <HeartIcon size={18} filled={favorited} />
            <span>{favorited ? 'Saved in Favorites' : 'Add to Favorites'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
