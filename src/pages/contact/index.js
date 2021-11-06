import React from 'react';
import ContactFilterList from '../../components/contact/contactFilter';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid } from '@material-ui/core';

const Contact = () => {
  return <>
          <DashboardLayout page="contact" permission="read">
             <Grid container justify="flex-start">
               <Grid item xs={12} sm={3} md={3} lg={3}>
                   <ContactFilterList />
               </Grid>
               <Grid item xs={12} sm={8} md={8} lg={8}>
               </Grid>
             </Grid>
          </DashboardLayout>
         </>
}

export default Contact;
