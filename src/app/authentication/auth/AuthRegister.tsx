import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';

import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface registerType {
    title?: string;
    subtitle?: React.ReactNode;
    subtext?: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: any) => {
        const resultAction = await dispatch(registerUser(data));
        if (registerUser.fulfilled.match(resultAction)) {
            toast.success('Registration successful!');
            router.push('/authentication/login');
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack mb={3}>
                    {/* Name */}
                    <Typography variant="subtitle1" fontWeight={600} mb="5px">
                        Name
                    </Typography>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                variant="outlined"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />

                    {/* Email */}
                    <Typography variant="subtitle1" fontWeight={600} mb="5px" mt="25px">
                        Email Address
                    </Typography>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        }}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                variant="outlined"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                    {/* Password with Eye Toggle */}
                    <Typography variant="subtitle1" fontWeight={600} mb="5px" mt="25px">
                        Password
                    </Typography>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        }}
                        render={({ field }) => (
                            <CustomTextField
                                {...field}
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePassword} edge="end">
                                                {showPassword ? (
                                                    <IconEyeOff size={20} />
                                                ) : (
                                                    <IconEye size={20} />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </Stack>

                {/* Submit Button */}
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
