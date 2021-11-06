import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import MyTaskList from '../../components/task/myTasks';

const MyTasks = () => {
  return <DashboardLayout page="my_tasks" permission="read">
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      My Tasks
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
               </Grid>
            </Grid>
            <br />
            <MyTaskList />
         </DashboardLayout>
}
export default MyTasks;
