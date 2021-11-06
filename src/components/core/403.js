import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const Forbidden = () => {
  return <>
          <Grid container justify="center">
             <Grid item>
                 <Typography variant="h1" align="center">403</Typography>
                 <Typography variant="h1" align="center">Access Denied</Typography>
             </Grid>
          </Grid>

         </>
}

export default Forbidden;
