import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import CreateEmployee from '../../components/employee/createEmployee';
import EmployeeList from '../../components/employee/employeeList';
import EmployeeFilter from '../../components/employee/employeeFilter';
import { Grid, Box, Typography } from '@material-ui/core';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    setEmployeeList(employees);
  }, [employees])


  return <>
           <DashboardLayout page="employee" permission="read">
             <br />
               <Grid container justify="space-between">
                  <Grid item  md={9} sm={9} xs={12}>
                    <Box pl={3}>
                      <Typography variant="h5">
                         Employee
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item  md={3} sm={3} xs={12}>
                     <CreateEmployee />
                  </Grid>
               </Grid>
               <br />

              <br />
              <EmployeeFilter filterEmployeeList={(emp) => setEmployees(emp)}/>
              <br />
              <EmployeeList employeeList={employeeList}/>
           </DashboardLayout>
         </>
}
export default AllEmployees;
