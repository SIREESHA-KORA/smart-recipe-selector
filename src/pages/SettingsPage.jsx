import { useState } from 'react';
import { SettingsIcon, CheckIcon, TrashIcon, RefreshIcon } from '../components/common/Icons';
import { useRecipes } from '../context/RecipeContext';

export function SettingsPage() {
  const { settings, setSettings, favorites, toggleFavorite } = useRecipes();
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const handleServingChange = (num) => {
    setSettings((prev) => ({
      ...prev,
      defaultServings: num
    }));
    showToast(`Default servings set to ${num}`);
  };

  const handleUnitChange = (unit) => {
    setSettings((prev) => ({
      ...prev,
      measurementUnit: unit
    }));
    showToast(`Measurement unit set to ${unit}`);
  };

  const handleDietChange = (diet) => {
    setSettings((prev) => ({
      ...prev,
      dietaryPreference: diet
    }));
    showToast(`Dietary preference set to ${diet}`);
  };

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to remove all saved favorites?')) {
      favorites.forEach((id) => toggleFavorite(id));
      showToast('All favorites removed');
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Reset all application preferences to defaults?')) {
      setSettings({
        defaultServings: 2,
        measurementUnit: 'Metric',
        dietaryPreference: 'All'
      });
      showToast('Preferences reset to default values');
    }
  };

  return (
    <main className="page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckIcon size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="page-header">
        <div className="page-title-group">
          <div className="page-icon-badge settings-badge-color">
            <SettingsIcon size={26} className="text-green" />
          </div>
          <div>
            <h1 className="page-title">App Settings</h1>
            <p className="page-subtitle">
              Customize your recipe viewing experience. All preferences are preserved in LocalStorage.
            </p>
          </div>
        </div>
      </div>

      <div className="settings-grid">
        {/* Section 1: Default Servings */}
        <div className="settings-card">
          <h2 className="settings-card-title">Default Servings</h2>
          <p className="settings-card-desc">
            Choose how many portions recipes should scale to by default when opening the recipe modal.
          </p>

          <div className="servings-selector-pills">
            {[1, 2, 4, 6, 8].map((num) => {
              const isSelected = (settings?.defaultServings || 2) === num;
              return (
                <button
                  key={num}
                  type="button"
                  className={`serving-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => handleServingChange(num)}
                >
                  <span>{num}</span>
                  <span className="sub-portion">{num === 1 ? 'person' : 'people'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Measurement Units */}
        <div className="settings-card">
          <h2 className="settings-card-title">Measurement Units</h2>
          <p className="settings-card-desc">
            Choose your preferred ingredient volume and weight units.
          </p>

          <div className="options-button-group">
            {[
              { id: 'Metric', label: 'Metric', desc: 'Grams, Milliliters, Kilograms' },
              { id: 'US Imperial', label: 'US Imperial', desc: 'Cups, Ounces, Tablespoons' }
            ].map((unit) => {
              const isSelected = (settings?.measurementUnit || 'Metric') === unit.id;
              return (
                <button
                  key={unit.id}
                  type="button"
                  className={`option-card-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleUnitChange(unit.id)}
                >
                  <div className="option-check-circle">
                    {isSelected && <CheckIcon size={12} />}
                  </div>
                  <div className="text-left">
                    <strong className="block font-medium">{unit.label}</strong>
                    <span className="text-muted text-xs">{unit.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Dietary Highlighting */}
        <div className="settings-card">
          <h2 className="settings-card-title">Dietary Focus</h2>
          <p className="settings-card-desc">
            Highlight recipes matching your preferred eating lifestyle.
          </p>

          <div className="diet-tags-group">
            {['All', 'Vegetarian', 'High-Protein', 'Gluten-Free', 'Low-Carb'].map((diet) => {
              const isSelected = (settings?.dietaryPreference || 'All') === diet;
              return (
                <button
                  key={diet}
                  type="button"
                  className={`diet-tag-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleDietChange(diet)}
                >
                  {isSelected && <CheckIcon size={14} className="inline-check" />}
                  <span>{diet}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Local Storage Data Management */}
        <div className="settings-card">
          <h2 className="settings-card-title">Browser Storage Management</h2>
          <p className="settings-card-desc">
            Your favorites and preferences are securely saved on this device.
          </p>

          <div className="storage-summary-box">
            <div className="storage-row">
              <span className="storage-label">Saved Favorites:</span>
              <strong className="storage-value">{favorites.length} recipes</strong>
            </div>
            <div className="storage-row">
              <span className="storage-label">Storage Engine:</span>
              <strong className="storage-value">Browser LocalStorage</strong>
            </div>
          </div>

          <div className="storage-actions-group">
            <button
              type="button"
              className="btn-danger-outline"
              disabled={favorites.length === 0}
              onClick={handleClearFavorites}
            >
              <TrashIcon size={16} />
              <span>Clear All Favorites ({favorites.length})</span>
            </button>

            <button
              type="button"
              className="btn-outline-neutral"
              onClick={handleResetSettings}
            >
              <RefreshIcon size={16} />
              <span>Reset All Settings</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
