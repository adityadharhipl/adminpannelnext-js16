"use client";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";

const Register2 = () => (
  <PageContainer title="Register" description="this is Register page">
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
            alt="Register Illustration"
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
          <AuthRegister
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
                justifyContent="center"
                spacing={1}
                mt={3}
              >
                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="400"
                >
                  Already have an Account?
                </Typography>
                <Typography
                  component={Link}
                  href="/authentication/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Sign In
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default Register2;
