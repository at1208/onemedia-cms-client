import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { acceptInvitation, signIn, authenticate } from '../../actions/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  PersonOutlineOutlined,
  HttpsOutlined
} from '@material-ui/icons';

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
    padding: '35px 5px 70px 5px',
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







const Onboard = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();

  const { token } = match.params;
  const [user, setUser] = React.useState({
    data:"",
    token:"",
    error:"",
    success:"",
    isLoading:false,
    password:""
  });

  React.useEffect(() => {
    if(token){
        setUser({...user, data:jwt.decode(token), token})
       }
  }, [match])

 const handleChange = (e) => {
    setUser({...user, password: e.target.value })
 }

 const handleSubmit = (e) => {
     e.preventDefault();
     acceptInvitation(user)
       .then((value) => {
           signIn({ email: user.data.email, password: user.password })
             .then(response => {
                authenticate(response, () => {
                  history.push("/dashboard")
                })
             })
             .catch((err) => {
               toast.error(err.error)
             })
       })
       .catch((err) => {
          toast.error(err.error)
       })
 }

if(user.data){
  return <>
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
                       <Typography align='center' variant="h5">Hi {user.data.first_name.slice(0, 1).toUpperCase(0) + user.data.first_name.slice(1)}, Welcome you onboard</Typography>
                        <br />
                        <form onSubmit={handleSubmit}>
                         <Grid container justify='center'>
                           <Grid item sm={6} md={9} xs={12}>
                           <TextField
                            type="text"
                            disabled={true}
                            InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                            <PersonOutlineOutlined
                            className={classes.textfieldIcon}
                            />
                            </InputAdornment>
                            ),
                            }}
                            className={classes.loginTextField}
                            variant="outlined"
                            value={user.data.email}
                            fullWidth
                            size="large"

                           />
                           <br /><br />
                           <TextField
                            type="password"
                            variant="outlined"
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
                            onChange={handleChange}
                            value={user.data.password}
                            fullWidth
                            inputProps={{
                              autocomplete: 'password',
                              form: {
                                autocomplete: 'off',
                              },
                            }}
                            size="large"
                            label="Create password"
                           />
                            <br /><br />
                             <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              fullWidth
                              type="submit">Activate account</Button>
                           </Grid>
                          </Grid>
                          <br />
                        </form>
                       </Card>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
         </>
}else {
  return <>
         </>
}
}

export default withRouter(Onboard);
