'use client';
import { Box, Typography, Paper, Button, Card, CardContent, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { IconCheck } from '@tabler/icons-react';

const plans = [
    { name: 'Free', price: '$0', features: ['Basic Access', '1 User', 'Community Support'] },
    { name: 'Pro', price: '$29', features: ['Full Access', '5 Users', 'Priority Support', 'Analytics'] },
    { name: 'Enterprise', price: '$99', features: ['Unlimited Access', 'Unlimited Users', '24/7 Support', 'Custom Integrations'] },
];

const SubscriptionPage = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight={700}>Subscription Plans</Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={4}>Choose the plan that fits your needs.</Typography>
            <Grid container spacing={3}>
                {plans.map((plan) => (
                    <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
                        <Card sx={{ borderRadius: '16px', height: '100%', position: 'relative', overflow: 'visible' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" gutterBottom fontWeight={600}>{plan.name}</Typography>
                                <Typography variant="h3" color="primary" gutterBottom fontWeight={700}>{plan.price}<span style={{ fontSize: '1rem', color: 'gray' }}>/mo</span></Typography>
                                <Box my={3}>
                                    {plan.features.map(feature => (
                                        <Box key={feature} display="flex" alignItems="center" mb={1}>
                                            <IconCheck size={18} color="green" />
                                            <Typography variant="body2" ml={1}>{feature}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                                <Button variant="contained" fullWidth size="large">Select Plan</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default SubscriptionPage;
