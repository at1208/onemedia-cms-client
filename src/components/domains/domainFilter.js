import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getDomains, filterDomain } from '../../actions/domain';
import { getCookie } from '../../actions/auth';

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


const DomainFilter = ({ domains }) => {
    const classes = useStyles();
    const [searchDomain, setSearchDomain] = useState([]);
    const token = getCookie("token")
    const [values, setValues] = useState({name:""});
    const [query, setQuery] = useState({ name:""})

    useEffect(() => {
        getDomains(token)
          .then(response => {
               setSearchDomain(response)
          })
          .catch(err => {
            console.log(err)
          })
    }, [])

    useEffect(() => {
      filterDomain(query, token)
        .then(response => {
          domains(response)
        })
        .catch(err => {
          console.log(err)
        })
    }, [query])


  const handleSubmit = (e) => {
      e.preventDefault();
     filterDomain(query, token)
       .then(response => {
         domains(response)
       })
       .catch(err => {
         console.log(err)
       })
  }

 const handleChange = (name) => (e) => {
        switch (name) {
          case "Domain":
             if(e.target.value.length===0){
               setQuery({...query, name: ""})
             }
            break;
          default:

        }
 }


  const handleClick = () => {
         setQuery({ name: ""})
         setValues({ name: ""})
  }

   return <>
          <Card className={classes.cardRoot}>
            <form onSubmit={handleSubmit}>
           <Grid container spacing={2} justify="center">
             <Grid item xs={12} sm={4} md={3} lg={3}>
               <Autocomplete
                 closeIcon={<></>}
                  onChange={(e, val) => {
                     if(val){
                         setQuery({...query, name: val.name})
                         setValues({...values, name: val})
                     }
                   }}
                  size="small"
                  value={values.name}
                  options={searchDomain}
                  getOptionLabel={(option) => option.name}
                  style={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} label="Domain name" variant="outlined" onChange={handleChange("Domain")}/>}
                />
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

export default DomainFilter;
