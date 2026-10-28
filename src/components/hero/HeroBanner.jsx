import { SearchIcon, XIcon } from '../common/Icons';
import { useRecipes } from '../../context/RecipeContext';

export function HeroBanner() {
  const { searchTerm, setSearchTerm, setMaxCookTime, setSelectedMealType } = useRecipes();

  const handleQuickTagClick = (tag) => {
    if (tag === 'Quick (< 20m)') {
      setMaxCookTime(20);
    } else if (tag === 'Breakfast' || tag === 'Dinner') {
      setSelectedMealType(tag);
    } else {
      setSearchTerm(tag);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-badge">Culinary Companion</span>
        <h1 className="hero-heading">Find something good to cook</h1>
        <p className="hero-subheading">
          Explore handcrafted recipes, filter by ingredients you already have, and cook up something unforgettable.
        </p>

        {/* Integrated Search Bar */}
        <div className="hero-search-wrapper">
          <div className="hero-search-bar">
            <SearchIcon size={22} className="search-input-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes, ingredients (e.g. garlic, chicken, pasta)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search recipes and ingredients"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search text"
              >
                <XIcon size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="hero-quick-chips">
          <span className="quick-chips-label">Popular:</span>
          {['Garlic', 'Pasta', 'Avocado', 'Quick (< 20m)', 'Breakfast', 'Dinner'].map((chip) => (
            <button
              key={chip}
              type="button"
              className="quick-chip-btn"
              onClick={() => handleQuickTagClick(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
