import React from 'react';
import Drawer from '../drawer';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { checkModulePermission } from '../../actions/employee';
import { getCookie } from '../../actions/auth';
import Forbidden from '../core/403'

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


const DashboardLayout = ({ children, page, permission }) => {
  const token = getCookie("token");
  const [access, setAccess] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      if(page && permission){
        let checkAccess = await checkModulePermission(page, permission, token);
          setAccess(checkAccess)
      }
    })()
  }, []);



  return <>
          <ThemeProvider theme={theme}>
             <CssBaseline />
           </ThemeProvider>
           <Drawer  children={children} access={access} forbidden={<Forbidden />}/>
         </>
}

export default DashboardLayout;
