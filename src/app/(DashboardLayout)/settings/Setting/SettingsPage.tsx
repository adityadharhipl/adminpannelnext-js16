'use client';

import { Box, Paper, Typography } from '@mui/material';
import SettingsTabs from './SettingsTabs';

const SettingsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Settings
        </Typography>
        <SettingsTabs />
      </Paper>
    </Box>
  );
};

export default SettingsPage;
