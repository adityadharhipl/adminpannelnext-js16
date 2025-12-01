"use client";

import { Typography, IconButton, Stack, Button, useTheme } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useRouter } from "next/navigation";

const SamplePage = () => {
  const router = useRouter();
  const theme = useTheme();

  // Demo Data
  const rows = [
    { id: 1, firstName: "Aditya", lastName: "Dwivedi", mobile: "9876543210", address: "India" },
    { id: 2, firstName: "Riya", lastName: "Sharma", mobile: "9988776655", address: "Delhi" },
    { id: 3, firstName: "Aman", lastName: "Verma", mobile: "7766554433", address: "Mumbai" },
    { id: 4, firstName: "Priya", lastName: "Mehta", mobile: "8899001122", address: "Pune" },
  ];

  // Edit / Delete
  const handleEdit = (row: any) => router.push(`/sample-page/edit/${row.id}`);
  const handleDelete = (row: any) => confirm(`Delete user ${row.firstName}?`) && alert("Deleted!");

  // Columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "mobile", headerName: "Mobile", width: 150 },
    { field: "address", headerName: "Address", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params: any) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDelete(params.row)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <PageContainer title="Users" description="User Management Page">
      <DashboardCard
        title="User List"
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push("/sample-page/add")}>
            Add User
          </Button>
        }
      >
        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            showToolbar
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 300 },
              },
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            sx={{
              border: "none",
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,

              // HEADER STYLE
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.mode === 'dark' ? '#2d2d44' : '#f7f7f7',
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                fontWeight: "bold",
                color: theme.palette.text.primary,
              },

              // CELLS
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
              },

              // ROW BORDER
              "& .MuiDataGrid-row": {
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.1)'
                    : '#f5f5f5',
                },
              },

              // FOOTER
              "& .MuiDataGrid-footerContainer": {
                borderTop: `2px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.mode === 'dark' ? '#2d2d44' : '#f7f7f7',
              },

              // TOOLBAR
              "& .MuiDataGrid-toolbarContainer": {
                padding: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "& .MuiButton-root": {
                  color: theme.palette.text.primary,
                },
              },

              // PAGINATION
              "& .MuiTablePagination-root": {
                color: theme.palette.text.primary,
              },

              // ICONS
              "& .MuiDataGrid-iconSeparator": {
                color: theme.palette.divider,
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme.palette.text.secondary,
              },
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
          />
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

