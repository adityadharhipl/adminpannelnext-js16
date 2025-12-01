"use client";

import { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const AddUserPage = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        address: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        alert("User Added: " + JSON.stringify(form));

        // After submit → Go back to list page
        router.push("/sample-page");
    };

    return (
        <PageContainer title="Add User" description="Add new user">
            <DashboardCard title="Add User Form">
                <Stack spacing={2}>

                    <TextField label="First Name" name="firstName" onChange={handleChange} fullWidth />
                    <TextField label="Last Name" name="lastName" onChange={handleChange} fullWidth />
                    <TextField label="Mobile" name="mobile" onChange={handleChange} fullWidth />
                    <TextField label="Address" name="address" onChange={handleChange} fullWidth />

                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>

                </Stack>
            </DashboardCard>
        </PageContainer>
    );
};

export default AddUserPage;
