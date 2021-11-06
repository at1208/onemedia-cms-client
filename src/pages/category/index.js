import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid, Typography, Box } from '@material-ui/core';
import CreateCategory from '../../components/category/createCategory';
import CategoryList from '../../components/category/categoryList';
import CategoryFilter from '../../components/category/categoryFilter';

const Categories = () => {
  const [tasks, setTasks] = useState([]);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks])

  return <>
            <DashboardLayout page="category" permission="read">
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Categories
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
                 <CreateCategory />
               </Grid>
            </Grid>
            <br />
            <CategoryFilter filterCategoryList={(categories) => setTasks(categories)}/>
            <CategoryList categoryList={taskList}/>
            </DashboardLayout>
         </>
}

export default Categories;
