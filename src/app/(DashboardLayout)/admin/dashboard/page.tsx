'use client';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
    const { user, isAuthenticated } = useAppSelector((state: any) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) return;
        if (user && user.role !== 'admin' && user.role !== 'superadmin') {
            router.push('/');
        }
    }, [user, isAuthenticated, router]);

    if (!isAuthenticated || (user && user.role !== 'admin' && user.role !== 'superadmin')) {
        return <Box p={3}><Typography>Loading or Unauthorized...</Typography></Box>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight={700}>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, borderRadius: '16px' }}>
                        <Typography variant="h6" color="textSecondary">User Statistics</Typography>
                        <Typography variant="h3" fontWeight={600}>1,234</Typography>
                        <Typography variant="body2" color="success.main">+5% from last week</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, borderRadius: '16px' }}>
                        <Typography variant="h6" color="textSecondary">Recent Activity</Typography>
                        <Box mt={2}>
                            <Typography variant="body2">• User X logged in</Typography>
                            <Typography variant="body2">• New registration: User Y</Typography>
                            <Typography variant="body2">• Profile updated: User Z</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
export default AdminDashboard;
