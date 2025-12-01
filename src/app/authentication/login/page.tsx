"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";

const Login2 = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{ height: "100vh", overflowX: "hidden" }}>
        <Grid
          size={{
            xs: 12,
            md: 7,
            lg: 8
          }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.default", 
            p: 4,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src="/images/backgrounds/auth_illustration.png"
              alt="Login Illustration"
              sx={{ width: "100%", maxWidth: "500px", mb: 4 }}
            />
            <Typography variant="h2" fontWeight="700" mb={2}>
              A few clicks is all it takes.
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 5,
            lg: 4
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "background.paper" }}
        >
          <Box p={4} width="100%" maxWidth="450px">
            <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
              <Logo />
            </Box>
            <AuthLogin
              subtext={
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color="textSecondary"
                  mb={1}
                >
                  Your Social Campaigns
                </Typography>
              }
              subtitle={
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mt={3}
                >
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="500"
                  >
                    New to Modernize?
                  </Typography>
                  <Typography
                    component={Link}
                    href="/authentication/register"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Create an account
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default Login2;
