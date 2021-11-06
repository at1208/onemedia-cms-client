import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getDomains } from '../../actions/domain';
import { getCookie } from '../../actions/auth';
import { getEmployee } from '../../actions/employee';
import { filterBlog } from '../../actions/blog';
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


const BlogFilter = ({ blogs }) => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const [domains, setDomains] = useState([]);
    const token = getCookie("token")
    const [values, setValues] = useState({postedBy: "", domain:""});
    const [query, setQuery] = useState({postedBy: "",status:"", approval:"", domain:""})

    useEffect(() => {
        getDomains(token)
          .then(response => {
               setDomains(response)
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
      filterBlog(query, token)
        .then(response => {
          blogs(response)
        })
        .catch(err => {
          console.log(err)
        })
    }, [query])


  const handleSubmit = (e) => {
      e.preventDefault();
     filterBlog(query, token)
       .then(response => {
         blogs(response)
       })
       .catch(err => {
         console.log(err)
       })
  }

 const handleChange = (name) => (e) => {
        switch (name) {
          case "PostedBy":
             if(e.target.value.length===0){
               setQuery({...query, postedBy: ""})
             }
            break;
          case "Domain":
             if(e.target.value.length===0){
               setQuery({...query, domain: ""})
             }
            break;
          default:

        }
 }

  const handleClick = () => {
         setQuery({postedBy: "",status:"", approval:"", domain:""})
         setValues({postedBy: "", domain:""})
  }

   return <>
          <Card className={classes.cardRoot}>
            <form onSubmit={handleSubmit}>
           <Grid container spacing={2} justify="center">
             <Grid item xs={12} sm={2} md={2} lg={2}>
             <Autocomplete
                onChange={(e, val) => {
                   if(val){
                      setQuery({...query, postedBy: val._id});
                      setValues({...values, postedBy: val })
                   }
                 }}
                closeIcon={<></>}
                value={values.postedBy}
                size="small"
                options={employees}
                getOptionLabel={(option) => option.first_name}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="PostedBy" variant="outlined" onChange={handleChange("PostedBy")} />}
              />
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
               <FormControl className={classes.formControl}   variant="outlined"
                 size="small"
                 fullWidth>
               <InputLabel>Approval Status</InputLabel>
               <Select
                 value={query.approval}
                 label="Approval Status"
                 onChange={(e) => setQuery({...query, approval: e.target.value})}
               >
                 <MenuItem value={"WAITING"}>Waiting</MenuItem>
                 <MenuItem value={"APPROVED"}>Approved</MenuItem>
                 <MenuItem value={"NOT APPROVED"}>Not Approved</MenuItem>
               </Select>
             </FormControl>
             </Grid>
             <Grid item xs={12} sm={2} md={2} lg={2}>
               <Autocomplete
                 closeIcon={<></>}
                  onChange={(e, val) => {
                     if(val){
                         setQuery({...query, domain: val._id})
                         setValues({...values, domain: val})
                     }
                   }}
                  size="small"
                  value={values.domain}
                  options={domains}
                  getOptionLabel={(option) => option.name}
                  style={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} label="Domain" variant="outlined" onChange={handleChange("Domain")}/>}
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
                    <MenuItem value={"true"}>Active</MenuItem>
                    <MenuItem value={"false"}>Inactive</MenuItem>
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

export default BlogFilter;
