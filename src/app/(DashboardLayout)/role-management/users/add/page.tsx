'use client';

import { Typography, Button, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddUserPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        // Add API call logic here
        router.push('/role-management/users');
    };

    return (
        <PageContainer title="Add User" description="Add User Form">
            <DashboardCard title="Add User Form">
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="firstName" mb="5px">First Name</Typography>
                        <TextField
                            id="firstName"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="lastName" mb="5px">Last Name</Typography>
                        <TextField
                            id="lastName"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="mobile" mb="5px">Mobile</Typography>
                        <TextField
                            id="mobile"
                            name="mobile"
                            variant="outlined"
                            fullWidth
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="address" mb="5px">Address</Typography>
                        <TextField
                            id="address"
                            name="address"
                            variant="outlined"
                            fullWidth
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </DashboardCard>
        </PageContainer>
    );
};

export default AddUserPage;
