import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import './App.css';

export default function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="app-shell">
          {/* Top Sticky White Navbar with Green Branding */}
          <Navbar />

          {/* Dynamic Page Routes */}
          <div className="app-content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* App Footer */}
          <Footer />
        </div>
      </Router>
    </RecipeProvider>
  );
}
