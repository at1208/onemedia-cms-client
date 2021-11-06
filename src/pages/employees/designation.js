import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import Grid from '@material-ui/core/Grid';
import CreateDesignation from '../../components/designation/createDesignation'
import DesignationList from '../../components/designation/designationList'


const AddDesignation = () => {
    return  <>
           <Grid container justify="flex-end" >
              <Grid item xs={12} sm={3} md={3}>
                 <CreateDesignation  />
              </Grid>
           </Grid>
           </>
}

const Designation = () => {
  return <>
          <DashboardLayout page="designation" permission="read">
             <br />
             {AddDesignation()}
             <br />
             <DesignationList />
          </DashboardLayout>
         </>
}

export default Designation;
