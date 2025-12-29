'use client';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SuperAdminDashboard = () => {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) return;
        if (user && user.role !== 'superadmin') {
            router.push('/');
        }
    }, [user, isAuthenticated, router]);

    if (!isAuthenticated || (user && user.role !== 'superadmin')) {
        return <Box p={3}><Typography>Loading or Unauthorized...</Typography></Box>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight={700}>Super Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: '#5D87FF', color: 'white' }}>
                        <Typography variant="h6">Total Revenue</Typography>
                        <Typography variant="h3" fontWeight={600}>$50,000</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: '#49BEFF', color: 'white' }}>
                        <Typography variant="h6">System Health</Typography>
                        <Typography variant="h3" fontWeight={600}>99.9%</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: '#FA896B', color: 'white' }}>
                        <Typography variant="h6">Pending Issues</Typography>
                        <Typography variant="h3" fontWeight={600}>5</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: '16px' }}>
                        <Typography variant="h5" gutterBottom>System Logs</Typography>
                        <Typography variant="body2" fontFamily="monospace">
                            [INFO] Server started at port 3000<br />
                            [WARN] High memory usage detected<br />
                            [INFO] Database backup completed
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
export default SuperAdminDashboard;
