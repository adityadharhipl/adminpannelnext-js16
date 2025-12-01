import React from "react";
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

const AuthForgotPassword = ({ title, subtitle, subtext }: ForgotPasswordType) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

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
                <CustomTextField id="email" variant="outlined" fullWidth />
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
                component={Link}
                href="/authentication/login"
                type="submit"
            >
                Forgot Password
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthForgotPassword;
