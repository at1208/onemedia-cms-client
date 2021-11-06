import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { isAuth,
         getCookie } from '../../actions/auth';
import { getProfileDetails,
         updateProfilePicture } from '../../actions/employee';
import { uploadFile } from '../../actions/upload';
import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid as MuiGrid,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '../core/avatar';
const token = getCookie("token");
const Button = styled(MuiButton)(spacing);
const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);
const Spacer = styled.div(spacing);
const Centered = styled.div`
  text-align: center;
`;


const useStyles = makeStyles((theme) => ({
  dialogRoot:{
    padding:"10px"
    },
    button:{
    textTransform: "none",
    backgroundColor:"#3f51b5",
    width:"200px",
    color:"white",
    padding:"10px",
    fontWeight:800,
    height:"40px",
    fontSize:"15px",
    '&:hover': {
    backgroundColor:"#3f51b5"
    },
  },
  uploadButton:{
    background: '#6387ED 0% 0% no-repeat padding-box',
    borderRadius: '8px',
    opacity: 1,
    // width: '',
    fontWeight: '500',
    height: '49px',
    textTransform: 'none',
    color: 'white',
    '&:hover': {
      fontWeight: '500',
      background: '#6387ED 0% 0% no-repeat padding-box',
      color: 'white',
    },
  }
}));

function Details({ data }) {
    const token = getCookie("token");
    const id = isAuth() && isAuth()._id
    const classes = useStyles();
    const [picture, setPicture] = useState({
      uploading: false,
      url:""
    });


    const handleChange = (name) => async (e) => {
        switch (name) {
          case "featureImg":
          let file = e.target.files[0];
          let formData = new FormData();
              formData.append('upload', file);
              let url = await apiPostNewsImage(formData);
              let dbUrl = await updateProfilePicture({url}, token, id);
              setPicture({...picture, url: dbUrl && dbUrl.headshot_url, uploading:false})
            break;
          default:

        }
    }

    async function apiPostNewsImage(img) {
        setPicture({...picture, uploading:true})
          let result = await uploadFile(img, token);
          if(result){
            return result.url
          }
       }

  return (
    <Card mb={6}>
      <CardContent>
        <Centered>
            <Grid container justify="center">
              <Avatar  name={data && data.full_name} src={picture.url || (data && data.headshot_url) } size={160} textSize={50}/>
            </Grid>
            <Box pt={2}>
             <Typography variant="h5">
               {data && data.full_name}
             </Typography>
            </Box>
            <Box>
            <Typography variant="h6">
             {data && data.designation && data.designation.designation_name}
            </Typography>
            </Box>
          <Box p={2}>
          <input
            onChange={handleChange("featureImg")}
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button
            className={classes.uploadButton}
               variant="contained"
               component="span"
               size="small">
               {picture.uploading?"Uploading...":"Change profile photo"}
            </Button>
          </label>
          </Box>
        </Centered>
      </CardContent>
    </Card>
  );
}



function About({ data }) {
  return (
    <Card>
      <CardContent>


        <Grid container  alignItems="space-between" pb={0}>
          <Grid item sm={4}>
            <Typography variant="body2">
              Department
            </Typography>
          </Grid>
          <Grid item>
          <Typography variant="body2"  noWrap>
            - {data && data.department && data.department.department_name}
          </Typography>
          </Grid>
        </Grid>
        <hr />

        <Grid container alignItems="center" pb={0}>
          <Grid item sm={4}>
          <Typography variant="body2">
              Address
          </Typography>

          </Grid>
          <Grid item>
          <Typography variant="body2"  noWrap>
             - {data && data.address}
          </Typography>
          </Grid>
        </Grid>
          <hr />

        <Grid container   alignItems="center" pb={0}>
          <Grid item sm={4}>
          <Typography variant="body2">
             Gender
          </Typography>
          </Grid>
          <Grid item>
          <Typography variant="body2"  noWrap>
             - {data && data.gender}
          </Typography>
          </Grid>
        </Grid>
        <hr />

        <Grid container   alignItems="center" pb={0}>
          <Grid item sm={4}>
          <Typography variant="body2">
            Phone Number
          </Typography>
          </Grid>
          <Grid item>
          <Typography variant="body2"  noWrap>
            - {data && data.phone_number}
          </Typography>

          </Grid>
        </Grid>
        <hr />

        <Grid container   alignItems="center" pb={0}>
          <Grid item sm={4}>
          <Typography variant="body2">
             Status
          </Typography>
          </Grid>
          <Grid item>
          <Typography variant="body2"  noWrap>
            - {data && data.status}
          </Typography>

          </Grid>
        </Grid>
        <hr />

        <Grid container   alignItems="center" pb={0}>
          <Grid item sm={4}>
          <Typography variant="body2">
            Employee ID
          </Typography>
          </Grid>
          <Grid item>
          <Typography variant="body2"  noWrap>
            - {data && data.employee_id}
          </Typography>
          </Grid>
        </Grid>
        <hr />
        <Grid container alignItems="center" pb={0}>
          <Grid item sm={4}>
          <Typography variant="body2">
             E-mail
          </Typography>
          </Grid>
          <Grid item sm={8}>
          <Typography variant="body2" noWrap>
            - {data && data.email}
          </Typography>
          </Grid>
        </Grid>
        <hr />
        <Grid container alignItems="center" pb={0}>
          <Grid item sm={4}>
          <Typography variant="body2">
             Date of Joining
          </Typography>
          </Grid>
          <Grid item>
          <Typography variant="body2"  noWrap>
            - {data && data.date_of_joining}
          </Typography>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}



function Profile() {
  const [ employee, setEmployee ] = useState();

  useEffect(() => {
    getProfileDetails(isAuth() && isAuth()._id, token)
      .then((value) => {
       setEmployee(value.employees)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);


  return (
    <React.Fragment>
      <br />
      <Grid container spacing={6} justify="center">
        <Grid item xs={12} lg={6} xl={3}>
          <Details data={employee} />
        </Grid>
        <Grid item xs={12} lg={4} xl={3}>
          <About data={employee} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
