import React, { useEffect, useState, useContext } from 'react';
import { Card, CardContent, Typography, Grid, Container, CircularProgress } from '@mui/material';
import axios from 'axios';
import { contentProvider } from './ContextProvider';
import { toast, ToastContainer } from 'react-toastify';
import AdminNavbar from './AdminNavbar';
const Analytics = () => {
    const { baseURL } = useContext(contentProvider);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(baseURL+"/api/admin/get-analytics",{withCredentials:true})
        .then(response=>{setAnalyticsData(response.data); setLoading(false)})
        .catch(err=>toast.error("Error Fetching Data"))

    }, [baseURL]);

    if (loading) {
        return <CircularProgress  sx={{display:'flex',justifyContent:"center",alignItems:"center"}}/>;
    }

    return (
        <>
        <AdminNavbar/>
        <Container sx={{margin:"10vh auto"}}>
            <Typography variant="h4" component="h1" color='white'  margin={"10vh 0"} gutterBottom>
                Analytics Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Total Users
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {analyticsData?.totalUsers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Total Songs
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {analyticsData?.totalSongs}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Recently Played Users
                            </Typography>
                            {analyticsData?.recentlyPlayedUsers.map((user, index) => (
                                <Typography key={index} variant="body2" color="text.secondary">
                                    {user.name}: {user?.recentlyPlayedCount} plays
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <ToastContainer />
        </Container>
        </>

    );
};

export default Analytics;
