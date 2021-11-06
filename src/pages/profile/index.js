import React from 'react';
import MyProfile from '../../components/profile/profile';
import DashboardLayout from '../../components/layout/dashboardLayout';
import UpdateProfile from '../../components/profile/updateProfile';
import { Grid, Typography, Box  } from '@material-ui/core';

const Profile = () => {
  return <>
          <DashboardLayout page="my_profile" permission="read">
             <Grid container>
               <Grid item xs={12} sm={9} md={9} lg={9}>
                 <Box pt={2}>
                 <Typography variant="h4">
                 </Typography>
                 </Box>
               </Grid>
               <Grid item xs={12} sm={3} md={3} lg={3}>
                 {/*<UpdateProfile />*/}
               </Grid>
             </Grid>

            <MyProfile />
          </DashboardLayout>
         </>
}
export default Profile;
