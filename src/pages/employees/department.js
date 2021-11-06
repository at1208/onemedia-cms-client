import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import Grid from '@material-ui/core/Grid';
import CreateDepartment from '../../components/department/createDepartment'
import DepartmentList from '../../components/department/departmentList';

const AddDepartment = () => {
    return   <>
              <Grid container justify="flex-end" >
                 <Grid item xs={12} sm={3} md={3}>
                   <CreateDepartment />
                 </Grid>
              </Grid>
            </>
}
const Department = () => {
  return <>
          <DashboardLayout page="department" permission="read">
             <br />
             {AddDepartment()}
             <br />
             <DepartmentList />
          </DashboardLayout>
         </>
}

export default Department;
