import { useState, useEffect } from 'react';

/**
 * Custom hook to sync state with localStorage.
 * Perfect for intermediate React students to learn persistent client-side state.
 *
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Default value if key doesn't exist yet
 * @returns {[any, Function]} - Current value and setter function
 */
export function useLocalStorage(key, initialValue) {
  // Read initial state from localStorage or use initialValue
  const [value, setValue] = useState(() => {
    try {
      const storedItem = localStorage.getItem(key);
      if (storedItem !== null) {
        return JSON.parse(storedItem);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  // Keep localStorage updated whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
