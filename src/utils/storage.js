// Helper functions for employee data management in sessionStorage

const STORAGE_KEY = 'employees_v1';

// Get all employees from sessionStorage
export const getEmployees = () => {
  try {
    const employees = sessionStorage.getItem(STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
  } catch (error) {
    console.error('Error reading employees:', error);
    return [];
  }
};

// Save employees to sessionStorage
export const saveEmployees = (employees) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return true;
  } catch (error) {
    console.error('Error saving employees:', error);
    return false;
  }
};

// Export employees as JSON file
export const exportEmployees = () => {
  try {
    const employees = getEmployees();
    const blob = new Blob([JSON.stringify(employees, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'employees.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting employees:', error);
    return false;
  }
};

// Import employees from JSON file
export const importEmployees = async (file, merge = false) => {
  try {
    const text = await file.text();
    const importedEmployees = JSON.parse(text);
    
    if (!Array.isArray(importedEmployees)) {
      throw new Error('Invalid employee data format');
    }

    const currentEmployees = merge ? getEmployees() : [];
    const newEmployees = merge
      ? [...currentEmployees, ...importedEmployees]
      : importedEmployees;
    
    saveEmployees(newEmployees);
    return { success: true, count: importedEmployees.length, employees: newEmployees };
  } catch (error) {
    console.error('Error importing employees:', error);
    return { success: false, error: error.message };
  }
};