import { HeartIcon, StarIcon, ClockIcon, FlameIcon } from '../common/Icons';
import { useRecipes } from '../../context/RecipeContext';

export function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite, setSelectedRecipe } = useRecipes();
  const favorited = isFavorite(recipe.id);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const handleCardClick = () => {
    setSelectedRecipe(recipe);
  };

  // Difficulty badge coloring
  const getDifficultyClass = (diff) => {
    if (diff === 'Easy') return 'badge-easy';
    if (diff === 'Medium') return 'badge-medium';
    return 'badge-hard';
  };

  return (
    <article
      className="recipe-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View recipe for ${recipe.title}`}
    >
      {/* Recipe Image & Top Floating Badges */}
      <div className="card-image-wrapper">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-image"
          loading="lazy"
        />
        <div className="card-image-gradient"></div>

        {/* Cook time badge */}
        <div className="card-cook-badge">
          <ClockIcon size={14} />
          <span>{recipe.cookTime === 0 ? 'No-cook' : `${recipe.cookTime}m`}</span>
        </div>

        {/* Orange Favorite Heart Button */}
        <button
          type="button"
          className={`card-heart-btn ${favorited ? 'is-favorite' : ''}`}
          onClick={handleHeartClick}
          aria-label={favorited ? `Remove ${recipe.title} from favorites` : `Add ${recipe.title} to favorites`}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon
            size={20}
            filled={favorited}
            className="heart-icon-svg"
          />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        {/* Rating and Difficulty Row */}
        <div className="card-meta-row">
          <div className="card-rating">
            <StarIcon size={16} className="star-icon-yellow" filled={true} />
            <span className="rating-value">{recipe.rating}</span>
            <span className="rating-reviews">({recipe.reviewCount})</span>
          </div>

          <div className="card-badges-group">
            <span className={`difficulty-badge ${getDifficultyClass(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Recipe Title */}
        <h3 className="card-title">{recipe.title}</h3>

        {/* Recipe Description */}
        <p className="card-description">{recipe.description}</p>

        {/* Tags */}
        <div className="card-tags">
          <span className="tag-pill tag-meal">{recipe.mealType}</span>
          {recipe.tags && recipe.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer with Calories and View Action */}
        <div className="card-footer">
          <div className="card-calories">
            <FlameIcon size={15} className="flame-icon" />
            <span>{recipe.calories} kcal</span>
          </div>

          <button
            type="button"
            className="btn-view-recipe"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRecipe(recipe);
            }}
          >
            View Recipe
          </button>
        </div>
      </div>
    </article>
  );
}
