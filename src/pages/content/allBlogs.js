import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import BlogFilter from '../../components/content/blogFilter';
import BlogList from '../../components/content/blogList';
import { Grid, Typography, Box } from '@material-ui/core';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    setBlogList(blogs);
  }, [blogs])

  return <>
          <DashboardLayout page="blog" permission="read">
            <Grid container justify="space-between">
               <Grid item  md={9} sm={9} xs={12}>
                 <Box pl={3}>
                   <Typography variant="h5">
                      Blogs
                   </Typography>
                 </Box>
               </Grid>
               <Grid item  md={3} sm={3} xs={12}>
               </Grid>
            </Grid>
            <br />
            <BlogFilter blogs={(blogs) => setBlogs(blogs)}/>
            <BlogList blogs={blogList}/>
          </DashboardLayout>
        </>
}

export default AllBlogs;
