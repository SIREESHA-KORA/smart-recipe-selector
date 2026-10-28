import { ChefHatIcon } from './Icons';

export function EmptyState({
  icon = <ChefHatIcon size={48} className="empty-state-icon" />,
  title = "No recipes found",
  message = "Try adjusting your search terms or clearing some filters to find tasty ideas.",
  actionText = "Clear all filters",
  onAction
}) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon-wrapper">
        {icon}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="btn-primary empty-state-btn"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
