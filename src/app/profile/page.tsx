import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import axiosInstance from '@/utils/axiosInstance';
import { Box, Typography, CircularProgress, Alert, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import './profileStyles.css';

const ProfilePage = () => {
    const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
    const [profile, setProfile] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/users/me');
                setProfile(res.data);
                // If admin, also fetch all users
                if (res.data.role === 'admin') {
                    const allRes = await axiosInstance.get('/users');
                    setUsers(allRes.data);
                }
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Alert severity="warning">You must be logged in to view this page.</Alert>;
    }

    if (loading) {
        return (
            <Box className="profile-container" display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box className="profile-container">
            <Box className="profile-card">
                <Typography variant="h4" gutterBottom>
                    {profile?.name || 'User Profile'}
                </Typography>
                <Typography variant="body1"><strong>Email:</strong> {profile?.email}</Typography>
                <Typography variant="body1"><strong>Role:</strong> {profile?.role}</Typography>
            </Box>

            {profile?.role === 'admin' && users.length > 0 && (
                <Box className="admin-users-table" mt={4}>
                    <Typography variant="h5" gutterBottom>All Users</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};

export default ProfilePage;
