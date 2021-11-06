import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  Typography,
  Box,
  Divider,
  MenuList,
} from '@material-ui/core';
import { KeyboardArrowDownOutlined } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
 avatar:{
   backgroundColor:"#FCF0EF",
   color:"#E66E68",
   borderRadius:"8px",
   margin:"0px 5px 0px 0px"
 },
 button: {
 },
 paperRoot: {
   minWidth: '250px',
   zIndex:2
 },
 approved:{
  background: "rgb(76, 175, 80)",
     textTransform: 'none',
  color:"rgb(255, 255, 255)",
  "&:hover":{
    background: "rgb(76, 175, 80)",
    color:"rgb(255, 255, 255)",
  },
 },
 notApproved:{
  background: "rgb(244, 67, 54)",
     textTransform: 'none',
  color:"rgb(255, 255, 255)",
  "&:hover":{
    background: "rgb(244, 67, 54)",
    color:"rgb(255, 255, 255)",
  },
 },
 waiting:{
  background: "rgb(245, 124, 0)",
     textTransform: 'none',
  color:"rgb(255, 255, 255)",
  // marginLeft:"10px",
  "&:hover":{
    background: "rgb(245, 124, 0)",
    color:"rgb(255, 255, 255)",
  },
 },
});




export default function LiveStatus({ status, setValue }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);
  const anchorRef = useRef(null);

  const [statusValue, setStatusValue] = useState();

  const handleToggle = () => {
    setOpen((prevOpenState) => !prevOpenState);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  useEffect(() => {
    setStatusValue(status?"ACTIVE":"INACTIVE")
  }, [])

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

 const handleClick = (term) => {
   setStatusValue(term);
   setValue(term === "ACTIVE"?true:false)
   setOpen(false)
 }
  return (
    <div>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          fullWidth
          size="small"
          startIcon={<font style={{ fontSize: "10px"}}>Live status: </font>}
          variant="contained"
         className={statusValue === "ACTIVE"?classes.approved:classes.notApproved}
          endIcon={<KeyboardArrowDownOutlined />}
          onClick={handleToggle}
        >
        {statusValue}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          className={classes.paperRoot}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <Box pl={2} pr={2}>
                      <Divider />
                    </Box>
                    <MenuItem onClick={() => handleClick("ACTIVE")}>
                      <Box pl={1}>
                        <Typography>ACTIVE</Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={() => handleClick("INACTIVE")}>
                      <Box pl={1}>
                        <Typography>INACTIVE</Typography>
                      </Box>
                    </MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
