import React from "react";
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';


function UserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);



  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };


  return (
    <React.Fragment>
      <Tooltip title="Actions">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <MoreVertIcon style={{ color:"grey" }}/>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserDropdown;
