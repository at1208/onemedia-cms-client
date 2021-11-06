import React from 'react';
import { withRouter } from 'react-router-dom';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { getSingleEmployee } from '../../actions/employee';
import { getCookie } from '../../actions/auth';
// import { Grid, TextField, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import EditEmployee from '../../components/employee/editEmployee';

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"40px 10px 40px 10px"
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
}));


 const EmployeeDetail = ({ match: { params: id } }) => {
   const [detail, setDetails] = React.useState(null);
   const token = getCookie("token")


   React.useEffect(() => {
        getSingleEmployee(id.id, token)
          .then((value) => {
            if(value){
               setDetails(value.employees)
            }
          })
          .catch((err) => {
            console.log(err)
          })
   }, []);

 if(detail){
   return <DashboardLayout page="employee" permission="read">
            <EditEmployee editEmployee={detail} />
          </DashboardLayout>
 }else{
   return <DashboardLayout page="employee">
          </DashboardLayout>
 }

}

export default withRouter(EmployeeDetail);
