'use client';
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TablePagination,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconPlus, IconPencil, IconTrash, IconEye, IconChevronDown, IconSearch } from '@tabler/icons-react';
import DeleteConfirmationDialog from '../../components/shared/DeleteConfirmationDialog';

const RoleManagementPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Delete confirmation state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

    // Mock data
    const [roles, setRoles] = useState([
        { id: 1, name: 'Aditya Dwivedi', email: 'aditya@example.com', phone: '9876543210', role: 'Admin', color: 'error' },
        { id: 2, name: 'Riya Sharma', email: 'riya@example.com', phone: '9988776655', role: 'Manager', color: 'primary' },
        { id: 3, name: 'Aman Verma', email: 'aman@example.com', phone: '7766554433', role: 'Editor', color: 'warning' },
        { id: 4, name: 'Priya Mehta', email: 'priya@example.com', phone: '8899001122', role: 'Viewer', color: 'success' },
        { id: 5, name: 'Rahul Singh', email: 'rahul@example.com', phone: '9123456789', role: 'Admin', color: 'error' },
    ]);

    const modules = [
        'Setting', 'Subscription Plan', 'Subscription', 'Transaction', 'Category', 'Events', 'Users', 'Roles'
    ];

    const permissions = ['Create', 'Edit', 'Show', 'Delete'];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteClick = (id: number) => {
        setRoleToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (roleToDelete) {
            setRoles(roles.filter(role => role.id !== roleToDelete));
            setRoleToDelete(null);
        }
    };

    return (
        <Box>
            <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" fontWeight={600}>Role Based User List</Typography>
                    <Button
                        variant="contained"
                        startIcon={<IconPlus size={20} />}
                        onClick={handleOpen}
                        color="primary"
                        sx={{ textTransform: 'none', borderRadius: '8px', px: 3 }}
                    >
                        Add User
                    </Button>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box /> {/* Spacer */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton>
                            <IconChevronDown size={20} />
                        </IconButton>
                        <IconButton>
                            <IconChevronDown size={20} />
                        </IconButton>
                        <IconButton>
                            <IconChevronDown size={20} />
                        </IconButton>
                        <IconButton>
                            <IconSearch size={20} />
                        </IconButton>
                    </Box>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>S.No</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Phone</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Role</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={row.id} hover>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {row.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {row.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" color="text.secondary">
                                                {row.phone}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.role}
                                                color={row.color as any}
                                                size="small"
                                                sx={{ borderRadius: '6px', fontWeight: 500 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" gap={1}>
                                                <IconButton size="small" color="primary">
                                                    <IconPencil size={18} />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteClick(row.id)}
                                                >
                                                    <IconTrash size={18} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={roles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Create Role Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
                    Create Role
                    <IconButton onClick={handleClose}>x</IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle2" gutterBottom>Name *</Typography>
                            <TextField fullWidth variant="outlined" size="small" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle2" gutterBottom>Permissions *</Typography>
                            <Box>
                                {modules.map((module) => (
                                    <Accordion key={module} disableGutters elevation={0} sx={{ border: '1px solid #e0e0e0', mb: 1, borderRadius: 1, '&:before': { display: 'none' } }}>
                                        <AccordionSummary expandIcon={<IconChevronDown size={20} />} sx={{ minHeight: '48px', bgcolor: '#f5f5f5' }}>
                                            <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                                                <Typography variant="body2" fontWeight={500}>{module}</Typography>
                                                <Checkbox size="small" />
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                {permissions.map((perm) => (
                                                    <Grid size={{ xs: 3, md: 6 }} key={perm} display="flex" alignItems="center">
                                                        <Checkbox size="small" />
                                                        <Typography variant="body2">{perm}</Typography>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} color="inherit">Cancel</Button>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                content="Are you sure you want to delete this user? This action cannot be undone."
            />
        </Box>
    );
};

export default RoleManagementPage;
