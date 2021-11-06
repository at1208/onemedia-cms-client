import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Box, Chip} from '@material-ui/core';
import { getDashboardInfo } from '../../actions/dashboard';
import { getCookie } from '../../actions/auth'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardRoot:{
     width:"100%"
  },
  userRoot:{
    padding:"10px"
  },
  approved:{
   background: "rgb(76, 175, 80)",
   color:"rgb(255, 255, 255)",
   "&:hover":{
     background: "rgb(76, 175, 80)",
     color:"rgb(255, 255, 255)",
   },
  },
  box:{
    paddingBottom:"3px"
  },
  button:{
  textTransform:"none"
  },
  notApproved:{
   background: "rgb(244, 67, 54)",
   color:"rgb(255, 255, 255)",
   "&:hover":{
     background: "rgb(244, 67, 54)",
     color:"rgb(255, 255, 255)",
   },
  },
  waiting:{
   background: "rgb(245, 124, 0)",
   color:"rgb(255, 255, 255)",
   "&:hover":{
     background: "rgb(245, 124, 0)",
     color:"rgb(255, 255, 255)",
   },
  },
  link:{
    color:"grey"
  },
  link2:{
    color:"grey"
  }
}));

const DashboardInfo = () => {
 const classes = useStyles();
 const [info,setInfo] = useState([]);
 const token = getCookie("token")

 useEffect(() => {
   getDashboardInfo(token)
     .then((value) => {
       setInfo(value)
     })
     .catch((err) => {
       console.log(err)
     })
 }, [])

 const countCard = (data) => {
   return <Box p={1}>
            <Typography variant="h5" align="center">
              {Object.keys(data)[0]}
            </Typography>
            <Typography variant="h4" align="center">
               {Object.values(data)[0]}
            </Typography>
          </Box>
 }

 const showUsers = (data) => {
  const count = countCard(data);
   return <>
          <Grid item sm={5} xs={12} md={3}>
            <Card className={classes.cardRoot}>
            {count}
            {data.data.map((user, i) => {
              return <Card className={classes.userRoot}>
                      <Grid container spacing={2}>
                        <Grid item sm={3} xs={3}>
                           <img src={user.picture} />
                        </Grid>
                        <Grid item sm={9} xs={9}>
                          <Box>
                            <Typography variant="p">Name : </Typography>
                            <Typography variant="p">{user.name}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="p">Domain : </Typography>
                            <Typography variant="p">{user.domain.name}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                     </Card>
            })}
           </Card>
          </Grid>
         </>
 }

 const showBlogs = (data) => {
  const count = countCard(data);
   return <>
           <Grid item sm={5} xs={12} md={3}>
           <Link to="/content/blogs">
             <a className={classes.link}>
             <Card className={classes.cardRoot}>
             {count}
             {/*data.data.map((blog, i) => {
               let chipcolor = blog.approval === "APPROVED"?classes.approved:blog.approval === "NOT APPROVED"?classes.notApproved:blog.approval === "WAITING"?classes.waiting:""
               return <Card className={classes.userRoot}>
                       <Grid container spacing={2}>
                         <Grid item sm={3} xs={3}>
                           <img  alt="Feature Image" src={blog.featureImg} />
                         </Grid>
                         <Grid item sm={9} xs={9}>
                            <Box className={classes.box}>
                            <Typography variant="p">Posted By : </Typography>
                            <Typography variant="p">{blog.postedBy.full_name}</Typography>
                           </Box>
                             <Box className={classes.box}>
                            <Typography variant="p">Domain : </Typography>
                            <Typography variant="p"> {blog.domain.name}</Typography>
                           </Box>
                             <Box className={classes.box}>
                            <Typography variant="p">Approval : </Typography>
                            <Chip className={chipcolor} label={blog.approval.toLowerCase()} size="small"/>
                           </Box>

                         </Grid>
                       </Grid>
                      </Card>
             })*/}
            </Card>
            </a>
          </Link>
           </Grid>
         </>
 }

 const showTasks = (data) => {
  const count = countCard(data);
   return <>
         <Grid item sm={5} xs={12} md={3}>
         <Link to="/tasks">
           <a className={classes.link}>
           <Card className={classes.cardRoot}>
           {count}
           {/*data.data.map((task, i) => {
             const taskchip = task.status ==="Open"?classes.waiting:task.status ==="Done"?classes.approved:task.status === "Closed"?classes.notApproved:""
             return <Card className={classes.userRoot}>
                     <Grid container spacing={2}>
                       <Grid item>
                         <Box className={classes.box}>
                           <Typography variant="p">Assignee : </Typography>
                           <Typography variant="p">{task.assignee.full_name}</Typography>
                         </Box>
                         <Box className={classes.box}>
                           <Typography variant="p">Reporter : </Typography>
                           <Typography variant="p">{task.follower.full_name}</Typography>
                         </Box>
                         <Box className={classes.box}>
                           <Typography variant="p">Status : </Typography>
                           <Chip className={taskchip} label={task.status} size="small"/>
                         </Box>
                         <Box className={classes.box}>
                           <Typography variant="p">Project : </Typography>
                           <Typography variant="p">{task.project_id.name}</Typography>
                         </Box>
                       </Grid>
                     </Grid>
                    </Card>
           })*/}

          </Card>
            </a>
          </Link>
         </Grid>
         </>
 }

 const showProjects = (data) => {
  const count = countCard(data);
   return <>
           <Grid item sm={5} xs={12} md={3}>
           <Link to="/projects">
             <a className={classes.link}>
             <Card className={classes.cardRoot}>
             {count}
             {/*data.data.map((project, i) => {
               return <Card className={classes.userRoot}>
                       <Grid container spacing={2}>
                         <Grid item>
                           <Box className={classes.box}>
                             <Typography variant="p">Project Name : </Typography>
                             <Typography variant="p">{project.name}</Typography>
                           </Box>
                           <Box className={classes.box}>
                             <Typography variant="p">Team Lead : </Typography>
                             <Typography variant="p">{project.team_leader.full_name}</Typography>
                           </Box>
                           <Box className={classes.box}>
                             <Typography variant="p">Domain : </Typography>
                             <Typography variant="p">
                               <a className={classes.link2}>
                               {project.domain.url}
                               </a>
                             </Typography>
                           </Box>
                         </Grid>
                       </Grid>
                      </Card>
             })*/}
            </Card>
            </a>
          </Link>
           </Grid>
         </>
 }

if(info.length){
  return <>
           <Grid container justify="center" spacing={2}>
           {info.map((item, i) => {
             if(Object.keys(item)[0] === "Users"){
                return showUsers(item);
             }else if (Object.keys(item)[0] === "Blogs") {
                return showBlogs(item);
             }
             else if (Object.keys(item)[0] === "Tasks") {
                return showTasks(item);
             }
             else if (Object.keys(item)[0] === "Projects") {
                return showProjects(item);
             }else {
               return;
             }
           })}
          </Grid>
         </>
}else{
  return <></>
 }
}

export default DashboardInfo;
