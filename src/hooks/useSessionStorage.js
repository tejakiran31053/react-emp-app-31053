import { useState, useEffect } from 'react';

// Custom hook for managing state with sessionStorage
const useSessionStorage = (key, initialValue) => {
  // Get initial value from sessionStorage or use provided initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return initialValue;
    }
  });

  // Update sessionStorage when value changes
  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;