'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import axiosInstance from '@/utils/axiosInstance';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Avatar,
    Button,
    Paper,
    IconButton,
    TextField,
    Tabs,
    Tab,
    InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconMail, IconLock } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';

const ProfilePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    background: theme.palette.mode === 'dark' ? '#1e1e2e' : '#ffffff',
    marginBottom: theme.spacing(3),
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ProfilePage = () => {
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [value, setValue] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get('/users/me');
                setProfile(res.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [isAuthenticated]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    // if (!isAuthenticated) return <Alert severity="warning">Please login.</Alert>;
    // if (loading) return <CircularProgress />;

    return (
        <Box sx={{ p: 3, maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header Section */}
            <ProfilePaper sx={{ textAlign: 'center', bgcolor: '#3d1c1c', color: 'white' }}>
                <Avatar
                    src={profile?.avatar}
                    alt={profile?.name}
                    sx={{ width: 100, height: 100, margin: '0 auto 16px', border: '3px solid white' }}
                />
                <Typography variant="h5" fontWeight="bold">{profile?.name || 'User Name'}</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={1}>
                    <IconMail size={16} />
                    <Typography variant="body2">{profile?.email || 'email@example.com'}</Typography>
                </Box>
            </ProfilePaper>

            {/* Tabs Section */}
            <ProfilePaper>
                <Tabs value={value} onChange={handleChange} centered textColor="primary" indicatorColor="primary">
                    <Tab label="Edit Profile" />
                    <Tab label="Change Password" />
                </Tabs>

                <CustomTabPanel value={value} index={0}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>Name *</Typography>
                            <TextField fullWidth defaultValue={profile?.name} variant="outlined" sx={{ bgcolor: 'background.paper' }} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>Profile Image</Typography>
                            <Box display="flex" gap={2} alignItems="center">
                                <Button variant="contained" color="inherit" onClick={handleFileClick} sx={{ textTransform: 'none' }}>
                                    Choose file
                                </Button>
                                <Typography variant="body2" color="textSecondary">No file chosen</Typography>
                                <input type="file" hidden ref={fileInputRef} />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button variant="contained" color="warning" size="large" sx={{ mt: 2, px: 4 }}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>Current Password</Typography>
                            <TextField fullWidth type="password" variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>New Password</Typography>
                            <TextField fullWidth type="password" variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>Confirm Password</Typography>
                            <TextField fullWidth type="password" variant="outlined" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button variant="contained" color="warning" size="large" sx={{ mt: 2, px: 4 }}>
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
            </ProfilePaper>
        </Box>
    );
};

export default ProfilePage;
