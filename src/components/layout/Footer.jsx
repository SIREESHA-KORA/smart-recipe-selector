import { ChefHatIcon, HeartIcon } from '../common/Icons';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <ChefHatIcon size={22} className="footer-logo-icon" />
          <span className="footer-brand-name">Smart Recipe Selector</span>
        </div>
        <p className="footer-tagline">
          Discover, customize, and cook delicious meals with confidence.
        </p>
        <p className="footer-copyright">
          Built with React &amp; Vite • All data stored locally in your browser.
        </p>
      </div>
    </footer>
  );
}
