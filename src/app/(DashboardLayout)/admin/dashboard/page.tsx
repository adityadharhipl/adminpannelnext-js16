'use client';

import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ======================
   SAMPLE DATA
====================== */

const userGrowthData = [
  { day: 'Mon', users: 200 },
  { day: 'Tue', users: 350 },
  { day: 'Wed', users: 500 },
  { day: 'Thu', users: 450 },
  { day: 'Fri', users: 700 },
  { day: 'Sat', users: 900 },
  { day: 'Sun', users: 1200 },
];

const userRoleData = [
  { name: 'Users', value: 900 },
  { name: 'Admins', value: 200 },
  { name: 'SuperAdmins', value: 50 },
];

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02'];

/* ======================
   COMPONENT
====================== */

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAppSelector((state: any) => state.auth);
  const router = useRouter();

  /* ======================
     AUTH + ROLE CHECK
  ====================== */
  useEffect(() => {
    if (!isAuthenticated) return;

    if (user && user.role !== 'admin' && user.role !== 'superadmin') {
      router.push('/');
    }
  }, [user, isAuthenticated, router]);

  if (!isAuthenticated || (user && user.role !== 'admin' && user.role !== 'superadmin')) {
    return (
      <Box p={4}>
        <Typography>Loading or Unauthorized...</Typography>
      </Box>
    );
  }

  /* ======================
     UI
  ====================== */

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* ======================
           STATS CARDS
        ====================== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography color="text.secondary">Total Users</Typography>
            <Typography variant="h3" fontWeight={700}>
              1,234
            </Typography>
            <Typography color="success.main">+5% this week</Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography color="text.secondary">Admins</Typography>
            <Typography variant="h3" fontWeight={700}>
              250
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography color="text.secondary">Active Today</Typography>
            <Typography variant="h3" fontWeight={700}>
              312
            </Typography>
          </Paper>
        </Grid>

        {/* ======================
           LINE CHART
        ====================== */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 360 }}>
            <Typography variant="h6" gutterBottom>
              User Growth (Weekly)
            </Typography>

            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={userGrowthData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#1976d2"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* ======================
           PIE CHART
        ====================== */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: 360 }}>
            <Typography variant="h6" gutterBottom>
              User Roles
            </Typography>

            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                >
                  {userRoleData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* ======================
           RECENT ACTIVITY
        ====================== */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography>• User John logged in</Typography>
            <Typography>• New registration: Sarah</Typography>
            <Typography>• Profile updated: Admin Mike</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
