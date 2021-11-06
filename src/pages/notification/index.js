import React from 'react';
import NotificationList from '../../components/notification/list';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box  } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';

const Notification = () => {
  const [selected, setSelected] = React.useState(false);

  return <>
          <DashboardLayout page="notification" permission="read">
             <Grid container>
               <Grid item xs={12} sm={9} md={9} lg={9}>
                 <Box pt={2}>
                 <Typography variant="h4">
                   Notifications
                 </Typography>
                 </Box>
               </Grid>
               <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Grid container justify="center">
                      <Grid item>
                       <Box pt={2} pb={2}>
                      <ToggleButton
                        value={selected}
                        selected={selected}
                        size="small"
                        onChange={() => {
                        setSelected(!selected);
                        }}
                      >
                      {selected?"Show My Notifications":"Show All Notifications"}
                      </ToggleButton>
                      </Box>
                      </Grid>
                    </Grid>
               </Grid>
             </Grid>
            <br />
           <NotificationList viewAs={selected} />
          </DashboardLayout>
         </>
}
export default Notification;
