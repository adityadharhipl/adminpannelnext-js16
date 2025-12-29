'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateMyProfile, changePassword } from '@/store/slices/authSlice';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
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
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [profile, setProfile] = useState<any>(null);

    // Edit Profile State
    const [name, setName] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [value, setValue] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        try {
            const resultAction = await dispatch(changePassword({ currentPassword, newPassword }));
            if (changePassword.fulfilled.match(resultAction)) {
                toast.success("Password changed successfully");
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                if (resultAction.payload) {
                    toast.error(resultAction.payload as string);
                } else {
                    toast.error("Password change failed");
                }
            }
        } catch (error) {
            console.error("Change password error", error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchProfile = async () => {
            try {
                // We can also use the user from Redux if it's Hydrated, but fetching fresh is okay
                const res = await axiosInstance.get('/users/me');
                if (res.data.success) {
                    setProfile(res.data.user);
                    setName(res.data.user.name || '');
                    setPreviewImage(res.data.user.profilePhoto || null);
                } else {
                    // Fallback if structure is different (e.g. direct user object)
                    setProfile(res.data);
                    setName(res.data.name || '');
                    setPreviewImage(res.data.profilePhoto || res.data.avatar || null);
                }
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [isAuthenticated]);

    // Update local state when Redux user updates (optional, but keeps things in sync)
    useEffect(() => {
        if (user) {
            setProfile(user);
            // Verify if we want to overwrite local edits? Maybe not.
            // But valid for initial load or external updates.
            // Let's only update profile display, not form fields if they are being edited.
        }
    }, [user]);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async () => {
        if (!name) {
            toast.error("Name is required");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            if (selectedImage) {
                formData.append('profilePhoto', selectedImage);
            }

            const resultAction = await dispatch(updateMyProfile(formData));

            if (updateMyProfile.fulfilled.match(resultAction)) {
                toast.success("Profile updated successfully");
                // The reducer updates the global user state.
                // We can update local profile state from the result for immediate feedback if needed.
                const payload = resultAction.payload;
                const updatedUser = payload.user || payload;

                setProfile(updatedUser);
                if (updatedUser.profilePhoto) {
                    setPreviewImage(updatedUser.profilePhoto);
                }
            } else {
                if (resultAction.payload) {
                    toast.error(resultAction.payload as string);
                } else {
                    toast.error("Failed to update profile");
                }
            }

        } catch (err: any) {
            console.error("Update profile error", err);
        }
    };

    // if (!isAuthenticated) return <Alert severity="warning">Please login.</Alert>;
    // if (loading) return <CircularProgress />;

    // Helper to get full image URL
    const getImageUrl = (path: string | null | undefined) => {
        if (!path) return undefined;
        if (path.startsWith('http')) return path; // Already a full URL (e.g. google auth avatar)
        if (path.startsWith('blob:')) return path; // Local preview blob
        return `http://localhost:5001${path}`;
    };

    return (
        <Box sx={{ p: 3, maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header Section */}
            <ProfilePaper sx={{ textAlign: 'center', bgcolor: '#3d1c1c', color: 'white' }}>
                <Avatar
                    src={getImageUrl(profile?.profilePhoto || profile?.avatar)}
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
                            <TextField
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                                sx={{ bgcolor: 'background.paper' }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>Profile Image</Typography>
                            <Box display="flex" gap={2} alignItems="center">
                                <Avatar
                                    src={previewImage || getImageUrl(profile?.profilePhoto || profile?.avatar)}
                                    sx={{ width: 50, height: 50 }}
                                />
                                <Button variant="contained" color="inherit" onClick={handleFileClick} sx={{ textTransform: 'none' }}>
                                    Choose file
                                </Button>
                                <Typography variant="body2" color="textSecondary">
                                    {selectedImage ? selectedImage.name : "No file chosen"}
                                </Typography>
                                <input
                                    type="file"
                                    hidden
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button
                                variant="contained"
                                color="warning"
                                size="large"
                                sx={{ mt: 2, px: 4 }}
                                onClick={handleUpdateProfile}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>Current Password</Typography>
                            <TextField
                                fullWidth
                                type="password"
                                variant="outlined"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>New Password</Typography>
                            <TextField
                                fullWidth
                                type="password"
                                variant="outlined"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" gutterBottom>Confirm Password</Typography>
                            <TextField
                                fullWidth
                                type="password"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button
                                variant="contained"
                                color="warning"
                                size="large"
                                sx={{ mt: 2, px: 4 }}
                                onClick={handleChangePassword}
                            >
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
