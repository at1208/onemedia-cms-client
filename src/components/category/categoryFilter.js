import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { filterCategory, getCategories } from '../../actions/category';
import { getDomains } from '../../actions/domain';
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


const CategoryFilterComponent = ({ filterCategoryList }) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [domains, setDomains] = useState([]);
    const [values, setValues] = useState({domain: "", category:""});
    const [query, setQuery] = useState({ domain: "",category:"" })
    const token = getCookie("token");



    useEffect(() => {
         getDomains(token)
           .then(response => {
              setDomains(response)
           })
           .catch(err => {
             console.log(err)
           })

         getCategories(token)
           .then(response => {
              setCategories(response)
           })
           .catch(err => {
             console.log(err)
           })
    }, [])

    useEffect(() => {
      filterCategory(query, token)
        .then(response => {
          // console.log(response)
          filterCategoryList(response)
        })
        .catch(err => {
          console.log(err)
        })
    }, [query])


  const handleSubmit = (e) => {
      e.preventDefault();
     filterCategory(query, token)
       .then(response => {
             // console.log(response)
         filterCategoryList(response)
       })
       .catch(err => {
         console.log(err)
       })
  }

 const handleChange = (name) => (e) => {
        switch (name) {
          case "domain":
             if(e.target.value.length===0){
               setQuery({...query, domain: ""})
             }
            break;

          case "category":
             if(e.target.value.length===0){
               setQuery({...query, category: ""})
             }
            break;
          default:

        }
 }

  const handleClick = () => {
         setQuery({...query, domain: "", category:"" })
         setValues({...values, domain: "", category:"" })
  }

   return <>
           <Card className={classes.cardRoot}>
            <form onSubmit={handleSubmit}>
           <Grid container spacing={2} justify="center">

           <Grid item xs={12} sm={2} md={2} lg={2}>
             <Autocomplete
              onChange={(e, val) => {
                 if(val){
                    setQuery({...query, category: val._id});
                    setValues({...values, category: val })
                 }
               }}
              closeIcon={<></>}
              value={values.category}
              size="small"
              options={categories}
              getOptionLabel={(option) => option.name}
              style={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Category name" variant="outlined" onChange={handleChange("category")} />}
            />
           </Grid>


             <Grid item xs={12} sm={2} md={2} lg={2}>
             <Autocomplete
                onChange={(e, val) => {
                   if(val){
                      setQuery({...query, domain: val._id});
                      setValues({...values, domain: val })
                   }
                 }}
                closeIcon={<></>}
                value={values.domain}
                size="small"
                options={domains}
                getOptionLabel={(option) => option.name}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Domain" variant="outlined" onChange={handleChange("project")} />}
              />
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

export default CategoryFilterComponent;
