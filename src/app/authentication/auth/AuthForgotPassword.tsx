import React from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { forgotPassword } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';
import {
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface ForgotPasswordType {
    title?: string;
    subtitle?: React.ReactNode;
    subtext?: React.ReactNode;
}

const AuthForgotPassword = ({ title, subtitle, subtext }: ForgotPasswordType) => {
    const [email, setEmail] = React.useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        try {
            const resultAction = await dispatch(forgotPassword(email));
            if (forgotPassword.fulfilled.match(resultAction)) {
                toast.success('Reset link sent to your email');
            } else {
                toast.error(resultAction.payload as string || 'Failed to send reset link');
            }
        } catch (err) {
            toast.error('An unexpected error occurred');
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <form onSubmit={handleSubmit}>
                <Stack>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="email"
                            mb="5px"
                        >
                            Email Address
                        </Typography>
                        <CustomTextField
                            id="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Stack
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                        my={2}
                    >
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        Forgot Password
                    </Button>
                </Box>
            </form>
            {subtitle}
        </>
    );
};

export default AuthForgotPassword;
