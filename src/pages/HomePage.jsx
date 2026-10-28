import { useState } from 'react';
import { HeroBanner } from '../components/hero/HeroBanner';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { RecipeGrid } from '../components/recipes/RecipeGrid';
import { RecipeModal } from '../components/recipes/RecipeModal';

export function HomePage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <main className="home-page-layout">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Main Catalog Area */}
      <div className="home-content-container">
        <div className="home-columns-layout">
          {/* Filter Sidebar (Desktop column & Mobile drawer) */}
          <FilterSidebar
            mobileOpen={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />

          {/* Recipe Grid & Sorting */}
          <section className="catalog-main-area">
            <RecipeGrid onOpenMobileFilters={() => setMobileFiltersOpen(true)} />
          </section>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileFiltersOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileFiltersOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Detail Modal */}
      <RecipeModal />
    </main>
  );
}
