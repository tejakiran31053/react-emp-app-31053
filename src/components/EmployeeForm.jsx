import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';

const EmployeeForm = ({ open, onClose, onSave, employee = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        gender: employee.gender,
        salary: employee.salary.toString()
      });
    } else {
      setFormData({
        name: '',
        gender: '',
        salary: ''
      });
    }
    setErrors({});
  }, [employee, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    // Validate salary
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else {
      const salaryNum = parseFloat(formData.salary);
      if (isNaN(salaryNum)) {
        newErrors.salary = 'Please enter a valid number';
      } else if (salaryNum <= 0) {
        newErrors.salary = 'Salary must be greater than 0';
      } else if (salaryNum > 1000000000) { // 1 billion limit
        newErrors.salary = 'Salary amount is too large';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({
        id: employee?.id || Date.now().toString(),
        name: formData.name.trim(),
        gender: formData.gender,
        salary: parseFloat(formData.salary)
      });
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        elevation: 2,
        className: "rounded-xl",
        sx: {
          maxWidth: '500px',
          margin: '20px',
          '& .MuiDialogContent-root': {
            paddingTop: '24px',
          }
        }
      }}
    >
      <DialogTitle 
        component="div"
        sx={{ 
          pb: 2, 
          pt: 3,
          px: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'grey.50'
        }}
      >
        <Typography variant="h6" component="h2" sx={{ 
          color: 'grey.800',
          fontWeight: 600,
          fontSize: '1.25rem',
          mb: 0.5
        }}>
          {employee ? 'Edit Employee' : 'Add Employee'}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'grey.600',
            fontSize: '0.875rem'
          }}
        >
          {employee ? 'Update the employee information below' : 'Fill in the employee information below'}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          py: 2
        }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                color: 'grey.700'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey.300'
              }
            }}
            placeholder="Enter employee name"
          />
          <FormControl 
            fullWidth 
            error={!!errors.gender}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                color: 'grey.700'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey.300'
              }
            }}
          >
            {errors.gender && (
              <Typography
                variant="caption"
                sx={{
                  color: 'error.main',
                  mt: -1,
                  mb: 1
                }}
              >
                {errors.gender}
              </Typography>
            )}
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 200,
                    mt: 0.5,
                    '& .MuiMenuItem-root': {
                      py: 1,
                      px: 2
                    }
                  }
                }
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            error={!!errors.salary}
            helperText={errors.salary}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                color: 'grey.700'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey.300'
              }
            }}
            placeholder="Enter salary amount"
            InputProps={{
              startAdornment: (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'grey.600',
                    mr: 1,
                    fontWeight: 500 
                  }}
                >
                  ₹
                </Typography>
              )
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions 
        sx={{ 
          px: 3, 
          py: 2.5,
          gap: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'grey.50'
        }}
      >
        <Button 
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            py: 1,
            minWidth: '100px',
            borderColor: 'grey.300',
            color: 'grey.700',
            '&:hover': {
              borderColor: 'grey.400',
              backgroundColor: 'grey.50'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            py: 1,
            minWidth: '100px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: 'primary.dark'
            }
          }}
        >
          {employee ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Add prop types validation
EmployeeForm.defaultProps = {
  employee: null,
};

export default EmployeeForm;