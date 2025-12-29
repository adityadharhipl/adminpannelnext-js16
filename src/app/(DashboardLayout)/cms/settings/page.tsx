'use client';
import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Paper, Button, TextField } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { IconUpload, IconPhoto } from '@tabler/icons-react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `settings-tab-${index}`,
        'aria-controls': `settings-tabpanel-${index}`,
    };
}

const SettingsPage = () => {
    const [tabValue, setTabValue] = useState(0);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <DashboardCard title="Settings">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
                        <Tab label="Site Logo" {...a11yProps(0)} />
                        <Tab label="Demo Tab 1" {...a11yProps(1)} />
                        <Tab label="Demo Tab 2" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Site Logo Management
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Upload and manage your site logo. Recommended size: 200x200px
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                alignItems: 'flex-start',
                            }}
                        >
                            {logoPreview && (
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minHeight: 200,
                                        minWidth: 200,
                                        bgcolor: 'background.default',
                                    }}
                                >
                                    <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                                    />
                                </Paper>
                            )}

                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<IconUpload size={18} />}
                                sx={{ mt: 2 }}
                            >
                                Upload Logo
                                <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
                            </Button>
                        </Box>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Demo Tab 1
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            This is a demo tab for additional settings.
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
                            <TextField fullWidth label="Setting 1" variant="outlined" />
                            <TextField fullWidth label="Setting 2" variant="outlined" />
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                            <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Demo Tab 2
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            This is another demo tab for additional settings.
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
                            <TextField fullWidth label="Configuration 1" variant="outlined" />
                            <TextField fullWidth label="Configuration 2" variant="outlined" />
                            <TextField fullWidth label="API Key" variant="outlined" type="password" />
                            <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
                                Save Configuration
                            </Button>
                        </Box>
                    </Box>
                </TabPanel>
            </Box>
        </DashboardCard>
    );
};

export default SettingsPage;
