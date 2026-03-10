import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Typography,
  Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const EmployeeTable = ({ 
  employees, 
  onEdit, 
  onDelete, 
  sortBy, 
  sortOrder, 
  onSort 
}) => {
  const handleSort = (field) => {
    const isAsc = sortBy === field && sortOrder === 'asc';
    onSort(field, isAsc ? 'desc' : 'asc');
  };

  return (
    <TableContainer 
      component={Paper} 
      className="rounded-xl shadow-sm bg-white"
      sx={{
        '& .MuiTableCell-head': {
          backgroundColor: '#f8fafc',
          fontWeight: 600,
        },
        overflow: 'hidden', // Ensures the border radius is visible
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                ID
              </Typography>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? sortOrder : 'asc'}
                onClick={() => handleSort('name')}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Name
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Gender
              </Typography>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'salary'}
                direction={sortBy === 'salary' ? sortOrder : 'asc'}
                onClick={() => handleSort('salary')}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Salary
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow 
              key={employee.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(0, 0, 0, 0.02) !important',
                  transition: 'all 0.2s ease-in-out'
                },
                height: '60px'
              }}
            >
              <TableCell sx={{ py: 1.5 }}>
                <Typography variant="body2" className="text-gray-600">
                  {employee.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {employee.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" className="text-gray-600">
                  {employee.gender}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  ₹{employee.salary.toLocaleString('en-IN')}
                </Typography>
              </TableCell>
              <TableCell align="right" className="space-x-1">
                <Tooltip title="Edit">
                  <IconButton 
                    size="small" 
                    onClick={() => onEdit(employee)}
                    color="primary"
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(25, 118, 210, 0.04)' 
                      }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton 
                    size="small" 
                    onClick={() => onDelete(employee)}
                    color="error"
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(211, 47, 47, 0.04)' 
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {employees.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={5} 
                align="center" 
                sx={{ py: 6 }}
              >
                <Typography variant="body1" className="text-gray-500">
                  No employees found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;