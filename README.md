# 🍳 Smart Recipe Selector

A modern, responsive React mini-project built with **React**, **Vite**, **JavaScript**, **Plain CSS**, **LocalStorage**, and **React Router**.

Designed with a crisp culinary theme: white navigation bar, chef hat icon with green branding, food photography hero banner, comprehensive sidebar filters, interactive recipe cards with orange favorite hearts and star ratings, dynamic serving-scaling recipe modal, favorites catalog, and user preference settings.

---

## ✨ Features

1. **Rich Recipe Catalog**: 15 sample recipes across Breakfast, Lunch, Dinner, Dessert, and Snack categories with prep times, cook times, calorie counts, ratings, reviews, ingredients, and instructions.
2. **Unified Search & Multi-Filters**:
   - Instant text search across recipe titles, descriptions, tags, and ingredient lists.
   - Filter by Meal Type (All, Breakfast, Lunch, Dinner, Dessert, Snack).
   - Filter by Maximum Cook Time slider with quick preset buttons (≤15m, ≤30m, ≤45m, Any).
   - Filter by Difficulty (Easy, Medium, Hard).
   - Filter by Key Pantry Ingredients (Garlic, Tomato, Avocado, Eggs, Olive Oil, etc.).
   - Multi-filtering works with logical combinations (e.g. *Dinner + Easy + ≤20 mins*).
   - "Clear All Filters" button with active filter counter.
3. **Sorting**: Sort recipes by *Highest Rated*, *Quickest Cook Time*, *Most Popular*, or *Alphabetical*.
4. **Favorites System**:
   - Toggle favorites directly from cards or inside the recipe modal using the orange heart.
   - Live badge on navbar showing total favorites saved.
   - Dedicated `/favorites` page with search and bulk-clear options.
   - Persisted across browser sessions using `localStorage`.
5. **Interactive Recipe Details Modal**:
   - Serving size scaler (+ / -) that automatically scales ingredient amounts proportionally.
   - Interactive cooking checklist to check off ingredients as you prepare them.
   - Step-by-step numbered cooking instructions.
   - Nutritional highlights and prep/cook time breakdown.
6. **Settings Page**:
   - Default serving portion preference (1 to 8 people).
   - Preferred measurement system (Metric vs US Imperial).
   - Dietary lifestyle focus.
   - Browser storage management with data reset controls.
7. **Responsive Design**:
   - Desktop: Side-by-side sticky filter sidebar and 3-column recipe grid.
   - Tablet: 2-column recipe grid.
   - Mobile: Mobile header drawer for filters with smooth slide-in, single column recipe cards, and hamburger navigation.

---

## 📁 Project Structure

```
react/
├── index.html                     # Entry HTML with Google Fonts
├── package.json                   # Dependencies (React, React Router, Vite)
├── vite.config.js                 # Vite bundler configuration
├── src/
│   ├── main.jsx                   # React root entry point
│   ├── App.jsx                    # Router, Provider, and Shell
│   ├── index.css                  # CSS variables, resets, utilities
│   ├── App.css                    # Component and responsive styles
│   ├── data/
│   │   └── recipes.json           # 15 detailed sample recipes
│   ├── hooks/
│   │   └── useLocalStorage.js     # Custom hook for localStorage sync
│   ├── context/
│   │   └── RecipeContext.jsx      # State management (filters, favorites, settings)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Icons.jsx          # Zero-dependency SVG icons
│   │   │   └── EmptyState.jsx     # Reusable empty state view
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Header with branding and favorites badge
│   │   │   └── Footer.jsx         # Footer
│   │   ├── hero/
│   │   │   └── HeroBanner.jsx     # Food banner with search & quick chips
│   │   ├── filters/
│   │   │   └── FilterSidebar.jsx  # Meal type, cook time, difficulty, ingredients
│   │   └── recipes/
│   │       ├── RecipeCard.jsx     # Card with image, heart, rating, badges
│   │       ├── RecipeGrid.jsx     # Results toolbar and cards layout
│   │       └── RecipeModal.jsx    # Modal with serving scaler & checklist
│   └── pages/
│       ├── HomePage.jsx           # Main catalog page
│       ├── FavoritesPage.jsx      # Saved favorites page
│       └── SettingsPage.jsx       # App preferences & storage page
```

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Open `http://localhost:5173/` in your web browser.

### Step 3: Build for Production
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 💡 Notes for Intermediate React Students

- **`useLocalStorage`**: Shows how to synchronize React component state with the browser's `localStorage` safely with JSON parsing and `useEffect`.
- **`useMemo` in `RecipeContext`**: Demonstrates memoizing filtered and sorted arrays so expensive search calculations only re-run when filter dependencies change.
- **Controlled Components**: The search input, range slider, and select dropdowns demonstrate idiomatic React controlled forms.
- **Dynamic Calculation**: The serving scaler in `RecipeModal` shows how to dynamically compute scaled ingredients using `ratio = servings / baseServings` without mutating original data.
