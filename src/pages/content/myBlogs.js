import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import MyBlogsList from '../../components/content/myBlogs';

const MyBlogs = () => {
  return <DashboardLayout page="my_blogs" permission="read">
           <br />
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      My Blogs
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
               </Grid>
            </Grid>
            <br />
            <MyBlogsList />
         </DashboardLayout>
}
export default MyBlogs;
