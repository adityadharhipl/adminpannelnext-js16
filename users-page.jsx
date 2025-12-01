"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setPage } from "@/redux/slices/userSlice";
import { DataGrid } from "@mui/x-data-grid";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Box,
  Paper,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  styled
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

// Styled components for premium look
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.4)'
    : '0 8px 32px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 48px rgba(0, 0, 0, 0.5)'
      : '0 12px 48px rgba(0, 0, 0, 0.12)',
  }
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.mode === 'dark' ? '#3d3d5c' : '#e0e0e0'}`,
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#3d3d5c' : '#e0e0e0'}`,
    fontSize: '0.95rem',
    padding: theme.spacing(2),
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2d2d44' : '#f5f5f5',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    fontSize: '1rem',
    fontWeight: 600,
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 700,
    }
  },
  '& .MuiDataGrid-row': {
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(99, 102, 241, 0.1)' 
        : 'rgba(99, 102, 241, 0.05)',
      transform: 'translateX(4px)',
    }
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `2px solid ${theme.palette.mode === 'dark' ? '#3d3d5c' : '#e0e0e0'}`,
    backgroundColor: theme.palette.mode === 'dark' ? '#2d2d44' : '#f5f5f5',
  },
  '& .MuiTablePagination-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiDataGrid-virtualScroller': {
    minHeight: '400px',
  }
}));

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(99, 102, 241, 0.1)' 
    : 'rgba(99, 102, 241, 0.05)',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#6366f1' : '#c7d2fe'}`,
  transition: 'all 0.3s ease',
}));

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list, loading, page, limit, totalCount } = useSelector(
    (s) => s.users
  );
  
  const [darkMode, setDarkMode] = useState(false);

  // Create theme based on mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
      },
      secondary: {
        main: '#ec4899',
        light: '#f472b6',
        dark: '#db2777',
      },
      background: {
        default: darkMode ? '#0f0f1e' : '#f8f9fa',
        paper: darkMode ? '#1e1e2e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#e5e7eb' : '#1f2937',
        secondary: darkMode ? '#9ca3af' : '#6b7280',
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-checked': {
              color: '#6366f1',
              '& + .MuiSwitch-track': {
                backgroundColor: '#6366f1',
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [page, dispatch, limit]);

  const rows = list.map((u, i) => ({
    id: u.id,
    sno: page * limit + (i + 1),
    firstName: u.firstName,
    lastName: u.lastName,
    mobile: u.mobile,
    address: u.address,
  }));

  const columns = [
    { 
      field: "sno", 
      headerName: "S.No", 
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: "firstName", 
      headerName: "First Name", 
      flex: 1,
      minWidth: 150,
    },
    { 
      field: "lastName", 
      headerName: "Last Name", 
      flex: 1,
      minWidth: 150,
    },
    { 
      field: "mobile", 
      headerName: "Mobile", 
      width: 160,
    },
    { 
      field: "address", 
      headerName: "Address", 
      flex: 2,
      minWidth: 200,
    },
  ];

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: darkMode 
            ? 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)'
            : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: 4,
          transition: 'background 0.3s ease',
        }}
      >
        <StyledPaper elevation={3}>
          <Header>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{
                background: darkMode
                  ? 'linear-gradient(135deg, #818cf8 0%, #ec4899 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              User Management
            </Typography>
            
            <ToggleContainer>
              <Brightness7 sx={{ color: darkMode ? '#9ca3af' : '#f59e0b' }} />
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleThemeToggle}
                    color="primary"
                  />
                }
                label={darkMode ? 'Dark' : 'Light'}
                sx={{ margin: 0 }}
              />
              <Brightness4 sx={{ color: darkMode ? '#6366f1' : '#9ca3af' }} />
            </ToggleContainer>
          </Header>

          <Box sx={{ height: 600, width: '100%' }}>
            <StyledDataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              paginationMode="server"
              rowCount={totalCount}
              page={page}
              onPageChange={(p) => dispatch(setPage(p))}
              pageSizeOptions={[limit]}
              disableRowSelectionOnClick
              sx={{
                '& .MuiCircularProgress-root': {
                  color: theme.palette.primary.main,
                }
              }}
            />
          </Box>
        </StyledPaper>
      </Box>
    </ThemeProvider>
  );
}
