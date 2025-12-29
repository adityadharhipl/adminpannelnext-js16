"use client";
import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControlLabel,
    Switch,
    Grid,
    Stack,
    Tooltip,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Security as SecurityIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    addRole,
    updateRole,
    deleteRole,
    toggleRoleStatus,
    selectAllRoles,
    type Role,
} from '@/store/slices/roleSlice';
import DeleteConfirmationDialog from '../components/shared/DeleteConfirmationDialog';

export default function RolesPage() {
    const dispatch = useAppDispatch();
    const roles = useAppSelector(selectAllRoles);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: '',
        isActive: true,
    });

    // Delete confirmation state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

    const handleOpenDialog = (role?: Role) => {
        if (role) {
            setEditingRole(role);
            setFormData({
                name: role.name,
                description: role.description,
                permissions: role.permissions.join(', '),
                isActive: role.isActive,
            });
        } else {
            setEditingRole(null);
            setFormData({
                name: '',
                description: '',
                permissions: '',
                isActive: true,
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingRole(null);
    };

    const handleSubmit = () => {
        const permissions = formData.permissions
            .split(',')
            .map(p => p.trim())
            .filter(p => p.length > 0);

        if (editingRole) {
            dispatch(updateRole({
                ...editingRole,
                name: formData.name,
                description: formData.description,
                permissions,
                isActive: formData.isActive,
            }));
        } else {
            dispatch(addRole({
                name: formData.name,
                description: formData.description,
                permissions,
                isActive: formData.isActive,
            }));
        }
        handleCloseDialog();
    };

    const handleDeleteClick = (roleId: string) => {
        setRoleToDelete(roleId);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (roleToDelete) {
            dispatch(deleteRole(roleToDelete));
            setRoleToDelete(null);
        }
    };

    const handleToggleStatus = (roleId: string) => {
        dispatch(toggleRoleStatus(roleId));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon fontSize="large" />
                        Role Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage user roles and permissions
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    size="large"
                >
                    Add New Role
                </Button>
            </Box>

            <Grid container spacing={3}>
                {roles.map((role) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={role.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4,
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {role.name}
                                        </Typography>
                                        <Chip
                                            label={role.isActive ? 'Active' : 'Inactive'}
                                            color={role.isActive ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </Box>
                                    <Box>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleOpenDialog(role)}
                                                color="primary"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteClick(role.id)}
                                                color="error"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {role.description}
                                </Typography>

                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                        Permissions:
                                    </Typography>
                                    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                                        {role.permissions.map((permission, index) => (
                                            <Chip
                                                key={index}
                                                label={permission}
                                                size="small"
                                                variant="outlined"
                                                sx={{ mb: 0.5 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>

                                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={role.isActive}
                                                onChange={() => handleToggleStatus(role.id)}
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="caption">Active Status</Typography>}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingRole ? 'Edit Role' : 'Add New Role'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Role Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                        <TextField
                            label="Permissions"
                            fullWidth
                            multiline
                            rows={2}
                            value={formData.permissions}
                            onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                            helperText="Enter permissions separated by commas (e.g., read, write, delete)"
                            required
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                />
                            }
                            label="Active"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!formData.name || !formData.description}
                    >
                        {editingRole ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Role"
                content="Are you sure you want to delete this role? This action cannot be undone."
            />
        </Box>
    );
}
