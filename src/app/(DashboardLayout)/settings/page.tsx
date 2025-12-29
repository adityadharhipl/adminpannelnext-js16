'use client';
import { Box, Typography, Paper, Switch, FormControlLabel, Divider } from '@mui/material';

const SettingsPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, borderRadius: '16px' }}>
                <Typography variant="h5" gutterBottom>Settings</Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" flexDirection="column" gap={2}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
                    <FormControlLabel control={<Switch />} label="Dark Mode" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Two-Factor Authentication" />
                    <FormControlLabel control={<Switch />} label="Public Profile" />
                </Box>
            </Paper>
        </Box>
    );
};
export default SettingsPage;
