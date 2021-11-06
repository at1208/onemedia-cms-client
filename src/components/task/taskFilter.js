import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getProjects } from '../../actions/project';
import { getCookie } from '../../actions/auth';
import { getEmployee } from '../../actions/employee';
import { filterTask } from '../../actions/task';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"10px"
   },
   formControl: {
   minWidth: 120,
 },
 submitBtn:{
   margin:"0px 1px"
 },
 btnContainer:{
   padding:"10px 0px 0px 0px"
 }
}));


const TaskFilter = ({ tasks, reload }) => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [values, setValues] = useState({project: "",assignee:"", follower:"", owner:""});
    const [query, setQuery] = useState({project_id: "",assignee:"", follower:"", owner:"", status:""})
    const token = getCookie("token");

    useEffect(() => {
        getProjects(token)
          .then(response => {
               setProjects(response.projects)
          })
          .catch(err => {
            console.log(err)
          })
    }, [])

    useEffect(() => {
       getEmployee(token)
         .then(response => {
            setEmployees(response.employees)
         })
         .catch(err => {
           console.log(err)
         })
    }, [])

    useEffect(() => {
      filterTask(query, token)
        .then(response => {
          tasks(response)
        })
        .catch(err => {
          console.log(err)
        })
    }, [query, reload])


  const handleSubmit = (e) => {
      e.preventDefault();
     filterTask(query, token)
       .then(response => {
         tasks(response)
       })
       .catch(err => {
         console.log(err)
       })
  }

 const handleChange = (name) => (e) => {
        switch (name) {
          case "project":
             if(e.target.value.length===0){
               setQuery({...query, project_id: ""})
             }
            break;
          case "assignee":
             if(e.target.value.length===0){
               setQuery({...query, assignee: ""})
             }
            break;

          case "follower":
             if(e.target.value.length===0){
               setQuery({...query, follower: ""})
             }
            break;

          case "owner":
             if(e.target.value.length===0){
               setQuery({...query, owner: ""})
             }
            break;
          default:

        }
 }

  const handleClick = () => {
         setQuery({...query, project_id: "", assignee:"", follower:"", owner:"", status:""})
         setValues({...values, project: "", assignee:"", follower:"", owner:"" })
  }

   return <>
           <Card className={classes.cardRoot}>
            <form onSubmit={handleSubmit}>
           <Grid container spacing={2} justify="center">
             <Grid item xs={12} sm={2} md={2} lg={2}>
             <Autocomplete
                onChange={(e, val) => {
                   if(val){
                      setQuery({...query, project_id: val._id});
                      setValues({...values, project: val })
                   }
                 }}
                closeIcon={<></>}
                value={values.project}
                size="small"
                options={projects}
                getOptionLabel={(option) => option.name}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Project" variant="outlined" onChange={handleChange("project")} />}
              />
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
                 <Autocomplete
                   closeIcon={<></>}
                    onChange={(e, val) => {
                       if(val){
                         setQuery({...query, assignee: val._id})
                         setValues({...values, assignee: val})
                       }
                     }}
                    value={values.assignee}
                    size="small"
                    options={employees}
                    getOptionLabel={(option) => option.first_name}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Assignee" variant="outlined" onChange={handleChange("assignee")}/>}
                  />
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
               <Autocomplete
                 closeIcon={<></>}
                  onChange={(e, val) => {
                     if(val){
                         setQuery({...query, follower: val._id})
                         setValues({...values, follower: val})
                     }
                   }}
                  size="small"
                  value={values.follower}
                  options={employees}
                   getOptionLabel={(option) => option.first_name}
                  style={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} label="Reporter" variant="outlined" onChange={handleChange("follower")}/>}
                />
             </Grid>

             <Grid item xs={12} sm={2} md={2} lg={2}>
                  <FormControl className={classes.formControl}   variant="outlined"
                    size="small"
                    fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={query.status}
                    label="Status"
                    onChange={(e) => setQuery({...query, status: e.target.value})}
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Blog Review">Blog Review</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </FormControl>
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
                <Grid container justify="flex-start" spacing={1} className={classes.btnContainer}>
                   <Grid xs={12} sm={12} md={12} lg={12}>
                       <Button  size="small" variant="contained" color="primary" onClick={handleClick}>Reset</Button>
                   </Grid>
                </Grid>
             </Grid>
           </Grid>
           </form>
           </Card>
         </>
}

export default TaskFilter;
