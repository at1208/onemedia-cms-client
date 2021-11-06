import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  PersonOutlineOutlined,
  HttpsOutlined
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { signIn, authenticate } from '../../actions/auth';


const useStyles = makeStyles((theme) => ({
    form: {
      boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
      // border:"1px solid #e8e4e4",
      padding: '35px 5px 70px 5px',
      margin: '5px',
      background: '#FFFFFF 0% 0% no-repeat padding-box',
      borderRadius: '8px',
      opacity: 1,
    },
    login:{
      fontWeight:700
    },
    companyname:{
      letterSpacing: "-0.003em",
      lineHeight: "50px",
      paddingTop:"49px",
      fontSize: "39px",
      marginBottom: "-0.46em",
      fontFamily: `charter, Georgia, Cambria, "Times New Roman", Times, serif`,
      fontStyle: "normal",
      wordBreak: "break-word",
      color: "rgba(41, 41, 41, 1)",
      fontWeight: "900",
      [theme.breakpoints.down('sm')]: {
       fontSize: "33px",
       lineHeight: "35px",
      },
      [theme.breakpoints.down('xs')]: {
       fontSize: "28px",
       lineHeight: "30px",
      },
      [theme.breakpoints.up('lg')]: {
       fontSize: "33px",
       lineHeight: "35px",
      },

    },
  root:{
      display: 'table',
      backgroundImage: 'url(/images/Bg.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
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
    textfieldIcon: {
      opacity: 0.2,
      fontSize: '21px',
    },
  alertCard:{
    height:"40px"
  },
  forgot:{
    color:"black",
    textDecoration: "underline",
    textDecorationColor: "black"

  }
}));



const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [login, setLogin] = useState({
    credentials:{
      email:"",
      password:""
    },
    isLoading:false,
    error:"",
    success:""
  })

  const handleChange = (type) => (e) => {
      switch (type) {
        case "email":
           setLogin({...login, credentials: {...login.credentials, email: e.target.value}})
          break;
        case "password":
           setLogin({...login, credentials: {...login.credentials, password: e.target.value}})
          break;
        default:
           return;
      }
  }

 const handleSubmit = (e) => {
   e.preventDefault()
   setLogin({...login, isLoading:true })
   signIn({ email: login.credentials.email, password: login.credentials.password })
     .then((value) => {
         authenticate(value, () => {
           window.location.href="/dashboard"
           setLogin({...login, isLoading:false, success: value.message })
         })
     })
     .catch((err) => {
       toast.error(err.error)
       setLogin({...login, isLoading:false, error: err.error })
     })
 }

  return <>
      <ToastContainer />
          <div className={classes.root}>
            <div className={classes.middle}>
              <div className={classes.inner}>
                <Grid
                  container
                  justify="center"
                  >
                    <Grid item xs={12} sm={6} md={4}>
                        <div className={classes.form}>

                          <form onSubmit={handleSubmit}>
                              <Grid container justify="center">
                                <Grid item sm={5} xs={4}>
                                  <img src="readifly-logo.svg" height={"100%"} width="100%"/>
                                </Grid>
                                <Grid item sm={7} xs={7}>
                                  <img src="readifly_name.svg" height={"100%"} width="100%"/>

                                </Grid>
                              </Grid>


                              <br />
                              <Grid container justify="center" spacing={3}>
                                <Grid xs={10} sm={12} md={10} item>
                                    <TextField
                                    type="text"
                                    variant="outlined"
                                    className={classes.loginTextField}
                                    fullWidth
                                    InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                    <PersonOutlineOutlined
                                    className={classes.textfieldIcon}
                                    />
                                    </InputAdornment>
                                    ),
                                    }}
                                    placeholder="Email"
                                    disabled={login.isLoading}
                                    onChange={handleChange("email")}
                                    value={login.credentials.email} />
                                </Grid>
                                <Grid xs={10} sm={12} md={10} item>
                                  <TextField
                                  type="password"
                                  variant="outlined"
                                  fullWidth
                                  placeholder="Password"
                                  className={classes.loginTextField}
                                  InputProps={{
                                  startAdornment: (
                                  <InputAdornment position="start">
                                  <HttpsOutlined
                                  className={classes.textfieldIcon}
                                  />
                                  </InputAdornment>
                                  ),
                                  }}
                                  disabled={login.isLoading}
                                  onChange={handleChange("password")}
                                  value={login.credentials.password} />
                                </Grid>
                               </Grid>
                              <br />
                              <Grid container justify='center'>
                                <Grid item sm={10} md={10} xs={10}>
                                  <Button
                                  className={classes.button}
                                  classes={{ disabled: classes.disabledButton }}
                                  type="submit"
                                  disabled={login.isLoading}>
                                  {login.isLoading? 'Submitting' : 'LOGIN TO CONTINUE'}
                                  </Button>
                                </Grid>
                                </Grid>
                                <br />
                                <Grid container justify='center'>
                                      <Typography variant="body1" onClick={() => history.push("/reset")}>
                                        <a className={classes.forgot}>
                                          Forgot password
                                        </a>
                                      </Typography>
                              </Grid>
                          </form>
                        </div>
                    </Grid>
                 </Grid>
              </div>
            </div>
          </div>
         </>
}

export default LoginForm;
