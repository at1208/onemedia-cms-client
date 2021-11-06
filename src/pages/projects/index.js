import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import ProjectList from './projectList';
import CreateProject from '../../components/project/createProject';
import EditProject from '../../components/project/editProject';

const Project = () => {
   const [edit, setEdit] = useState({
     open: false,
     project:""
   });

  return <>
          <DashboardLayout page="project" permission="read">
            <br />
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Projects
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                 <CreateProject />
               </Grid>
            </Grid>
            <br />
            <ProjectList edit={(value) => setEdit({...edit, open: true, project: value })}/>
            <EditProject editProject={edit.project} status={status => setEdit({...edit, open: status })} modal={edit.open}/>
          </DashboardLayout>
         </>
}

export default Project;
