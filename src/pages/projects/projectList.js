import React from 'react';
import { getProjects } from '../../actions/project';
import { getCookie } from '../../actions/auth';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from '../../components/project/projectCard';
 
const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"10px 10px 10px 10px"
   },
   close:{
     position:"absolute",
     right:'5%'
   },
   button:{
     textTransform: "none",
     backgroundColor:"#3f51b5",
     width:"100%",
     color:"white",
     fontWeight:800,
     height:"40px",
     fontSize:"15px",
     '&:hover': {
               backgroundColor:"#3f51b5"
         },
   },
   projectContainer:{
     padding:"15px"
   }
}));


const ProjectList = ({ edit }) => {
  const [projects, setProjects] = React.useState([]);
  const token = getCookie("token")
  const classes = useStyles();

  React.useEffect(() => {
    getProjects(token)
      .then((value) => {
        setProjects(value.projects)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  const projectLists = projects.map((project, i) => {
    return <Grid item xs={12} sm={4} md={12} lg={4} key={i}>
             <ProjectCard
               project={project}
               edit={edit}
               />
           </Grid>


  })

  return <div className={classes.projectContainer}>
           <Grid container justify="center" spacing={3}>
               {projectLists}
           </Grid>
         </div>
}

export default ProjectList;
