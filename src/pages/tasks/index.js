import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import TaskFilter from '../../components/task/taskFilter';
import CreateTask from '../../components/task/createTask';
import TaskList from '../../components/task/taskList';

const Tasks = () => {
   const [tasks, setTasks] = useState([]);
   const [taskList, setTaskList] = useState([]);
   const [reload, setReload] = React.useState(false);

   useEffect(() => {
     setTaskList(tasks);
   }, [tasks, reload])

  return <>
          <DashboardLayout page="task" permission="read">
            <br />
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Tasks
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                <CreateTask reload={(val) => setReload(!reload)} />
               </Grid>
            </Grid>
            <br />
            <TaskFilter tasks={(tasks) => setTasks(tasks)} reload={reload} />
            <TaskList taskList={taskList} reload={(val) => setReload(!reload)} />
          </DashboardLayout>
         </>
}

export default Tasks;
