import React from 'react';
import LoginForm from '../../components/login/loginForm';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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


const Login = () => {
  return <>
          <ThemeProvider theme={theme}>
             <CssBaseline />
           </ThemeProvider>
           <LoginForm />
         </>
}

export default Login;
