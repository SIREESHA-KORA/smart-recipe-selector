import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChefHatIcon, HeartIcon, SettingsIcon } from '../common/Icons';
import { useRecipes } from '../../context/RecipeContext';

export function Navbar() {
  const { favorites } = useRecipes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="navbar-logo-badge">
            <ChefHatIcon size={26} className="navbar-logo-icon" />
          </div>
          <div className="navbar-brand-text">
            <span className="brand-title">Smart Recipe</span>
            <span className="brand-subtitle">Selector</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-link-with-icon">
              <HeartIcon size={18} className="nav-heart-icon" filled={favorites.length > 0} />
              Favorites
              {favorites.length > 0 && (
                <span className="nav-badge" aria-label={`${favorites.length} favorites`}>
                  {favorites.length}
                </span>
              )}
            </span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-link-with-icon">
              <SettingsIcon size={18} />
              Settings
            </span>
          </NavLink>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
            }
            onClick={closeMobileMenu}
          >
            <div className="flex-between">
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="nav-badge">{favorites.length}</span>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
            }
            onClick={closeMobileMenu}
          >
            Settings
          </NavLink>
        </div>
      )}
    </header>
  );
}
