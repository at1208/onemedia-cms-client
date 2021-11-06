import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getDepartments } from '../../actions/department';
import { getDesignations } from '../../actions/designation';
import { getCookie } from '../../actions/auth';
import { getEmployee, filterEmployee } from '../../actions/employee';

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


const EmployeeFilter = ({ filterEmployeeList }) => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [values, setValues] = useState({employee: "",department:"", designation:"" });
    const [query, setQuery] = useState({full_name: "",department:"", designation:"", status:""})
    const token = getCookie("token")



    useEffect(() => {
       getEmployee(token)
         .then(response => {
            setEmployees(response.employees)
         })
         .catch(err => {
           console.log(err)
         })

         getDepartments(token)
         .then(response => {
            setDepartments(response.departments)
         })
         .catch(err => {
           console.log(err)
         })

         getDesignations(token)
         .then(response => {

            setDesignations(response.designations)
         })
         .catch(err => {
           console.log(err)
         })

    }, [])

    useEffect(() => {
      filterEmployee(query, token)
        .then(response => {
          filterEmployeeList(response)
        })
        .catch(err => {
          console.log(err)
        })
    }, [query])


  const handleSubmit = (e) => {
      e.preventDefault();
     filterEmployee(query, token)
       .then(response => {
          filterEmployeeList(response)
       })
       .catch(err => {
         console.log(err)
       })
  }

 const handleChange = (name) => (e) => {
        switch (name) {
          case "full_name":
             if(e.target.value.length===0){
               setQuery({...query, full_name: ""})
             }
            break;
          case "department":
             if(e.target.value.length===0){
               setQuery({...query, department: ""})
             }
            break;

          case "designation":
             if(e.target.value.length===0){
               setQuery({...query, designation: ""})
             }
            break;
          default:

        }
 }

  const handleClick = () => {
         setQuery({...query, full_name: "", department:"", designation:"", status:""})
         setValues({...values, full_name: "", department:"", designation:"" })
  }


   return <>
          <Card className={classes.cardRoot}>
            <form onSubmit={handleSubmit}>
           <Grid container spacing={2} justify="center">
             <Grid item xs={12} sm={2} md={2} lg={2}>
             <Autocomplete
                onChange={(e, val) => {
                   if(val){
                      setQuery({...query, full_name: val.full_name});
                      setValues({...values, employee: val })
                   }
                 }}
                closeIcon={<></>}
                value={values.employee}
                size="small"
                options={employees}
                getOptionLabel={(option) => option.full_name}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Employee Name" variant="outlined" onChange={handleChange("full_name")} />}
              />
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
                 <Autocomplete
                   closeIcon={<></>}
                    onChange={(e, val) => {
                       if(val){
                         setQuery({...query, department: val._id})
                         setValues({...values, department: val})
                       }
                     }}
                     value={values.department}
                    size="small"
                    options={departments}
                    getOptionLabel={(option) => option.department_name}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Department" variant="outlined" onChange={handleChange("department")}/>}
                  />
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
               <Autocomplete
                 closeIcon={<></>}
                  onChange={(e, val) => {
                     if(val){
                         setQuery({...query, designation: val._id})
                         setValues({...values, designation: val})
                     }
                   }}
                  size="small"
                  value={values.designation}
                  options={designations}
                   getOptionLabel={(option) => option.designation_name}
                  style={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} label="Designation" variant="outlined" onChange={handleChange("designation")}/>}
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
                    <MenuItem value="JOINED">JOINED</MenuItem>
                    <MenuItem value="INVITED">INVITED</MenuItem>
                    <MenuItem value="LEFT">LEFT</MenuItem>
                  </Select>
                </FormControl>
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
                <Grid container justify="center" spacing={1} className={classes.btnContainer}>
                   <Grid xs={6} sm={4} md={4} lg={4}>
                       <Button  size="small" variant="contained" color="primary" onClick={handleClick}>Reset</Button>
                   </Grid>
                </Grid>
             </Grid>
           </Grid>
           </form>
          </Card>
         </>
}

export default EmployeeFilter;
