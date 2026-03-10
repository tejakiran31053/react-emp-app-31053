import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Container,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  FileDownload as ExportIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import './App.css';

import useSessionStorage from './hooks/useSessionStorage';
import { exportEmployees, importEmployees } from './utils/storage';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';

function App() {
  // State management
  const [employees, setEmployees] = useSessionStorage('employees_v1', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Filter and sort employees
  const filteredEmployees = employees
    .filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const modifier = sortOrder === 'asc' ? 1 : -1;
      return aVal > bVal ? modifier : -modifier;
    });

  // Handlers
  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setFormOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    setDeleteConfirmOpen(false);
    showSnackbar('Employee deleted successfully', 'success');
  };

  const handleSave = (employeeData) => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === employeeData.id ? employeeData : emp
      ));
      showSnackbar('Employee updated successfully', 'success');
    } else {
      setEmployees([...employees, employeeData]);
      showSnackbar('Employee added successfully', 'success');
    }
  };

  const handleExport = () => {
    if (exportEmployees()) {
      showSnackbar('Employees exported successfully', 'success');
    } else {
      showSnackbar('Error exporting employees', 'error');
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importEmployees(file);
    if (result.success) {
      setEmployees(result.employees);
      showSnackbar(`Successfully imported ${result.count} employees`, 'success');
    } else {
      showSnackbar(`Error importing employees: ${result.error}`, 'error');
    }
    event.target.value = null; // Reset file input
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box className="min-h-screen bg-gray-100">
      <AppBar 
        position="static" 
        elevation={2}
        sx={{
          backgroundColor: 'primary.main',
          borderBottom: 1,
          borderColor: 'primary.dark',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ 
            py: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 0 },
            '& > *': { flexShrink: 0 }
          }}>
            {/* Logo and Title */}
            <Typography 
              variant="h5" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'white',
                flexGrow: { md: 1 },
                textAlign: { xs: 'center', md: 'left' },
                width: { xs: '100%', md: 'auto' }
              }}
            >
              Employee Manager
            </Typography>

            {/* Search and Actions Container */}
            <Box sx={{ 
              display: 'flex',
              gap: 2,
              width: { xs: '100%', md: 'auto' },
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-end' }
            }}>
              {/* Search Field */}
              <TextField
                size="small"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: { xs: '100%', sm: 250 },
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s',
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      }
                    }
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex',
                gap: 1,
                alignItems: 'center'
              }}>
                <Tooltip title="Export Employees">
                  <IconButton 
                    color="inherit"
                    onClick={handleExport}
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                      }
                    }}
                  >
                    <ExportIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAdd}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    backgroundColor: 'white',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                    whiteSpace: 'nowrap'
                  }}
                >
                  Add Employee
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2" className="text-gray-700">
            Employee List
          </Typography>
          <Typography variant="body2" className="text-gray-500 mt-1">
            Manage your employees and their information
          </Typography>
        </Box>
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </Container>

      <EmployeeForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        employee={selectedEmployee}
      />

      <Dialog 
        open={deleteConfirmOpen} 
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          elevation: 3,
          className: "rounded-lg"
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="h2" className="text-gray-800">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" className="text-gray-600 pt-2">
            Are you sure you want to delete {selectedEmployee?.name}?
          </Typography>
        </DialogContent>
        <DialogActions className="p-4 space-x-2">
          <Button 
            onClick={() => setDeleteConfirmOpen(false)}
            variant="outlined"
            color="inherit"
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            variant="contained"
            color="error"
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              px: 3
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ 
            borderRadius: '10px',
            boxShadow: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
