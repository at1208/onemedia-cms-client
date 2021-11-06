import React from "react";
import { withRouter, useHistory  } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card
} from "@material-ui/core";
import { resetPassword } from '../../actions/employee'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body:{
          backgroundColor:"rgb(247, 249, 252)"
        },
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
});


const useStyles = makeStyles({
  form:{
    boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
    // border:"1px solid #e8e4e4",
    padding: '35px 20px 70px 20px',
    margin: '5px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '8px',
    opacity: 1,
  },
  login:{
    minWidth:'130px'
  },
  root:{
    display: "table",
    position: "absolute",
    top: 0,
    left: 0,
    height: "90%",
    width: "100%",
  },
  middle:{
    display: "table-cell",
    verticalAlign: "middle"
  },
  inner:{
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  loginTextField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      background: 'white',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      background: 'white',
    },
    '& .MuiOutlinedInput-adornedStart': {
      background: 'white',
    },
    opacity: 1,
  },
    button: {
      background: '#6387ED 0% 0% no-repeat padding-box',
      borderRadius: '8px',
      opacity: 1,
      width: '100%',
      fontWeight: '500',
      height: '49px',
      textTransform: 'none',
      color: 'white',
      '&:hover': {
        fontWeight: '500',
        background: '#6387ED 0% 0% no-repeat padding-box',
        color: 'white',
      },
    },
    textfieldIcon: {
      opacity: 0.2,
      fontSize: '21px',
    },
});




function ResetPasswordComponent({ match: { params: {resetLink}} }) {
  const [newPassword, setNewPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [pwdSuccess, setPwdSuccess] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        let response = await resetPassword({  resetPasswordLink:resetLink,  newPassword });
        toast.success(response.message)
        setLoading(false)
        setPwdSuccess(true)
    } catch (e) {
       toast.error(e.error)
       setLoading(false)
    }
  }

  return (
    <>
    <ToastContainer />
    <ThemeProvider theme={theme}>
       <CssBaseline />
     </ThemeProvider>
    <div className={classes.root}>
      <div className={classes.middle}>
        <div className={classes.inner}>
        <Grid
          container
          justify="center">
           <Grid item xs={12} sm={6} md={4}>
            <Card  className={classes.form}>
              {!pwdSuccess?<>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                Reset Password
              </Typography>
              <Typography component="h2" variant="body1" align="center">
                Enter a new password.
              </Typography>
              <br />
              <form onSubmit={handleClick}>
                <Grid container justify="center">
                   <Grid item sm={10}>
                     <TextField
                       type="password"
                       variant="outlined"
                       value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}
                       className={classes.loginTextField}
                       name="email"
                       label="Create new password"
                       fullWidth
                       my={3}
                     />
                     <br />  <br />
                     <Button
                       type="submit"
                       fullWidth
                       onClick={handleClick}
                       className={classes.button}
                       variant="contained">
                       {loading?"Loading...":"Reset password"}
                     </Button>
                   </Grid>
                </Grid>
              </form>
              </>: <>
              <br />
              <Button className={classes.button}>
              <Typography variant="h4" align="center" onClick={() => history.push("/")}>Go to Homepage</Typography>
              </Button></>
            }
            </Card>
         </Grid>
        </Grid>
    </div>
  </div>
</div>
    </>
  );
}

export default withRouter(ResetPasswordComponent);
