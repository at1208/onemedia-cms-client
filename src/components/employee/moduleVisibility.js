import React from 'react';
import {
   Box,
   Grid
} from "@material-ui/core";
import Switch from './visibilitySwitch'

const ModuleVisibility = ({ modules, onChangeVisibility }) => {
    const [state, setState] = React.useState(modules);
    const module_visibility = Object.entries(state).map(item => ({[item[0]]: item[1]}));


   const handleChange = name => e => {
     setState((prev) => ({...prev, [name]: e.target.checked }));
   }

   React.useEffect(() => {
      onChangeVisibility(state)
  }, [state])

  return <>
          {module_visibility.map((item, i) => {
            return <Box key={i} p={1}>
                     <Grid container justify="space-between">
                       <Grid item>
                         {Object.keys(item)}
                       </Grid>
                       <Grid item>
                         <Switch
                          checked={state[Object.keys(item)]}
                          onChange={handleChange(Object.keys(item))}
                         />
                       </Grid>
                     </Grid>
                   </Box>
          })}
         </>
}

export default ModuleVisibility;
