import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, Grid, List, Divider, Box} from '@material-ui/core';
import UserList from './userList';
import CloseIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer:{
    "& .MuiDrawer-paper":{
      background:"white!important"
    }
  },
  icon:{
    fontSize:"30px",
    color:"#7992aa"
  }
});

export default function TemporaryDrawer({ }) {
  const [onlineUsersList, setOnlineUsersList] = React.useState();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List>
      <Grid container justify="space-between">
        <Grid item>
        </Grid>
        <Grid item>
          <Box pr={3}>
            <CloseIcon onClick={toggleDrawer(anchor, false)} />
          </Box>
        </Grid>
      </Grid>
        <UserList getOnlineUsers={(users) => setOnlineUsersList(users)} />
      </List>
      <Divider />

    </div>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <GroupIcon onClick={toggleDrawer(anchor, true)} className={classes.icon}/>
          <Drawer anchor={anchor} open={state[anchor]} className={classes.drawer}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
